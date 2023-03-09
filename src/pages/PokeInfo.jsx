import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/pokeInfo.css'
import colors from '../utils/colorTypes'
import Header from '../components/shared/Header'
import PokemonNotFound from '../components/shared/PokemonNotFound'
import Loader from '../components/loader/Loader'

const PokeInfo = () => {
  const { id } = useParams();

  const [poke, setPoke] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setPoke(res.data);
        setHasError(false);
      })
      .catch((err) => {
        setHasError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => setIsLoading(false), 12000);
      });
  }, [id]);

  const colorTypes = poke?.types[0].type.name;

  if (hasError) {
    return (
      <div>
        <>
          <h1 className="not__found">404 NOT FOUND</h1>
          <PokemonNotFound />
        </>
      </div>
    );
  } else {
    return isLoading ? (
      <Loader />
    ) : (
      <div className="pokeInfo__container">
        <>
          <div className="headers">
            <Header />
          </div>
          <header className="pokeInfo__header">
            <div
              className="pokeHeader__img"
              style={{
                background: `linear-gradient(0deg, white 0 20%, ${colors[colorTypes]?.first} 22% 40%, ${colors[colorTypes]?.second} 43% 65%, ${colors[colorTypes]?.third} 68% 100%`,
              }}
            >
              <img
                className="img"
                src={poke?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
            <h2 className="pokeId" style={{ color: colors[colorTypes]?.third }}>
              #{poke?.id}
            </h2>
            <h1
              className="pokeInfo__name"
              style={{ color: colors[colorTypes]?.third }}
            >
              {poke?.name}
            </h1>
          </header>
          <div className="pokeInfo__WH">
            <div className="pokeInfo__characteristic">
              <div className="pokeBox__chart">
                <h4
                  className="poke__weight"
                  style={{ background: colors[colorTypes]?.first }}
                >
                  Weight
                </h4>
                <p className="poke-weight">{poke?.weight}</p>
              </div>
              <div className="pokeBox__chart">
                <h4
                  className="poke__height"
                  style={{ background: colors[colorTypes]?.first }}
                >
                  Height
                </h4>
                <p className="poke-height">{poke?.height}</p>
              </div>
            </div>
          </div>
          <div className="poke__type-hability">
            <div className="box__TH">
              <span
                className="type"
                style={{ background: colors[colorTypes]?.first }}
              >
                Type
              </span>
              <div className="poke__types-habilites">
                {poke?.types.map((type) => (
                  <span className="types" key={type.type.url}>
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="box__TH">
              <span
                className="hability"
                style={{ background: colors[colorTypes]?.first }}
              >
                Habilities
              </span>
              <div className="poke__types-habilites">
                {poke?.abilities.map((ability) => (
                  <span className="habilities" key={ability.ability.url}>
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <hr />
          <div className="container__stats">
            <h1>Stats</h1>
            {poke?.stats.map((stat) => (
              <div className="pokeStat__bar">
                <div className="text__bar">
                  <span key={stat.stat.url}>{stat.stat.name}</span>
                  <p>{stat.base_stat}/150</p>
                </div>
                <div
                  className="bar"
                  style={{
                    background: `linear-gradient(90deg, #E6901E 0, #FCD676 ${stat.base_stat}%, rgb(231, 231, 231) ${stat.base_stat}% 100%)`,
                  }}
                ></div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="move__title">Special Moves</h2>
            <div className="poke__moves">
              {poke?.moves.map((move) => (
                <h3 className="poke__name-move">{move.move.name}</h3>
              ))}
            </div>
          </div>
        </>
      </div>
    );
  }
}
    export default PokeInfo
