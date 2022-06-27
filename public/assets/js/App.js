const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPokemons(page);
  }, []);

  const fetchPokemons = (page) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 10}&limit=10`).then(async (response) => {
      let data = response.data.results;
      setPokemons(pokemons.concat(data));
    });
  };

  const onShowMoreClick = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchPokemons(newPage);
  };

  return (
    <div className="App">
      <PokemonList
        data={pokemons}
      ></PokemonList>

      <button
        className="btn-show-more"
        onClick={onShowMoreClick}
      >
        Show more
      </button>
    </div>
  );
};
