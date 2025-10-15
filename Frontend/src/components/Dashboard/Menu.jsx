import React, { useState, useRef, useEffect } from 'react';
import './Menu.css';
import { useProducts } from '../../hooks/useProducts';
import ProductModal from './ProductModal';
import DeleteModal from './DeleteModal';

const Menu = () => {
  // Estados locales
  const [idFilter, setIdFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);
  const tableRef = useRef(null);
  const [extraCategories, setExtraCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('extraCategories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Hook de productos
  const { 
    products, 
    filteredProducts, 
    loading, 
    error,
    createProduct, 
    updateProduct, 
    deleteProduct,
    deleteCategory,
    updateFilters, 
    clearFilters, 
    getUniqueGroups 
  } = useProducts();
  
  // Datos de ejemplo para las estadísticas
  const stats = [
    { label: 'Pedidos Hoy', value: '24', icon: '📦', color: 'blue' },
    { label: 'Ventas del Mes', value: '$2,450', icon: '💰', color: 'green' }
  ];

  // Función para obtener el ID del usuario actual
  const getCurrentUserId = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      return currentUser.id || 1;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return 1;
    }
  };

  // Función para cambiar disponibilidad
  const handleDisponibilidadChange = async (productId, disponible) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) {
        alert('Producto no encontrado');
        return;
      }
      
      await updateProduct(productId, { 
        disponibilidad: disponible,
        nombre: product.nombre,
        precio: product.precio,
        grupo: product.grupo,
        // backend toma el usuario del contexto, no enviar
      });
      
      console.log(`Producto ${productId} - Disponibilidad actualizada: ${disponible}`);
    } catch (error) {
      console.error('Error actualizando disponibilidad:', error);
      alert('Error al actualizar disponibilidad');
    }
  };

  // Función para editar solo disponibilidad con confirmación
  const handleDisponibilidadToggle = async (product) => {
    const nuevaDisponibilidad = !product.disponibilidad;
    const mensaje = nuevaDisponibilidad 
      ? `¿Marcar "${product.nombre}" como DISPONIBLE?`
      : `¿Marcar "${product.nombre}" como NO DISPONIBLE?`;
    
    if (confirm(mensaje)) {
      await handleDisponibilidadChange(product.id, nuevaDisponibilidad);
    }
  };

  // Función para agregar producto desde el modal
  const handleProductModalSubmit = async (productData) => {
    // Verificar si ya existe un producto con ese nombre
    const nombreExistente = products.find(p => p.nombre.toLowerCase() === productData.nombre.toLowerCase());
    if (nombreExistente) {
      alert(`Ya existe un producto con el nombre "${productData.nombre}". Elige otro nombre.`);
      return;
    }
    
    try {
      const userId = getCurrentUserId();
      const fullProductData = { 
        ...productData,
        disponibilidad: true,
        usuario: { id: userId }
      };
      console.log('Enviando datos del producto:', fullProductData);
      await createProduct(fullProductData);
      
      alert('Producto creado exitosamente ✓');
    } catch (e) {
      console.error('Error creando producto:', e);
      alert(`Error al crear el producto: ${e.message || 'Error desconocido'}`);
    }
  };

  // Función para editar producto
  const handleRowEdit = async (product) => {
    // Editar nombre
    const nuevoNombre = prompt(`Editar nombre del producto:`, product.nombre);
    if (!nuevoNombre || nuevoNombre.trim() === '') {
      alert('El nombre no puede estar vacío');
      return;
    }
    
    // Verificar si ya existe otro producto con ese nombre (excluyendo el actual)
    const nombreExistente = products.find(p => 
      p.id !== product.id && 
      p.nombre.toLowerCase() === nuevoNombre.trim().toLowerCase()
    );
    if (nombreExistente) {
      alert(`Ya existe otro producto con el nombre "${nuevoNombre.trim()}". Elige otro nombre.`);
      return;
    }
    
    // Editar precio
    const precioStr = prompt(`Editar precio para "${nuevoNombre}":`, product.precio);
    const precio = Number(precioStr);
    if (Number.isNaN(precio) || precio <= 0) {
      alert('Precio inválido');
      return;
    }
    
    // Editar grupo
    const nuevoGrupo = prompt(`Editar categoría para "${nuevoNombre}":`, product.grupo);
    if (!nuevoGrupo || nuevoGrupo.trim() === '') {
      alert('La categoría no puede estar vacía');
      return;
    }
    
    try { 
      await updateProduct(product.id, { 
        nombre: nuevoNombre.trim(),
        precio: Math.round(precio),
        grupo: nuevoGrupo.trim(),
        disponibilidad: product.disponibilidad
      }); 
      alert('Producto actualizado exitosamente'); 
    } catch (e) { 
      console.error('Error editando producto:', e);
      alert(`Error al actualizar: ${e.message || 'Error desconocido'}`);
    }
  };

  // Función para eliminar producto
  const handleRowDelete = async (product) => {
    if (!confirm(`¿Eliminar "${product.nombre}" (ID ${product.id})?`)) return;
    
    try { 
      await deleteProduct(product.id); 
      alert('Producto eliminado exitosamente'); 
    } catch (e) { 
      console.error('Error eliminando producto:', e);
      alert(`Error al eliminar: ${e.message || 'Error desconocido'}`);
    }
  };

  // Función para crear categoría (llamada desde el modal de producto)
  const handleCreateCategory = (categoryName) => {
    const clean = categoryName.trim();
    if (!clean) return;
    
    // Verificar si la categoría ya existe
    const existingGroups = getUniqueGroups ? getUniqueGroups() : [];
    const allExistingCategories = [...existingGroups, ...extraCategories];
    
    if (allExistingCategories.includes(clean)) {
      return; // Ya existe, no hacer nada
    }
    
    if (!extraCategories.includes(clean)) {
      const updated = [...extraCategories, clean];
      setExtraCategories(updated);
      localStorage.setItem('extraCategories', JSON.stringify(updated));
    }
  };

  // Función para eliminar categoría desde el modal
  const handleDeleteCategoryFromModal = async (categoryName) => {
    try {
      await deleteCategory(categoryName);
      
      // Remover de categorías extra si existe
      if (extraCategories.includes(categoryName)) {
        const updated = extraCategories.filter(c => c !== categoryName);
        setExtraCategories(updated);
        localStorage.setItem('extraCategories', JSON.stringify(updated));
      }
      
      alert(`Categoría "${categoryName}" y todos sus productos han sido eliminados ✓`);
    } catch (e) {
      console.error('Error eliminando categoría:', e);
      alert(`Error al eliminar la categoría: ${e.message || 'Error desconocido'}`);
    }
  };

  // Función para eliminar producto desde el modal
  const handleDeleteProductFromModal = async (productId) => {
    try {
      await deleteProduct(productId);
      alert('Producto eliminado exitosamente ✓');
    } catch (e) {
      console.error('Error eliminando producto:', e);
      alert(`Error al eliminar: ${e.message || 'Error desconocido'}`);
    }
  };

  // Efecto para scroll infinito
  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const onScroll = () => {
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
      if (nearBottom) {
        setVisibleCount(prev => Math.min(prev + 20, products.length));
      }
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [products.length]);

  // Filtrar productos
  const rows = (filteredProducts.length > 0 ? filteredProducts : products)
    .filter(p => idFilter ? String(p.id) === String(idFilter) : true)
    .slice(0, visibleCount);

  // Obtener categorías únicas (productos + extras persistidas)
  const uniqueGroupsBase = getUniqueGroups ? getUniqueGroups() : [];
  const uniqueGroups = Array.from(new Set([...(uniqueGroupsBase||[]), ...(extraCategories||[])])).filter(Boolean);

  return (
    <div className="menu-container">
      {/* Sección de bienvenida */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2 className="welcome-title">¡Bienvenido a tu Dashboard!</h2>
          <p className="welcome-subtitle">
            Gestiona tu restaurante de manera eficiente desde un solo lugar
          </p>
        </div>
        <div className="welcome-illustration">
          <span className="welcome-emoji">🎉</span>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla del menú de productos */}
        <div className="menu-table-section">
          <div className="table-header">
            <h3 className="section-title">Menú de Productos</h3>
            <div className="table-info">
              <span className="product-count">
              Mostrando {rows.length} de {products.length} productos
              </span>
            </div>
          </div>

        {/* Mostrar errores y carga */}
        {loading && <div style={{ padding: '10px', textAlign: 'center', color: 'white' }}>Cargando productos...</div>}
        {error && <div style={{ padding: '10px', textAlign: 'center', color: 'red', background: 'rgba(255,0,0,0.1)' }}>Error: {error}</div>}

        <div className="table-toolbar">
          <div className="toolbar-left">
            <button 
              className="btn-add-product" 
              title="Agregar producto" 
              onClick={() => setIsProductModalOpen(true)} 
              disabled={loading}
            >
              ➕ Producto
            </button>
            <button 
              className="btn-delete" 
              title="Eliminar producto o categoría" 
              onClick={() => setIsDeleteModalOpen(true)} 
              disabled={loading}
            >
              🗑️ Eliminar
            </button>
          </div>

          <div className="filters">
            <span title="Filtrar por ID">🔢</span>
            <input
              type="number"
              placeholder="ID"
              value={idFilter}
              onChange={(e) => setIdFilter(e.target.value)}
              style={{ width: 90 }}
            />

            <span title="Filtrar por nombre">🔤</span>
            <input
              type="text"
              placeholder="Nombre"
              value={nameFilter}
              onChange={(e) => {
                const v = e.target.value;
                setNameFilter(v);
                updateFilters({ searchTerm: v });
                setVisibleCount(50);
              }}
            />

            <span title="Filtrar por categoría">📂</span>
            <select
              value={categoryFilter}
              onChange={(e) => {
                const v = e.target.value;
                setCategoryFilter(v);
                updateFilters({ group: v || '' });
                setVisibleCount(50);
              }}
            >
              <option value="">Todas</option>
              {uniqueGroups.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <button
              title="Limpiar filtros"
              onClick={() => {
                setIdFilter('');
                setNameFilter('');
                setCategoryFilter('');
                clearFilters();
                setVisibleCount(50);
              }}
            >
              🧹
            </button>
          </div>
        </div>

        <div className="table-container scrollable" ref={tableRef}>
            <table className="menu-table">
              <thead>
                <tr>
                <th>ID</th>
                  <th>Categoría</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Disponible</th>
                <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {rows.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.grupo}</td>
                  <td>{product.nombre}</td>
                  <td>${Number(product.precio).toFixed(2)}</td>
                  <td>
                    <button
                      className={`disponibilidad-btn ${product.disponibilidad ? 'disponible' : 'no-disponible'}`}
                      onClick={() => handleDisponibilidadToggle(product)}
                      disabled={loading}
                      title={product.disponibilidad ? 'Marcar como no disponible' : 'Marcar como disponible'}
                    >
                      {product.disponibilidad ? '✅' : '❌'}
                    </button>
                  </td>
                  <td>
                    <button 
                      title="Editar" 
                      onClick={() => handleRowEdit(product)} 
                      disabled={loading}
                    >
                      ✏️
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        {rows.length < products.length && (
          <div className="load-more-container">
            <button onClick={() => setVisibleCount(v => Math.min(v + 20, products.length))}>
              Cargar más
            </button>
        </div>
      )}
      </div>

      {/* Modales */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={handleProductModalSubmit}
        existingCategories={uniqueGroups}
        onCreateCategory={handleCreateCategory}
      />
      
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteProduct={handleDeleteProductFromModal}
        onDeleteCategory={handleDeleteCategoryFromModal}
        products={products}
        categories={uniqueGroups}
      />
    </div>
  );
};

export default Menu;