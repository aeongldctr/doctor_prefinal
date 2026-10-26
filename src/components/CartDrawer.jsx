import './CartDrawer.css'

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateCartQty, 
  onRemoveFromCart, 
  onClearCart,
  onExploreShop 
}) {
  if (!isOpen) return null

  const totalItems = cart.reduce((sum, item) => sum + item.cartQuantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + (Number(item.price) * item.cartQuantity), 0)

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <span className="drawer-bag-icon">🛍️</span>
            <h3 className="drawer-title">Shopping Bag</h3>
            <span className="drawer-count-badge">{totalItems} Items</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">👜</div>
              <h4 className="empty-cart-title">Your Cart Is Empty</h4>
              <p className="empty-cart-text">
                Select your favorite accessories from the shop!
              </p>
              <button 
                className="explore-menu-btn"
                onClick={() => {
                  onClose()
                  if (onExploreShop) onExploreShop()
                }}
              >
                Explore Shop
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => {
                const itemSubtotal = Number(item.price) * item.cartQuantity

                return (
                  <div key={item.id} className="cart-item-row">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="cart-item-img" 
                    />
                    <div className="cart-item-details">
                      <div className="cart-item-top">
                        <span className="cart-item-name">{item.name}</span>
                        <button 
                          className="cart-remove-btn"
                          onClick={() => onRemoveFromCart(item.id)}
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                      <span className="cart-item-unit-price">
                        ₱{Number(item.price).toFixed(2)} each
                      </span>

                      <div className="cart-item-bottom">
                        <div className="cart-qty-counter">
                          <button 
                            className="cart-qty-btn"
                            onClick={() => onUpdateCartQty(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="cart-qty-num">{item.cartQuantity}</span>
                          <button 
                            className="cart-qty-btn"
                            onClick={() => onUpdateCartQty(item.id, 1)}
                            disabled={item.cartQuantity >= item.quantity}
                          >
                            +
                          </button>
                        </div>
                        <span className="cart-item-subtotal">
                          ₱{itemSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-summary-row">
              <span className="summary-label">Total Subtotal:</span>
              <span className="summary-value">
                ₱{cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <button 
              className="checkout-btn"
              onClick={() => {
                alert(`Order placed successfully!\nTotal Amount: ₱${cartTotal.toFixed(2)}`)
                onClearCart()
                onClose()
              }}
            >
              Checkout Now • ₱${cartTotal.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
