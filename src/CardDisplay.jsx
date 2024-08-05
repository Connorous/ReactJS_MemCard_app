import { useState, useEffect } from "react";
import uuid from "react-uuid";
import Card from "./Components/Card";
import "./styles/Card.css";

function PokemonCardDisplay({ Pokemon, IncreaseScore, ResetScore }) {
  var [pokemonDetails, setPokemonDetails] = useState([]);
  var [gotPokemonInfo, setGotPokemonInfo] = useState(false);

  var [selectedPokemon, SetSelectedPokemon] = useState([]);

  var [shuffledPokemonDetails, setShuffledPokemonDetails] = useState([]);

  var [shouldGetData, setShouldGetData] = useState(true);

  function uuidFromUuidV4() {
    const newUuid = uuid();
    return newUuid;
  }

  async function getPokemonInfo(pokemon) {
    if (!gotPokemonInfo && shouldGetData) {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      if (!response.ok) {
        setShouldGetData(false);
        console.log(
          "There was an issue connecting to the pokemon api, info on the listed pokemon could not be requested."
        );
        return null;
      } else {
        return data;
      }
    }
  }

  async function getAllPokemonInfo() {
    var pokeDetailsTemp = [];
    for (let i = 0; i < Pokemon.length; i++) {
      var details = await getPokemonInfo(Pokemon[i]);
      var currentPokemon = {
        Id: uuidFromUuidV4(),
        Name: Pokemon[i].name,
        Type: details.types[0].type.name,
        Ability: details.abilities[0].ability.name,
        Move1: details.moves[0].move.name,
        Move2: details.moves[1].move.name,
        Move3: details.moves[2].move.name,
        BaseXP: details.base_experience,
      };
      pokeDetailsTemp.push(currentPokemon);
    }
    setPokemonDetails(pokeDetailsTemp);
    setGotPokemonInfo(true);
  }

  useEffect(() => {
    if (!gotPokemonInfo && Pokemon.length !== 0) {
      getAllPokemonInfo();
      shuffleCards();
    }
  }, [Pokemon]);

  useEffect(() => {
    shuffleCards();
    setUpSelectedArray();
  }, [pokemonDetails]);

  function shuffleCards() {
    var shuffledCards = pokemonDetails.slice(0);
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      const temp = shuffledCards[i];
      shuffledCards[i] = shuffledCards[j];
      shuffledCards[j] = temp;
    }
    setShuffledPokemonDetails(shuffledCards);
  }

  function setUpSelectedArray() {
    SetSelectedPokemon(
      pokemonDetails.map((pokemon) => {
        return {
          Id: pokemon.Id,
          HasBeenSelected: false,
        };
      })
    );
  }

  function cardClicked(pokemonId) {
    for (let i = 0; i < selectedPokemon.length; i++) {
      if (selectedPokemon[i].Id === pokemonId) {
        if (!selectedPokemon[i].HasBeenSelected) {
          //console.log("Id is ", pokemonDetails[i].Id);
          SetSelectedPokemon(
            selectedPokemon.map((pokemon) => {
              if (pokemon.Id === pokemonId) {
                return {
                  ...pokemon,
                  HasBeenSelected: true,
                };
              } else {
                return pokemon;
              }
            })
          );
          IncreaseScore();
        } else {
          ResetScore();
          setUpSelectedArray();
        }
      }
    }
    shuffleCards();
  }

  return (
    <>
      <div className="card-grid">
        {shuffledPokemonDetails.map((pokemon) => (
          <Card
            key={pokemon.Name}
            Id={pokemon.Id}
            Name={pokemon.Name}
            Type={pokemon.Type}
            Ability={pokemon.Ability}
            BaseXP={pokemon.BaseXP}
            Move1={pokemon.Move1}
            Move2={pokemon.Move2}
            Move3={pokemon.Move3}
            cardClicked={cardClicked}
          ></Card>
        ))}
      </div>
    </>
  );
}

export default PokemonCardDisplay;
