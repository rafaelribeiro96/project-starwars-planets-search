import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const { setFilterByName, setFilterByNumbers, filterByNumbers } = useContext(Context);
  const [filters, setAllFilters] = useState({
    column: 'population', comparison: 'maior que', number: 0,
  });
  const [columnFilter, setcolumnFilter] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const handleNumericFilter = ({ target: { name, value } }) => {
    setAllFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const addNumericFilter = (event) => {
    event.preventDefault();
    setFilterByNumbers((prevfilterByNumbers) => [
      ...prevfilterByNumbers, filters]);
  };

  useEffect(() => {
    if (filterByNumbers.length) {
      const newOptions = columnFilter.filter(
        (option) => filterByNumbers.some(({ column }) => option !== column),
      );
      setcolumnFilter(newOptions); setAllFilters((prevFilters) => ({
        ...prevFilters, column: newOptions[0] }));
    }
  }, [filterByNumbers]);

  return (
    <section>
      <form onSubmit={ addNumericFilter }>
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
            onChange={ handleNumericFilter }
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
            onChange={ handleNumericFilter }
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
          onChange={ handleNumericFilter }
        />
        <button data-testid="button-filter" type="submit">Filtrar</button>
      </form>
    </section>
  );
}

export default Filters;
