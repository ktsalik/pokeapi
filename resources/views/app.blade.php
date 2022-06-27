<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  
  <link href="assets/css/App.css" rel="stylesheet">
  <link href="assets/css/PokemonList.css" rel="stylesheet">
  <link href="assets/css/PokemonCard.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.min.js" integrity="sha512-bPh3uwgU5qEMipS/VOmRqynnMXGGSRv+72H/N260MQeXZIK4PG48401Bsby9Nq5P5fz7hy5UGNmC/W1Z51h2GQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="assets/js/helpers.js"></script>
  <script type="text/babel" src="assets/js/App.js"></script>
  <script type="text/babel" src="assets/js/PokemonList.js"></script>
  <script type="text/babel" src="assets/js/PokemonCard.js"></script>
  <script type="text/babel">
    const request = axios.create({
      baseURL: 'http://localhost/pokeapi/public/',
      timeout: 1000,
      headers: {'X-Custom-Header': 'foobar'}
    });

    window.request = request;

    const useState = React.useState;
    const useEffect = React.useEffect;

    const root = ReactDOM.createRoot(document.querySelector('#root'));
    root.render(
      <App></App>
    );

    String.prototype.capitalize = function() {
      return this.replace(/\b\w/g, function(l){ return l.toUpperCase() });
    };
  </script>
</body>
</html>
