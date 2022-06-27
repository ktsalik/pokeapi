const PokemonList = (props) => {
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('');

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    let data = props.data;

    if (searchQuery.length > 0) {
      data = data.filter((pokemon) => pokemon.name.includes(searchQuery));
    }

    setFilteredPokemons(data);
  }, [props.data, searchQuery]);

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onTypeChange = (e) => {
    setTypeQuery(e.target.value);
  };

  const onCardLoad = (data) => {
    const types = pokemonTypes;

    data.types.forEach((typeItem) => {
      if (types.indexOf(typeItem.type.name) === -1) {
        types.push(typeItem.type.name);
      }
    });

    setPokemonTypes(types);
    forceUpdate();
  };

  return (
    <div className="pokemon-list">
      <div className="topbar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={onSearchChange}
        />

        <select
          value={typeQuery}
          onChange={onTypeChange}
        >
          {
            pokemonTypes.map((type) => {
              return (
                <option value={type}>{type.capitalize()}</option>
              );
            })
          }
        </select>
      </div>

      {
        props.data.length > 0 && filteredPokemons.length === 0
          ? <span>No pokemons found matching "{props.query}"</span>
          : null
      }

      {props.data.map((pokemon, i) => {
        return (
          <PokemonCard
            key={i}
            data={pokemon}
            visible={filteredPokemons.find((p) => p.name === pokemon.name)}
            visibleType={typeQuery}
            onLoad={onCardLoad}
          />
        );
      })}
    </div>
  );
}