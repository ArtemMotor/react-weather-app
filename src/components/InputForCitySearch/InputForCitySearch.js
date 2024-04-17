import Container from '../Container/Container'
import { useState, useRef, useEffect } from 'react'
import { useError } from '../../ErrorContext'
import spinner from '../../img/spinner.svg'
import axios from 'axios'

import { API_KEY } from '../../settings'

export default function InputForCitySearch({
  onAddCity,
  setIdForCard,
  nextId,
}) {
  const [cityName, setCityName] = useState('')
  const { error, setError, loading, setLoading } = useError()
  const inputRef = useRef(null)

  async function fetchWeatherData(cityName) {
    try {
      setLoading(true)
      const infoAboutCity = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&lang=ru`
      )

      addCityInList(infoAboutCity.data.name)
    } catch (error) {
      error.message = `Город "${cityName}" не найден. Возможно, название введено неправильно`
      console.error('Ошибка при получении данных о погоде:', error.message)
      setError(
        'Данные о городе не найдены. Попробуйте ввести название ещё раз!'
      )
      setCityName('')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 1900)

      return () => clearTimeout(timer)
    } else {
      setError(null)
    }
  }, [error, setError])

  function handleOnChangeInput(event) {
    setCityName(event.target.value)
  }

  function addCityInList(cityName) {
    setIdForCard(nextId + 1)
    onAddCity((currentWeatherInfoList) => {
      return [
        ...currentWeatherInfoList,
        {
          id: nextId,
          name: `${cityName.charAt(0).toUpperCase()}${cityName.slice(1)}`,
        },
      ]
    })
    setCityName('')
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      fetchWeatherData(cityName)
    }
  }

  function handleAddBtnClick() {
    fetchWeatherData(cityName)
    inputRef.current.focus()
  }

  return (
    <>
      <Container classes="Container Wrapper-city-search">
        <input
          ref={inputRef}
          onKeyDown={handleKeyPress}
          placeholder="Введите название города"
          className="Input-for-city-search"
          value={cityName}
          onChange={handleOnChangeInput}
        ></input>

        <button onClick={handleAddBtnClick} className="Add-city-btn">
          Добавить город
        </button>
        {error && <div className="Error-message">{error}</div>}
        {loading && (
          <div className="Loading-spinner">
            <img
              className="Loading-spinner-img"
              src={spinner}
              alt="spinner"
            ></img>
          </div>
        )}
      </Container>
    </>
  )
}
