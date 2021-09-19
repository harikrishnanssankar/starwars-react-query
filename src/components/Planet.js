const Planet = ({ planet, person }) => {
  if (person) {
    return (
      <div className="card">
        <h3>{person.name}</h3>
        <p>Gender - {person.gender}</p>
        <p>Birth year - {person.birth_year}</p>
      </div>
    );
  }
  if (planet) {
    return (
      <div className="card">
        <h3>{planet.name}</h3>
        <p>Population - {planet.population}</p>
        <p>Terrain - {planet.terrain}</p>
      </div>
    );
  }
};

export default Planet;
