import './App.css'
import InputForCitySearch from './components/InputForCitySearch/InputForCitySearch'
import CityCardsList from './components/CityCardsList.js/CityCardsList'
import { useState, useEffect } from 'react'
import { ErrorAndLoadingProvider } from './ErrorContext'

function App() {
  const [weatherInfoList, setWeatherInfoList] = useState(() => {
    return JSON.parse(localStorage.getItem('savedWeatherCards')) || []
  })

  const [nextId, setNextId] = useState(() => {
    return parseInt(localStorage.getItem('savedNextId')) || 0
  })

  useEffect(() => {
    localStorage.setItem('savedWeatherCards', JSON.stringify(weatherInfoList))
    localStorage.setItem('savedNextId', nextId.toString())
  }, [weatherInfoList, nextId])

  return (
    <ErrorAndLoadingProvider>
      <div className="App">
        <InputForCitySearch
          setIdForCard={setNextId}
          nextId={nextId}
          onAddCity={setWeatherInfoList}
        ></InputForCitySearch>
        <CityCardsList
          cities={weatherInfoList}
          onDeleteCity={setWeatherInfoList}
          nextId={nextId}
          setIdForCard={setNextId}
        ></CityCardsList>
      </div>
    </ErrorAndLoadingProvider>
  )
}

export default App
