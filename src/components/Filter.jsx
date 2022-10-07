import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const { addFilterByName, addFilterNumbers, columnFilter,
    removeAllFilters } = useContext(Context);
  const [filters, setAllFilters] = useState({
    column: 'population', comparison: 'maior que', number: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setAllFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    setAllFilters((prevFilters) => ({
      ...prevFilters, column: columnFilter[0] }));
  }, [columnFilter]);

  return (
    <section>
      <form className="filter-css">
        <input
          type="text"
          data-testid="name-filter"
          onChange={ ({ target: { value } }) => addFilterByName(value) }
        />
        <label htmlFor="column-filter">
          Filtrar por coluna:
          <select
            name="column"
            value={ filters.column }
            data-testid="column-filter"
            id="column-filter"
            onChange={ handleChange }
          >
            {columnFilter.map((columnOption) => (
              <option key={ columnOption } value={ columnOption }>{columnOption}</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Comparação:
          <select
            name="comparison"
            value={ filters.comparison }
            data-testid="comparison-filter"
            id="comparison-filter"
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        Valor:
        <input
          type="number"
          name="number"
          data-testid="value-filter"
          value={ filters.number }
          onChange={ handleChange }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => addFilterNumbers(filters) }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover filtros
        </button>
      </form>
    </section>
  );
}

export default Filters;
