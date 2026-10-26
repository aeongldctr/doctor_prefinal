import { useState } from 'react'
import { initialProducts } from './data/defaultProducts'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import ProductTable from './components/ProductTable'
import ProductDetailModal from './components/ProductDetailModal'
import AddProductForm from './components/AddProductForm'
import CartDrawer from './components/CartDrawer'
import './App.css'

export default function App() {
  const [products, setProducts] = useState(initialProducts)
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentTab, setCurrentTab] = useState('shop')
  const [viewMode, setViewMode] = useState('card')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [notification, setNotification] = useState('')

  const showNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  const overallTotal = products.reduce((total, p) => {
    return total + (Number(p.price) * Number(p.quantity))
  }, 0)

  const overallStockCount = products.reduce((total, p) => {
    return total + Number(p.quantity)
  }, 0)

  const totalCartCount = cart.reduce((total, item) => {
    return total + item.cartQuantity
  }, 0)

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase())

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev])
    setCurrentTab('shop')
    showNotification(`"${newProduct.name}" added to inventory successfully!`)
  }

  const handleUpdateProductQuantity = (productId, delta) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updated = Number(p.quantity) + delta
        return { ...p, quantity: updated >= 0 ? updated : 0 }
      }
      return p
    }))
  }

  const handleAddToCart = (product, count = 1) => {
    if (Number(product.quantity) <= 0) {
      alert('Sorry, this product is currently out of stock.')
      return
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        const nextCount = existing.cartQuantity + count
        if (nextCount > Number(product.quantity)) {
          alert(`Cannot add more. Only ${product.quantity} units available in stock.`)
          return prev
        }
        return prev.map(item =>
          item.id === product.id ? { ...item, cartQuantity: nextCount } : item
        )
      } else {
        return [...prev, { ...product, cartQuantity: count }]
      }
    })

    showNotification(`Added ${count}x "${product.name}" to bag!`)
  }

  const handleUpdateCartQty = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const nextQty = item.cartQuantity + delta
        return nextQty > 0 ? { ...item, cartQuantity: nextQty } : null
      }
      return item
    }).filter(Boolean))
  }

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const handleClearCart = () => {
    setCart([])
  }

  return (
    <div className="app-layout">
      <Navbar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
      />

      {notification && (
        <div className="toast-notification">
          ✓ {notification}
        </div>
      )}

      <main className="main-content">
        {currentTab === 'add' ? (
          <AddProductForm 
            onAddProduct={handleAddProduct}
            onCancel={() => setCurrentTab('shop')}
          />
        ) : (
          <div className="shop-section">
            <div className="hero-banner">
              <h1 className="hero-title">GELO FINDS (ACCESSORIES)</h1>
              <p className="hero-subtitle">
                Discover trending curated fashion accessories for boys and girls. High quality, stylish, and built to elevate your daily look.
              </p>
            </div>

            <div className="inventory-summary-cards">
              <div className="summary-stat-card">
                <span className="stat-label">Total Product Types</span>
                <span className="stat-value">{products.length}</span>
              </div>
              <div className="summary-stat-card">
                <span className="stat-label">Total Stock Count</span>
                <span className="stat-value">{overallStockCount} pcs</span>
              </div>
              <div className="summary-stat-card highlight-card">
                <span className="stat-label">Overall Total Inventory Value</span>
                <span className="stat-value total-highlight">
                  ₱{overallTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <small className="stat-hint">Computed via price × quantity sum</small>
              </div>
            </div>

            <div className="controls-bar">
              <div className="category-filters">
                <span className="filter-label">Filter Category:</span>
                <button 
                  className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All ({products.length})
                </button>
                <button 
                  className={`filter-btn ${selectedCategory === 'girl' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('girl')}
                >
                  Girl ({products.filter(p => p.category.toLowerCase() === 'girl').length})
                </button>
                <button 
                  className={`filter-btn ${selectedCategory === 'boy' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('boy')}
                >
                  Boy ({products.filter(p => p.category.toLowerCase() === 'boy').length})
                </button>
              </div>

              <div className="view-mode-toggle">
                <button 
                  className={`mode-btn ${viewMode === 'card' ? 'active' : ''}`}
                  onClick={() => setViewMode('card')}
                  title="Card View"
                >
                  ⊞ Cards
                </button>
                <button 
                  className={`mode-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                  title="Table View"
                >
                  ☰ Table
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="empty-products-msg">
                No products found in this category.
              </div>
            ) : viewMode === 'card' ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onSelectProduct={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateProductQuantity}
                  />
                ))}
              </div>
            ) : (
              <ProductTable 
                products={filteredProducts}
                onSelectProduct={setSelectedProduct}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateProductQuantity}
              />
            )}
          </div>
        )}
      </main>

      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onExploreShop={() => {
          setCurrentTab('shop')
          setIsCartOpen(false)
        }}
      />
    </div>
  )
}

