import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PokemonCardDisplay from "./CardDisplay";

function App() {
  const [count, setCount] = useState(0);
  var [pokemon, setPokemon] = useState([]);

  var [gotPokemon, setGotPokemon] = useState(false);

  var [shouldGetData, setShouldGetData] = useState(true);

  var [score, setScore] = useState(0);
  var [highScore, setHighScore] = useState(0);

  async function getPokemon() {
    if (!gotPokemon && shouldGetData) {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const data = await response.json();
      if (!response.ok) {
        setShouldGetData(false);
        console.log(
          "There was an issue connecting to the pokemon api, cannot get a list of pokemon."
        );
      } else {
        setPokemon(data.results);
        setGotPokemon(true);
      }
    }
  }

  useEffect(() => {
    getPokemon();
  }, [pokemon]);

  function increaseScore() {
    setScore(score + 1);
  }

  function resetScore() {
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
  }

  return (
    <>
      <div className="top-section">
        <div>
          <h1>Pokemon Memory Card Game</h1>
          <p>
            Get points by clicking on each card only once. The game resets when
            you click on a card you already clicked on.
          </p>
        </div>
        <div>
          <h3>Score: {score}</h3> <h3>Highest Score: {highScore}</h3>
        </div>
      </div>

      <PokemonCardDisplay
        Pokemon={pokemon}
        IncreaseScore={increaseScore}
        ResetScore={resetScore}
      ></PokemonCardDisplay>
    </>
  );
}

export default App;
