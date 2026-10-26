import { useState } from 'react'
import './ProductDetailModal.css'

export default function ProductDetailModal({ 
  product, 
  onClose, 
  onAddToCart 
}) {
  const [orderQty, setOrderQty] = useState(1)

  if (!product) return null

  const isLowStock = Number(product.quantity) < 5
  const basePrice = Number(product.price)
  const orderSubtotal = basePrice * orderQty

  const handleDecrease = () => {
    if (orderQty > 1) {
      setOrderQty(orderQty - 1)
    }
  }

  const handleIncrease = () => {
    if (orderQty < Number(product.quantity)) {
      setOrderQty(orderQty + 1)
    }
  }

  const handleAddToCart = () => {
    onAddToCart(product, orderQty)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-image-col">
          <img 
            src={product.image} 
            alt={product.name} 
            className="modal-img" 
          />
          <span className="modal-pill-tag">
            {isLowStock ? 'LIMITED STOCK' : 'POPULAR ACCESSORY'}
          </span>
        </div>

        <div className="modal-info-col">
          <div className="modal-rating-row">
            <span className="modal-stars">★ ★ ★ ★ ★</span>
            <span className="modal-rating-text">{product.rating} / 5.0</span>
          </div>

          <h2 className="modal-title">{product.name}</h2>

          <div className="modal-price-box">
            <span className="price-label">Base Price:</span>
            <span className="price-val">₱{basePrice.toFixed(2)}</span>
          </div>

          {isLowStock && (
            <div className="modal-alert-box">
              ⚠️ Warning: Low Stock! Only {product.quantity} items left in inventory.
            </div>
          )}

          <div className="modal-section">
            <h4 className="section-heading">WHAT MAKES IT SPECIAL:</h4>
            <p className="modal-desc">{product.description}</p>
          </div>

          <div className="modal-section">
            <h4 className="section-heading">SPECIFICATIONS & DETAILS:</h4>
            <p className="modal-spec">{product.specification}</p>
          </div>

          <div className="modal-qty-container">
            <div className="modal-qty-left">
              <span className="qty-label">Quantity:</span>
              <div className="modal-counter">
                <button 
                  className="counter-btn"
                  onClick={handleDecrease}
                  disabled={orderQty <= 1}
                >
                  -
                </button>
                <span className="counter-val">{orderQty}</span>
                <button 
                  className="counter-btn"
                  onClick={handleIncrease}
                  disabled={orderQty >= Number(product.quantity)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="modal-qty-right">
              <span className="multiplier-text">{orderQty} × ₱{basePrice.toFixed(2)}</span>
              <span className="calc-subtotal">₱{orderSubtotal.toFixed(2)}</span>
            </div>
          </div>

          <button 
            className="modal-add-cart-btn"
            onClick={handleAddToCart}
            disabled={Number(product.quantity) <= 0}
          >
            {Number(product.quantity) <= 0 
              ? 'Out of Stock' 
              : `Add To Cart • ₱${orderSubtotal.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  )
}
