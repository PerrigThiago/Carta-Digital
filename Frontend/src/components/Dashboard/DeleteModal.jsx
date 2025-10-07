import React, { useState, useEffect } from 'react';
import './DeleteModal.css';

const DeleteModal = ({ 
  isOpen, 
  onClose, 
  onDeleteProduct, 
  onDeleteCategory, 
  products, 
  categories 
}) => {
  const [deleteType, setDeleteType] = useState('producto'); // 'producto' o 'categoria'
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (!isOpen) {
      // Resetear al cerrar
      setDeleteType('producto');
      setSelectedProduct('');
      setSelectedCategory('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (deleteType === 'producto') {
      if (!selectedProduct) {
        alert('Debes seleccionar un producto para eliminar');
        return;
      }
      
      const product = products.find(p => p.id === parseInt(selectedProduct));
      if (!product) {
        alert('Producto no encontrado');
        return;
      }
      
      const confirmacion = confirm(
        `¿Estás seguro de que quieres eliminar el producto?\n\n` +
        `Nombre: ${product.nombre}\n` +
        `Categoría: ${product.grupo}\n` +
        `Precio: $${product.precio}`
      );
      
      if (confirmacion) {
        onDeleteProduct(parseInt(selectedProduct));
        onClose();
      }
    } else {
      if (!selectedCategory) {
        alert('Debes seleccionar una categoría para eliminar');
        return;
      }
      
      const productsInCategory = products.filter(p => p.grupo === selectedCategory);
      
      const confirmacion = confirm(
        `¿Estás seguro de que quieres eliminar la categoría "${selectedCategory}"?\n\n` +
        `⚠️ ADVERTENCIA: Esto eliminará TODOS los productos de esta categoría.\n\n` +
        `Productos que se eliminarán: ${productsInCategory.length}\n` +
        `${productsInCategory.map(p => `• ${p.nombre}`).join('\n')}`
      );
      
      if (confirmacion) {
        onDeleteCategory(selectedCategory);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header delete-header">
          <h2>🗑️ Eliminar Producto o Categoría</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="delete-type-selector">
            <button
              type="button"
              className={`type-btn ${deleteType === 'producto' ? 'active' : ''}`}
              onClick={() => setDeleteType('producto')}
            >
              <span className="type-icon">🍕</span>
              <span className="type-label">Eliminar Producto</span>
              <span className="type-description">Elimina un producto específico</span>
            </button>
            
            <button
              type="button"
              className={`type-btn ${deleteType === 'categoria' ? 'active' : ''}`}
              onClick={() => setDeleteType('categoria')}
            >
              <span className="type-icon">📂</span>
              <span className="type-label">Eliminar Categoría</span>
              <span className="type-description">Elimina categoría y todos sus productos</span>
            </button>
          </div>

          <div className="form-group">
            {deleteType === 'producto' ? (
              <>
                <label htmlFor="producto">
                  <span className="label-icon">🍕</span>
                  Selecciona el producto a eliminar
                </label>
                <select
                  id="producto"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">-- Selecciona un producto --</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.nombre} - {product.grupo} - ${product.precio}
                    </option>
                  ))}
                </select>
                {selectedProduct && (
                  <div className="delete-preview">
                    <span className="preview-label">Se eliminará:</span>
                    <span className="preview-item">
                      {products.find(p => p.id === parseInt(selectedProduct))?.nombre}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                <label htmlFor="categoria">
                  <span className="label-icon">📂</span>
                  Selecciona la categoría a eliminar
                </label>
                <select
                  id="categoria"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">-- Selecciona una categoría --</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {selectedCategory && (
                  <div className="delete-preview danger">
                    <span className="preview-label">⚠️ Se eliminarán:</span>
                    <span className="preview-count">
                      {products.filter(p => p.grupo === selectedCategory).length} producto(s)
                    </span>
                    <div className="preview-list">
                      {products
                        .filter(p => p.grupo === selectedCategory)
                        .slice(0, 5)
                        .map(p => (
                          <div key={p.id} className="preview-item">• {p.nombre}</div>
                        ))
                      }
                      {products.filter(p => p.grupo === selectedCategory).length > 5 && (
                        <div className="preview-item">
                          ... y {products.filter(p => p.grupo === selectedCategory).length - 5} más
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-delete"
              disabled={deleteType === 'producto' ? !selectedProduct : !selectedCategory}
            >
              🗑️ Eliminar {deleteType === 'producto' ? 'Producto' : 'Categoría'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;

