import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const allCategories = ['TODOS', ...categories];

  return (
    <div className="category-filter">
      <div className="category-buttons">
        {allCategories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category === 'TODOS' ? '🍽️ Todos' : 
             category === 'PIZZAS' ? '🍕 Pizzas' :
             category === 'BEBIDAS' ? '🥤 Bebidas' :
             category === 'POSTRES' ? '🍰 Postres' :
             category === 'ENTRADAS' ? '🥗 Entradas' :
             `🍽️ ${category}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
