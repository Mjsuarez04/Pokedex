import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pokedex/styles/pokeCards.css'
import colors from '../../utils/colorTypes'

const PokeCard = ({ pokemon }) => {

    const [poke, setpoke] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(pokemon.url)
            .then(res => setpoke(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleClick = () => {
        navigate(`/pokedex/${poke.id}`)
    }

    const colorTypes = poke?.types[0].type.name

    return (
        <article onClick={handleClick} className='poke__card' style={{
            background: `linear-gradient(0deg, white 0 65%, ${colors[colorTypes]?.first} 65% 70%, ${colors[colorTypes]?.second} 80% 85%, ${colors[colorTypes]?.third} 95% 100%`,
            borderColor: colors[colorTypes]?.second
        }}>
            <header className='poke__header'>
                <img className='poke__img' src={poke?.sprites.other['official-artwork'].front_default} 
                alt="" />
            </header>
            <h2 className='poke__name' style={{ color: colors[colorTypes]?.third }} >{poke?.name}</h2>
            <ul className='poke__type-list'>
                {
                    poke?.types.map(type => (
                        <li className='poke__type-item' key={type.type.name}>{type.type.name}</li>
                    ))
                }
            </ul>
            <hr  className='poke__hr'/>
            <ul className='poke__stat-list'>
                {
                    poke?.stats.map(stat => (
                        <li className='poke__stat-item' key={stat.stat.url}>
                            <span className='poke__stat-name'>{stat.stat.name}</span>
                            <span className='poke__stat-number' style={{ color: colors[colorTypes]?.third }}>{stat.base_stat}</span>
                        </li>
                    ))
                }
            </ul>
        </article>
    )
}

export default PokeCard