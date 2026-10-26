import './ProductTable.css'

export default function ProductTable({ 
  products, 
  onSelectProduct, 
  onAddToCart,
  onUpdateQuantity 
}) {
  return (
    <div className="table-responsive">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const isLowStock = Number(product.quantity) < 5
            const subtotal = Number(product.price) * Number(product.quantity)

            return (
              <tr 
                key={product.id} 
                className={isLowStock ? 'row-low-stock' : ''}
              >
                <td>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="table-thumb"
                    onClick={() => onSelectProduct(product)} 
                  />
                </td>
                <td className="table-name-cell">
                  <strong>{product.name}</strong>
                  <div className="table-stars">★ {product.rating}</div>
                </td>
                <td>
                  <span className="category-pill">{product.category}</span>
                </td>
                <td>₱{Number(product.price).toFixed(2)}</td>
                <td>
                  <div className="table-qty-control">
                    <button 
                      className="qty-btn-sm"
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      disabled={Number(product.quantity) <= 0}
                    >
                      -
                    </button>
                    <span className={`qty-number ${isLowStock ? 'qty-low' : ''}`}>
                      {product.quantity}
                    </span>
                    <button 
                      className="qty-btn-sm"
                      onClick={() => onUpdateQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="table-subtotal-cell">
                  ₱{subtotal.toLocaleString()}
                </td>
                <td>
                  {isLowStock ? (
                    <span className="badge-low">Low Stock</span>
                  ) : (
                    <span className="badge-good">In Stock</span>
                  )}
                </td>
                <td>
                  <div className="table-action-btns">
                    <button 
                      className="table-view-btn"
                      onClick={() => onSelectProduct(product)}
                    >
                      View
                    </button>
                    <button 
                      className="table-cart-btn"
                      onClick={() => onAddToCart(product)}
                      disabled={Number(product.quantity) <= 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
