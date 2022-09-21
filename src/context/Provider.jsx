import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/starWarsAPI';
import Context from './Context';

const COLUMNS = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function Provider({ children }) {
  const [planetsInfo, getPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filterByNumbers, setFilterByNumbers] = useState([]);
  const [columnFilter, setColumnFilter] = useState(COLUMNS);

  useEffect(() => {
    const fetchPlanets = async () => {
      const { results } = await fetchPlanetsAPI();
      const planetsList = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      getPlanets(planetsList);
    };
    fetchPlanets();
  }, []);

  const addFilterByName = (name) => {
    setFilterByName({ name });
  };

  const addFilterNumbers = (filters) => {
    setFilterByNumbers((prevFilterByNumbers) => [
      ...prevFilterByNumbers, filters]);
  };

  useEffect(() => {
    if (filterByNumbers.length) {
      const newColumnFilter = COLUMNS.filter(
        (option) => filterByNumbers.some(({ column }) => option !== column),
      );
      setColumnFilter(newColumnFilter);
    }
  }, [filterByNumbers]);

  const removeFilter = (indexFilter) => {
    const filters = filterByNumbers.filter((_, index) => index !== indexFilter);
    setFilterByNumbers(filters);
  };

  const removeAllFilters = () => {
    setFilterByNumbers([]);
    setColumnFilter(COLUMNS);
  };

  const context = {
    planetsInfo,
    filterByName,
    filterByNumbers,
    columnFilter,
    removeFilter,
    removeAllFilters,
    addFilterByName,
    addFilterNumbers,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
