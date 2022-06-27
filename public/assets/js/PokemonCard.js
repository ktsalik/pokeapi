function PokemonCard(props) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [isFavourite, setIsFavourite] = React.useState(null);
  const indicesRef = React.useRef();

  React.useEffect(() => {
    axios.get(props.data.url).then((response) => {
      setLoading(false);
      setData(response.data);
      props.onLoad(response.data);

      request.get(`api/pokemon/${response.data.id}`).then((response) => {
        setIsFavourite(response.data.is_favourite);
      });
    });
  }, []);

  useEffect(() => {
    if (indicesRef.current) {
      initDragToScroll(indicesRef.current);
    }
  }, [loading, indicesRef]);

  const onFavouriteClick = () => {
    request.get(`api/pokemon/favourite/${data.id}`).then((response) => {
      setIsFavourite(response.data.is_favourite);
    });
  };

  let spriteURL = '';

  if (data) {
    spriteURL = data.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_default;
    spriteURL = data.sprites.other.dream_world.front_default;
  }

  return (
    <div className="pokemon-card" style={{display: props.visible && (!props.visibleType || data.types.find((i) => i.type.name === props.visibleType)) ? 'flex' : 'none'}}>
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

          <div
            className="favourite"
            onClick={onFavouriteClick}
          >
            {
              isFavourite
                ? <i class="fa fa-heart fa-xl"></i>
                : <i class="fa-regular fa-heart fa-xl"></i>
            }
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
                  <span>{name.capitalize()}</span>
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
            {
              data.stats.map((stat, i) => {
                const value = stat.base_stat;

                return (
                  <div
                    key={i}
                    className="bars__item"
                  >
                    <div
                      className="bar"
                      style={{width: `${(value * 100) / 200}%`}}
                    ></div>
                  </div>
                );
              })
            }
          </div>
        </div>
      }
    </div>
  );
}
