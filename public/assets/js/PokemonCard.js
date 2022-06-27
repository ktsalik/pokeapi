function PokemonCard(props) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const indicesRef = React.useRef();

  React.useEffect(() => {
    axios.get(props.data.url).then((response) => {
      setLoading(false);
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    if (indicesRef.current) {
      initDragToScroll(indicesRef.current);
    }
  }, [loading, indicesRef]);

  let spriteURL = '';

  if (data) {
    spriteURL = data.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_default;
    spriteURL = data.sprites.other.dream_world.front_default;
  }

  return (
    <div className="pokemon-card">
      {
        loading === false && <div className="details">
          <div className="id">#{data.id}</div>

          <div className="base-experience">
            {data.base_experience}
            <span>Base Experience</span>
          </div>

          <div className="weight">
            {data.weight.toFixed(1)}kg
          </div>

          <div className="sprite">
            <img src={spriteURL} />
          </div>

          <div className="name">{data.name.capitalize()}</div>
          
          <div className="types">
            {data.types.map((typeItem, i) => {
              return (
                <div
                  key={i}
                  className="type"
                >
                  {typeItem.type.name.capitalize()}
                </div>
              );
            })}
          </div>

          <div className="abilities">
            {data.abilities.map((ability, i) => {
              return (
                <div
                  key={i}
                  className="ability"
                >
                  {ability.ability.name.capitalize()}
                </div>
              );
            })}
          </div>

          <div
            className="indices"
            ref={indicesRef}
          >
            {data.game_indices.map((version, i) => {
              return (
                <div
                  key={i}
                  className="version"
                >
                  {version.version.name.capitalize()}
                </div>
              );
            })}
          </div>
        </div>
      }

      {
        loading === false && <div className="stats">
          <div className="labels">
            {data.stats.map((stat, i) => {
              const name = stat.stat.name;

              return (
                <div
                  key={i}
                  className="labels__item"
                >
                  <span>{name}</span>
                </div>
              );
            })}
          </div>

          <div className="values">
            {data.stats.map((stat, i) => {
              const value = stat.base_stat;

              return (
                <div
                  key={i}
                  className="values__item"
                >
                  <span>{value}</span>
                </div>
              );
            })}
          </div>

          <div className="bars">

          </div>
        </div>
      }
    </div>
  );
}
