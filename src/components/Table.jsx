import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Table() {
  const { planetsInfo, filterByName,
    filterByNumbers, removeFilter } = useContext(Context);

  const filterNumbersPlanets = (planet, column, comparison, number) => {
    switch (comparison) {
    case 'maior que':
      return Number(planet[column]) > Number(number);
    case 'menor que':
      return Number(planet[column]) < Number(number);
    case 'igual a':
      return Number(planet[column]) === Number(number);
    default: return false;
    }
  };

  let filterPlanets = planetsInfo;
  if (filterByName.name) {
    filterPlanets = planetsInfo.filter(({ name }) => name.toLowerCase()
      .includes(filterByName.name.toLowerCase()));
  }
  if (filterByNumbers.length) {
    filterPlanets = filterPlanets.filter((planet) => {
      let value = true;
      filterByNumbers.forEach(({ column, comparison, number }) => {
        if (planet[column] === 'unknown') { value = false; }
        const result = filterNumbersPlanets(planet, column, comparison, number);
        if (!result) { value = false; }
      });
      return value;
    });
  }

  return (
    <section>
      {filterByNumbers.map(({ column, comparison, number }, index) => (
        <div data-testid="filter" key={ index }>
          <p>{`Filtrando se ${column} ${comparison}: ${number}`}</p>
          <button
            onClick={ () => removeFilter(index) }
            type="button"
          >
            remover
          </button>
        </div>
      ))}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            filterPlanets.map((planet, index) => {
              const {
                name,
                rotation_period: rotationPeriod,
                orbital_period: orbitalPeriod,
                diameter,
                climate,
                gravity,
                terrain,
                surface_water: surfaceWater,
                population,
                created,
                edited,
                films,
                url,
              } = planet;

              return (
                <tr key={ index }>
                  <td>{ name }</td>
                  <td>{ rotationPeriod }</td>
                  <td>{ orbitalPeriod }</td>
                  <td>{ diameter }</td>
                  <td>{ climate }</td>
                  <td>{ gravity }</td>
                  <td>{ terrain }</td>
                  <td>{ surfaceWater }</td>
                  <td>{ population }</td>
                  <td>{ films }</td>
                  <td>{ created }</td>
                  <td>{ edited }</td>
                  <td>{ url }</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </section>
  );
}
