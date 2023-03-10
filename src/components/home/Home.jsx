import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../../store/slices/trainerName.slice'
import squirtle from '../../../public/image/squirtle.png'
import '../home/home.css'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.name.value.trim()))
        e.target.name.value = ''
        navigate('/pokedex')
    }

    return (
        <div className='poke__container-home'>
            <div className='home'>
            <img className='poke__img-home' src="../../image/image 11.png" alt="" />
            <h2 className='poke__title-home'>Hi Trainer</h2>
            <p className='poke__info-home'>Give your name to get in your pokedex</p>
            <form className='poke__home-form' onSubmit={handleSubmit}>
                <input className='poke__input-home' id='name' type="text" 
                    placeholder='Your name'/>
                <button className='poke__btn-home'>GO</button>
            </form>
            </div>
            <div className='img__container'>
                <img className='pika__img' src="../../image/Pikachu.png" alt="" />
                <img className='squirtle' src={squirtle} alt="" />
                <img className='charmander__img' src="https://www.pngmart.com/files/13/Charmander-PNG-HD.png" alt="" />
            </div>
            <footer className='poke__footer'>
                <div className='footer__black'></div>
            </footer>
        </div> 
    )
}

export default Home