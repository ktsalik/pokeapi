const PokemonList = (props) => {
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="pokemon-list">
      <div className="topbar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={onSearchChange}
        />
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
          />
        );
      })}
    </div>
  );
}