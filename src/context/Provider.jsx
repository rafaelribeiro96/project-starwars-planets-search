import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/starWarsAPI';
import Context from './Context';

function Provider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetchPlanetsAPI();
      const planetsList = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanetsInfo(planetsList);
    };
    getPlanets();
  }, []);

  const context = {
    planetsInfo,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
