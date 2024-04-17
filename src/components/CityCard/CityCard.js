import { useState, useEffect, useCallback } from 'react'
import { API_KEY } from '../../settings'
// import sunnySmall from '../../img/Sunny-medium.png'
import axios from 'axios'

export default function CityCard({
  city,
  cardId,
  onDelete,
  setIdForCard,
  nextId,
}) {
  const [data, setData] = useState(null)
  const [isVisible, setIsVisible] = useState(true)

  const getWeatherData = useCallback(async (city) => {
    // Запрос к Geocoding API
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    )

    const { lat, lon } = geoResponse.data[0]

    // Запрос к OpenWeather API
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
    )

    setData(weatherResponse.data) // Здесь будут данные о погоде
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await getWeatherData(city)
    }

    fetchData()
  }, [city, getWeatherData])

  if (!data) {
    return null
  }

  const { weather, main } = data // забираем название города, и все данные для погоды(в нашем случае name не используем, так как он иногда берёт странное название для города. Просто используем значение из инпута пользователя. Но в целом можно добавить переменную name и использовать её для названия во время рендеринга в div с классом City-name)

  const { description, icon } = weather[0] // берём описание и иконку из weather
  let { feels_like, temp, humidity } = main // берём необходимые для карточки данные из main

  // Потом всё это вставляем в карточку

  function removeCityFromList() {
    onDelete((prevWeatherInfoList) =>
      prevWeatherInfoList.filter((city) => city.id !== cardId)
    )

    onDelete((prevWeatherInfoList) =>
      prevWeatherInfoList.map((cardWithInfo, index) => ({
        ...cardWithInfo,
        id: index,
      }))
    )

    setIdForCard(nextId - 1)
  }

  function handleDelete() {
    setIsVisible(false)
    setTimeout(() => {
      removeCityFromList()
      setIsVisible(true)
    }, 400)
  }

  return (
    <div className={`City-card ${isVisible ? 'Visible' : 'Hidden'}`}>
      <div className="Btn-wrapper">
        <button className="Edit-btn">Edit</button>
        <button className="Del-btn" onClick={handleDelete}>
          X
        </button>
      </div>
      <div className="Card-info-wrapper">
        <img
          className="Weather-img"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="icon"
        ></img>
        <div className="City-name">{city}</div>
        <div className="Weather-info">{`${description
          .charAt(0)
          .toUpperCase()}${description.slice(1)}`}</div>
        <div className="Temperature-info">
          {temp.toFixed() === '-0' ? 0 : temp.toFixed()}°C
        </div>
      </div>
      <div className="Weather-dopInfo">
        <div className="Humidity-info">Влажность: {humidity}</div>
        <div className="Feels-like-info">
          Ощущается как:{' '}
          {feels_like.toFixed() === '-0' ? 0 : feels_like.toFixed()}°C
        </div>
      </div>
    </div>
  )
}
