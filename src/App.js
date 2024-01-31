import React, { useEffect, useState } from 'react';
import './App.css';
import logoimage from'./pokemon1.png'
import logoimage1 from './pokemon2.png'
function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const getAllPokemons = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await res.json();

      // Fetch additional details for each Pokemon
      const pokemonDetails = await Promise.all(
        data.results.map(async (item) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`);
          return response.json();
        })
      );

      setAllPokemons(pokemonDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openDialog = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeDialog = () => {
    setSelectedPokemon(null);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className='main'>
      
      <h1 className='header'><img src={logoimage} className='logo1'/>   Pokémania   <img src={logoimage1} className='logo2'/></h1>
      <div className='container'>
        {allPokemons.map((item) => (
          <div className='card' key={item.id}>
            <h1 className='name'>{item.name}</h1>
            <img src={item.sprites.other.dream_world.front_default} alt='Loading' className='imgs'></img>
            <a href="#" onClick={() => openDialog(item)}>KNOW MORE</a>
          </div>
        ))}
      </div>

      {selectedPokemon && (
          <div className="dialog-overlay">
          <div className="dialog-content">
            <span className="dialog-close" onClick={closeDialog}>&times;</span>
            <img src={selectedPokemon.sprites.other.dream_world.front_default} alt='Loading'></img>
            
            <h1 className='dialoge-name'>{selectedPokemon.name}</h1>
            <p className='stats'><p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <p>Stats:</p>
            
            <ul>
              
              {selectedPokemon.stats.map((stat) => (
              
                <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
              ))}
            </ul>
            </p>
            
          
            
           
          </div>
          </div>
        
      
      )}
    </div>
  );
}

export default App;
