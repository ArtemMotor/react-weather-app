import Container from '../Container/Container'
import CityCard from '../CityCard/CityCard'

export default function CityCardsList({
  cities,
  onDeleteCity,
  nextId,
  setIdForCard,
}) {
  return (
    <Container classes="Container Wrapper-weather-cards">
      {cities.map((city) => (
        <CityCard
          key={city.id}
          city={city.name}
          cardId={city.id}
          onDelete={onDeleteCity}
          setIdForCard={setIdForCard}
          nextId={nextId}
        ></CityCard>
      ))}
    </Container>
  )
}
