const apiKey = 'rjOfrARhMalAXMDp1YUF0hACKuAwkPYa'
const basedUrl = 'https://dataservice.accuweather.com/'

const getCityDataUrl = cityName =>
  `${basedUrl}locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`

const getWeatherUrl = cityKey =>
  `${basedUrl}currentconditions/v1/${cityKey}?apikey=${apiKey}&language=pt-br`

const getRequestData = async (url) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Não foi possivel obter os dados')
    }

    return response.json()
  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
  }
}

const getCityData = cityName => getRequestData(getCityDataUrl(cityName))
const getWeatherData = cityKey => getRequestData(getWeatherUrl(cityKey))