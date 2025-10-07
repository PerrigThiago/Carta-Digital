import React, { useState, useEffect } from 'react';
import './ProductModal.css';

const ProductModal = ({ isOpen, onClose, onSubmit, existingCategories, onCreateCategory }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    nuevaCategoria: ''
  });
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Resetear formulario al cerrar
      setFormData({
        nombre: '',
        precio: '',
        categoria: '',
        nuevaCategoria: ''
      });
      setIsCreatingCategory(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.nombre.trim()) {
      alert('El nombre del producto es requerido');
      return;
    }
    
    const precio = parseFloat(formData.precio);
    if (isNaN(precio) || precio <= 0) {
      alert('El precio debe ser un número mayor a 0');
      return;
    }
    
    let categoriaFinal = formData.categoria;
    
    // Si está creando una nueva categoría
    if (isCreatingCategory) {
      if (!formData.nuevaCategoria.trim()) {
        alert('El nombre de la nueva categoría es requerido');
        return;
      }
      categoriaFinal = formData.nuevaCategoria.trim();
      
      // Verificar que no exista ya
      if (existingCategories.includes(categoriaFinal)) {
        alert(`La categoría "${categoriaFinal}" ya existe. Selecciónala del menú desplegable.`);
        return;
      }
      
      // Crear la categoría
      onCreateCategory(categoriaFinal);
    } else {
      if (!formData.categoria) {
        alert('Debes seleccionar una categoría o crear una nueva');
        return;
      }
    }
    
    // Enviar datos
    onSubmit({
      nombre: formData.nombre.trim(),
      precio: Math.round(precio),
      grupo: categoriaFinal
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ Agregar Nuevo Producto</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="nombre">
              <span className="label-icon">📝</span>
              Nombre del Producto
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Pizza Margherita"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio">
              <span className="label-icon">💰</span>
              Precio
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Ej: 150"
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>
              <span className="label-icon">📂</span>
              Categoría
            </label>
            
            <div className="category-toggle">
              <button
                type="button"
                className={`toggle-btn ${!isCreatingCategory ? 'active' : ''}`}
                onClick={() => setIsCreatingCategory(false)}
              >
                Seleccionar existente
              </button>
              <button
                type="button"
                className={`toggle-btn ${isCreatingCategory ? 'active' : ''}`}
                onClick={() => setIsCreatingCategory(true)}
              >
                Crear nueva
              </button>
            </div>

            {!isCreatingCategory ? (
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                disabled={isCreatingCategory}
              >
                <option value="">-- Selecciona una categoría --</option>
                {existingCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="nuevaCategoria"
                value={formData.nuevaCategoria}
                onChange={handleChange}
                placeholder="Ej: Bebidas, Postres, etc."
              />
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              ✓ Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;

