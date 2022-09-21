import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const { setFilterByName } = useContext(Context);
  return (
    <section>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ ({ target: { value } }) => setFilterByName({ name: value }) }
        />
      </form>
    </section>
  );
}

export default Filters;
