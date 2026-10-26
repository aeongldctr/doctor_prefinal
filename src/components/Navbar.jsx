import './Navbar.css'

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  cartCount, 
  setIsCartOpen 
}) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => setCurrentTab('shop')}>
          <span className="brand-icon">✨</span>
          <span className="brand-title">Gelo Finds <small>(accessories)</small></span>
        </div>

        <nav className="nav-links">
          <button 
            className={`nav-btn ${currentTab === 'shop' ? 'active' : ''}`}
            onClick={() => setCurrentTab('shop')}
          >
            Shop Products
          </button>
          <button 
            className={`nav-btn ${currentTab === 'add' ? 'active' : ''}`}
            onClick={() => setCurrentTab('add')}
          >
            + Add Product
          </button>
          <button 
            className="cart-btn"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="cart-icon">🛍️</span>
            <span className="cart-badge">{cartCount}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
