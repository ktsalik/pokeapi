const PokemonList = (props) => {
  return (
    <div className="pokemon-list">
      {props.data.map((pokemon, i) => {
        return (
          <PokemonCard
            key={i}
            data={pokemon}
          />
        );
      })}
    </div>
  );
}