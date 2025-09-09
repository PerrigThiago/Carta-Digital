import React, { useState, useRef, useEffect } from 'react';
import './Menu.css';
import { useProducts } from '../../hooks/useProducts';

const Menu = () => {
  const [idFilter, setIdFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { products, filteredProducts, loading, error,
    createProduct, updateProduct, deleteProduct,
    updateFilters, clearFilters, getUniqueGroups
  } = useProducts();
  
  const [visibleCount, setVisibleCount] = useState(20);
  const tableRef = useRef(null);

  // Datos de ejemplo para las estadísticas
  const stats = [
    { label: 'Pedidos Hoy', value: '24', icon: '📦', color: 'blue' },
    { label: 'Ventas del Mes', value: '$2,450', icon: '💰', color: 'green' },
    { label: 'Reseñas', value: '4.8', icon: '⭐', color: 'orange' }
  ];

  const handleDisponibilidadChange = async (productId, disponible) => {
    try {
      await updateProduct(productId, { disponibilidad: disponible });
      console.log(`Producto ${productId} - Disponibilidad actualizada: ${disponible}`);
    } catch (error) {
      console.error('Error actualizando disponibilidad:', error);
    }
  } 

  const quickActions = [
    { label: 'Ver Menú', icon: '🍽️', action: 'menu' },
    { label: 'Categorías', icon: '📂', action: 'categorias' },
    { label: 'Productos', icon: '🍕', action: 'productos' }
  ];

  const handleAddProduct = async () => {
    const nombre = prompt('Nombre del producto:');
    const precio = Number(prompt('Precio:'));
    const grupo = prompt('Grupo (categoría):');
    if (!nombre || !grupo || Number.isNaN(precio)) return;
    try {
      await createProduct({ nombre, precio, grupo, disponibilidad: true });
      alert('Producto creado');
    } catch (e) {
      console.error('Error creando producto:', e);
      alert('Error al crear el producto');
    }
  };

  const handleEditProduct = async () => {
    const id = Number(prompt('ID del producto a editar:'));
    if (Number.isNaN(id)) return;
    const precio = Number(prompt('Nuevo precio:'));
    if (Number.isNaN(precio)) return;
    try {
      await updateProduct(id, { precio });
      alert('Producto actualizado');
    } catch (e) {
      console.error('Error editando producto:', e);
      alert('Error al editar el producto');
    }
  };

  const handleDeleteProduct = async () => {
    const id = Number(prompt('ID del producto a eliminar:'));
    if (Number.isNaN(id)) return;
    if (!confirm(`¿Eliminar producto ${id}?`)) return;
    try {
      await deleteProduct(id);
      alert('Producto eliminado');
    } catch (e) {
      console.error('Error eliminando producto:', e);
      alert('Error al eliminar el producto');
    }
  };

  const handleRowEdit = async (product) => {
    const precio = Number(prompt(`Nuevo precio para ${product.nombre}:`, product.precio));
    if (Number.isNaN(precio)) return;
    try { await updateProduct(product.id, { precio }); alert('Producto actualizado'); }
    catch (e) { console.error(e); alert('Error al actualizar'); }
  };

  const handleRowDelete = async (product) => {
    if (!confirm(`¿Eliminar "${product.nombre}" (ID ${product.id})?`)) return;
    try { await deleteProduct(product.id); alert('Producto eliminado'); }
    catch (e) { console.error(e); alert('Error al eliminar'); }
  };

  const handleAddCategory = () => {
    const nueva = prompt('Nombre de nueva categoría:');
    if (nueva) {
      alert(`Categoría "${nueva}" creada. Asignala al crear/editar productos.`);
    }
  };

  const renderActionButtons = (action) => {
    // Si es "Ver Menú", mostrar como botón que despliega la tabla
    if (action.label === 'Ver Menú') {
      return (
        <div className="action-item">
          <div className="action-header">
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
          </div>
          <button 
            className="menu-toggle-btn"
            onClick={() => setShowMenuTable(!showMenuTable)}
          >
            {showMenuTable ? 'Ocultar Menú' : 'Mostrar Menú'}
          </button>
        </div>
      );
    }
    
    // Para Categorías y Productos, mostrar botones
    return (
      <div className="action-item">
        <div className="action-header">
          <span className="action-icon">{action.icon}</span>
          <span className="action-label">{action.label}</span>
        </div>
        <div className="action-buttons">
          <button 
            className="action-btn add-btn" 
            onClick={handleAddProduct}
            title={`Agregar ${action.label}`}
            disabled={loading}
          >
            ➕
          </button>
          <button 
            className="action-btn edit-btn" 
            onClick={handleEditProduct}
            title={`Editar ${action.label}`}
            disabled={loading}
          >
            ✏️
          </button>
          <button 
            className="action-btn delete-btn" 
            onClick={handleDeleteProduct}
            title={`Borrar ${action.label}`}
            disabled={loading}
          >
            🗑️
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const onScroll = () => {
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
      if (nearBottom) {
        setVisibleCount(prev => Math.min(prev + 20, filteredProducts.length));
      }
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [filteredProducts.length]);

  const rows = filteredProducts
    .filter(p => idFilter ? String(p.id) === String(idFilter) : true)
    .slice(0, visibleCount);

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
              Mostrando {rows.length} de {filteredProducts.length} productos
            </span>
          </div>
        </div>

        <div className="table-toolbar">
          <div className="toolbar-left">
            <button title="Agregar producto" onClick={handleAddProduct} disabled={loading}>➕ Producto</button>
            <button title="Agregar categoría" onClick={handleAddCategory} disabled={loading}>📂➕ Categoría</button>
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
                setVisibleCount(20);
              }}
            />

            <span title="Filtrar por categoría">📂</span>
            <select
              value={categoryFilter}
              onChange={(e) => {
                const v = e.target.value;
                setCategoryFilter(v);
                updateFilters({ group: v || '' });
                setVisibleCount(20);
              }}
            >
              <option value="">Todas</option>
              {getUniqueGroups().map(g => (
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
                setVisibleCount(20);
              }}
            >🧹</button>

            <span title="Buscar/filtrar">🔍</span>
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
                    <input
                      type="checkbox"
                      checked={!!product.disponibilidad}
                      onChange={() => handleDisponibilidadChange(product.id, !product.disponibilidad)}
                      disabled={loading}
                    />
                  </td>
                  <td>
                    <button title="Editar" onClick={() => handleRowEdit(product)} disabled={loading}>✏️</button>
                    <button title="Borrar" onClick={() => handleRowDelete(product)} disabled={loading}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length < filteredProducts.length && (
          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <button onClick={() => setVisibleCount(v => Math.min(v + 20, filteredProducts.length))}>
              Cargar más
            </button>
          </div>
        )}
      </div>

      {/* Información del sistema */}
      <div className="system-info">
        <div className="info-card">
          <h4>Estado del Sistema</h4>
          <div className="status-indicators">
            <div className="status-item status-online">
              <span className="status-dot"></span>
              <span>Sistema Online</span>
            </div>
            <div className="status-item status-online">
              <span className="status-dot"></span>
              <span>Base de Datos Conectada</span>
            </div>
            <div className="status-item status-online">
              <span className="status-dot"></span>
              <span>API Funcionando</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
