import React, { useState, useRef, useEffect } from 'react';
import './Menu.css';
import { useProducts } from '../../hooks/useProducts';

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
    { label: 'Ventas del Mes', value: '$2,450', icon: '💰', color: 'green' },
    { label: 'Reseñas', value: '4.8', icon: '⭐', color: 'orange' }
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

  // Función para agregar producto
  const handleAddProduct = async () => {
    const nombre = prompt('Nombre del producto:');
    if (!nombre || nombre.trim() === '') {
      alert('El nombre no puede estar vacío');
      return;
    }
    
    // Verificar si ya existe un producto con ese nombre
    const nombreExistente = products.find(p => p.nombre.toLowerCase() === nombre.trim().toLowerCase());
    if (nombreExistente) {
      alert(`Ya existe un producto con el nombre "${nombre.trim()}". Elige otro nombre.`);
      return;
    }
    
    const precioStr = prompt('Precio del producto:');
    const precio = Number(precioStr);
    if (Number.isNaN(precio) || precio <= 0) {
      alert('Precio inválido');
      return;
    }
    
    const grupo = prompt('Categoría del producto:');
    if (!grupo || grupo.trim() === '') {
      alert('La categoría no puede estar vacía');
      return;
    }
    // Validar que la categoría exista en el desplegable
    const cleanGroup = grupo.trim();
    const allowedGroups = Array.from(new Set([...(getUniqueGroups ? getUniqueGroups() : []), ...extraCategories])).filter(Boolean);
    if (!allowedGroups.includes(cleanGroup)) {
      alert(`La categoría "${cleanGroup}" no existe. Primero crea la categoría y luego vuelve a intentarlo.`);
      return;
    }
    
    try {
      const userId = getCurrentUserId();
      const productData = { 
        nombre: nombre.trim(), 
        precio: Math.round(precio),
        grupo: cleanGroup, 
        disponibilidad: true,
        usuario: { id: userId }
      };
      console.log('Enviando datos del producto:', productData);
      console.log('User ID:', userId);
      await createProduct(productData);
      
      alert('Producto creado exitosamente');
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

  // Función para agregar categoría
  const handleAddCategory = () => {
    const nueva = prompt('Nombre de nueva categoría:');
    if (nueva) {
      const clean = nueva.trim();
      if (!clean) return;
      
      // Verificar si la categoría ya existe (en categorías extra o en productos existentes)
      const existingGroups = getUniqueGroups ? getUniqueGroups() : [];
      const allExistingCategories = [...existingGroups, ...extraCategories];
      
      if (allExistingCategories.includes(clean)) {
        alert(`La categoría "${clean}" ya existe. Elige otro nombre.`);
        return;
      }
      
      if (!extraCategories.includes(clean)) {
        const updated = [...extraCategories, clean];
        setExtraCategories(updated);
        localStorage.setItem('extraCategories', JSON.stringify(updated));
      }
      alert(`Categoría "${clean}" creada. Asignala al crear/editar productos.`);
    }
  };

  // Función para eliminar categoría
  const handleDeleteCategory = async () => {
    const uniqueGroups = Array.from(new Set([...(getUniqueGroups ? getUniqueGroups() : []), ...extraCategories])).filter(Boolean);
    
    if (uniqueGroups.length === 0) {
      alert('No hay categorías para eliminar');
      return;
    }

    const categoria = prompt(`Selecciona la categoría a eliminar:\n\n${uniqueGroups.map((g, i) => `${i + 1}. ${g}`).join('\n')}\n\nIngresa el número o nombre de la categoría:`);
    
    if (!categoria) return;

    let categoriaSeleccionada = null;
    
    // Verificar si es un número
    const numero = parseInt(categoria);
    if (!isNaN(numero) && numero >= 1 && numero <= uniqueGroups.length) {
      categoriaSeleccionada = uniqueGroups[numero - 1];
    } else {
      // Verificar si es el nombre exacto
      if (uniqueGroups.includes(categoria.trim())) {
        categoriaSeleccionada = categoria.trim();
      } else {
        alert('Categoría no válida');
        return;
      }
    }

    // Confirmar eliminación
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoriaSeleccionada}"?\n\nEsto eliminará TODOS los productos de esta categoría.`);
    
    if (!confirmacion) return;

    try {
      await deleteCategory(categoriaSeleccionada);
      
      // Remover de categorías extra si existe
      if (extraCategories.includes(categoriaSeleccionada)) {
        const updated = extraCategories.filter(c => c !== categoriaSeleccionada);
        setExtraCategories(updated);
        localStorage.setItem('extraCategories', JSON.stringify(updated));
      }
      
      alert(`Categoría "${categoriaSeleccionada}" y todos sus productos han sido eliminados`);
    } catch (e) {
      console.error('Error eliminando categoría:', e);
      alert(`Error al eliminar la categoría: ${e.message || 'Error desconocido'}`);
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
            <button title="Agregar producto" onClick={handleAddProduct} disabled={loading}>
              ➕ Producto
            </button>
            <button title="Agregar categoría" onClick={handleAddCategory} disabled={loading}>
            ➕📂 Categoría
            </button>
            <button title="Eliminar categoría" onClick={handleDeleteCategory} disabled={loading}>
            🗑️📂 Eliminar Categoría
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
                    <button 
                      title="Borrar" 
                      onClick={() => handleRowDelete(product)} 
                      disabled={loading}
                    >
                      🗑️
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