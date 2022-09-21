import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const { setFilterByName, setFilterByNumbers } = useContext(Context);
  const [filters, setAllFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setAllFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilterByNumbers((prevfilterByNumbers) => [
      ...prevfilterByNumbers,
      filters,
    ]);
  };

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ ({ target: { value } }) => setFilterByName({ name: value }) }
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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
        <button data-testid="button-filter" type="submit">Filtrar</button>
      </form>
    </section>
  );
}

export default Filters;
