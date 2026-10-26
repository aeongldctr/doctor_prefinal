import './ProductCard.css'

export default function ProductCard({ 
  product, 
  onSelectProduct, 
  onAddToCart,
  onUpdateQuantity 
}) {
  const isLowStock = Number(product.quantity) < 5
  const subtotal = Number(product.price) * Number(product.quantity)

  return (
    <div className={`product-card ${isLowStock ? 'card-low-stock' : ''}`}>
      <div className="card-image-wrapper" onClick={() => onSelectProduct(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img" 
        />
        <span className={`stock-badge ${isLowStock ? 'badge-low' : 'badge-good'}`}>
          {isLowStock ? `Low Stock (${product.quantity} left)` : `In Stock (${product.quantity})`}
        </span>
        <span className="category-badge">
          {product.category}
        </span>
      </div>

      <div className="card-body">
        <div className="card-rating">
          <span className="stars">★ ★ ★ ★ ★</span>
          <span className="rating-num">({product.rating})</span>
        </div>

        <h3 className="card-title" onClick={() => onSelectProduct(product)}>
          {product.name}
        </h3>

        <p className="card-desc">
          {product.description}
        </p>

        <div className="card-stock-row">
          <span className="label">Stock Available:</span>
          <div className="qty-control">
            <button 
              className="qty-btn"
              onClick={() => onUpdateQuantity(product.id, -1)}
              disabled={Number(product.quantity) <= 0}
            >
              -
            </button>
            <span className={`qty-value ${isLowStock ? 'qty-low' : ''}`}>
              {product.quantity}
            </span>
            <button 
              className="qty-btn"
              onClick={() => onUpdateQuantity(product.id, 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="card-subtotal-box">
          <span className="subtotal-label">Subtotal (Price × Qty):</span>
          <span className="subtotal-amount">₱{subtotal.toLocaleString()}</span>
        </div>

        <div className="card-footer">
          <span className="price-tag">₱{Number(product.price).toFixed(2)}</span>
          <div className="card-actions">
            <button 
              className="details-btn"
              onClick={() => onSelectProduct(product)}
            >
              Details →
            </button>
            <button 
              className="add-cart-btn"
              onClick={() => onAddToCart(product)}
              disabled={Number(product.quantity) <= 0}
            >
              {Number(product.quantity) <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
