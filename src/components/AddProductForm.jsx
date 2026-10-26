import { useState } from 'react'
import boy1Img from '../accesories/boy1.jpg'
import boysImg from '../accesories/boys.jpg'
import girlImg from '../accesories/girl.jpg'
import girl1Img from '../accesories/girl1.jpg'
import './AddProductForm.css'

export default function AddProductForm({ onAddProduct, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    rating: '',
    image: '',
    description: '',
    specification: ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  const sampleImages = [
    { label: 'Trucker Cap (Boy)', url: boy1Img },
    { label: 'Beaded Bracelet (Boy)', url: boysImg },
    { label: 'Plush Hair Clips (Girl)', url: girlImg },
    { label: 'Braided Headband (Girl)', url: girl1Img }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }))
        if (errorMessage) {
          setErrorMessage('')
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.price.toString().trim() ||
      !formData.quantity.toString().trim() ||
      !formData.rating.toString().trim() ||
      !formData.image.trim() ||
      !formData.description.trim() ||
      !formData.specification.trim()
    ) {
      setErrorMessage('Please fill in all fields before submitting!')
      return
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
      rating: parseFloat(formData.rating),
      image: formData.image,
      description: formData.description.trim(),
      specification: formData.specification.trim()
    }

    onAddProduct(newProduct)

    setFormData({
      name: '',
      category: '',
      price: '',
      quantity: '',
      rating: '',
      image: '',
      description: '',
      specification: ''
    })
    setErrorMessage('')
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Add New Accessory Product</h2>
        <p className="form-subtitle">Fill in all product specifications to add it to the inventory.</p>

        {errorMessage && (
          <div className="error-alert">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Product Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g., Titanium Chain Necklace" 
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="girl">Girl</option>
                <option value="boy">Boy</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (₱) *</label>
              <input 
                type="number" 
                name="price" 
                step="0.01" 
                min="0"
                value={formData.price} 
                onChange={handleChange} 
                placeholder="e.g., 250.00" 
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity *</label>
              <input 
                type="number" 
                name="quantity" 
                min="0"
                value={formData.quantity} 
                onChange={handleChange} 
                placeholder="e.g., 10" 
              />
            </div>

            <div className="form-group">
              <label>Rating (1.0 - 5.0) *</label>
              <input 
                type="number" 
                name="rating" 
                step="0.1" 
                min="1" 
                max="5"
                value={formData.rating} 
                onChange={handleChange} 
                placeholder="e.g., 4.9" 
              />
            </div>

            <div className="form-group full-width">
              <label>Feature Image *</label>
              
              <div className="image-input-options">
                <div className="upload-box">
                  <span className="picker-label">Upload from your device:</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="file-input"
                  />
                </div>

                <div className="url-box">
                  <span className="picker-label">Or paste image URL:</span>
                  <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange} 
                    placeholder="https://example.com/image.jpg" 
                  />
                </div>
              </div>

              <div className="sample-img-picker">
                <span className="picker-label">Or choose from sample presets:</span>
                <div className="sample-badges">
                  {sampleImages.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="sample-btn"
                      onClick={() => setFormData(prev => ({ ...prev, image: s.url }))}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {formData.image && (
                <div className="image-preview-box">
                  <span className="picker-label">Selected Image Preview:</span>
                  <img src={formData.image} alt="Preview" className="img-preview" />
                </div>
              )}
            </div>

            <div className="form-group full-width">
              <label>Description *</label>
              <textarea 
                name="description" 
                rows="3"
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Enter a brief product overview..."
              ></textarea>
            </div>

            <div className="form-group full-width">
              <label>Product Specification *</label>
              <textarea 
                name="specification" 
                rows="2"
                value={formData.specification} 
                onChange={handleChange} 
                placeholder="e.g., Material: Stainless steel; Dimensions: 50cm; Finish: Matte silver"
              ></textarea>
            </div>
          </div>

          <div className="form-buttons">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Product to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
