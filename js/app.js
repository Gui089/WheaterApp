const cityNameForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const weatherDetailContainer = document.querySelector('[data-js="weather"]')
const temperatureContainer = document.querySelector('[data-js="temperature"]')
const timeImageContainer = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
const cityCardContainer = document.querySelector('[data-js="city-card"]')

const getWeatherInfo = async inputValue => {
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] =
    await getWeatherData(Key)

  return { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon }
}

const showCard = () => {
  const cardClassList = cityCardContainer.classList
  const containDNone = cardClassList.contains('d-none')
  const removeDNone = cardClassList.remove('d-none')

  containDNone ? removeDNone : containDNone
}

const weatherInfoText = (container, info) => container.textContent = info

const insertWeatherInfoIntoDOM = (LocalizedName, WeatherText, Temperature) => {
  showCard()

  weatherInfoText(cityNameContainer, LocalizedName)
  weatherInfoText(weatherDetailContainer, WeatherText)
  weatherInfoText(temperatureContainer, Temperature.Metric.Value)
}

const changingTimeImage = IsDayTime => 
  IsDayTime
    ? timeImageContainer.setAttribute('src', './src/day.svg')
    : timeImageContainer.setAttribute('src', './src/night.svg') 

const changingTimeIcon = WeatherIcon => {
  const icon = `<img src='./src/icons/${WeatherIcon}.svg'></img>`

  timeIconContainer.innerHTML = icon
}

const showCityWeather = async inputValue => {
  const { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon } =
    await getWeatherInfo(inputValue)

  insertWeatherInfoIntoDOM(LocalizedName, WeatherText, Temperature)
  changingTimeImage(IsDayTime)
  changingTimeIcon(WeatherIcon)

  cityNameForm.reset()
}

cityNameForm.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  showCityWeather(inputValue)
})