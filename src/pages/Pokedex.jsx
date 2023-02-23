import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import PokeCard from "../components/pokedex/PokeCard";
import SelectTypes from "../components/pokedex/SelectTypes";
import Header from "../components/shared/Header";
import "./styles/pokedex.css";

const Pokedex = () => {
  const { nameTrainer } = useSelector((state) => state);

  const [pokemons, setPokemons] = useState();
  const [selectValue, setSelectValue] = useState("allpokemons");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectValue === "allpokemons") {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
      setIsLoading(true)
      axios
        .get(url)
        .then((res) => {
          setPokemons(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
          setTimeout(() => setIsLoading(false), 7000)
        })
    } else {
      axios
      setIsLoading(true)
        .get(selectValue)
        .then((res) => {
          const results = res.data.pokemon.map((e) => e.pokemon);
          setPokemons({ results });
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
          setTimeout(() => setIsLoading(false), 12000)
        })
        
    }
  }, [selectValue]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.pokemon.value.trim().toLowerCase();
    navigate(`/pokedex/${inputValue}`);
    e.target.pokemon.value = "";
  };

  return (
    <div className="pokedex">
      {
        isLoading ?
            <Loader />
          :
          <>
          <Header />
      <h1 className="pokedex__title">
        <span className="pokedex__title-name">Hi {nameTrainer}</span>, here find
        your favorite pokemon.
      </h1>
      <form className="poke__form" onSubmit={handleSubmit}>
        <div>
          <input className="poke__input" id="pokemon" type="text"
            placeholder="Pokemon name" />
          <button className="poke__btn">Search</button>
        </div>
        <div className="select__type">
          <SelectTypes setSelectValue={setSelectValue} />
        </div>
      </form>
      <div className="pokedex__container-pokemon">
        {pokemons?.results.map((pokemon) => (
          <PokeCard key={pokemon.url} pokemon={pokemon} />
        ))}
      </div>
      </>
      }
      </div>
      
  )
}

export default Pokedex;
