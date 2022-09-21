import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/starWarsAPI';
import Context from './Context';

function Provider({ children }) {
  const [planetsInfo, getPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filterByNumbers, setFilterByNumbers] = useState([]);

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

  const context = {
    planetsInfo,
    filterByName,
    setFilterByName,
    filterByNumbers,
    setFilterByNumbers,
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
