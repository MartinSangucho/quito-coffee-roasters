// ============================================
// MÓDULO DE APIs - Consumo de APIs públicas
// ============================================

const QUOTABLE_API = 'https://api.quotable.io/random';
const OPEN_METEO_API = 'https://api.open-meteo.com/v1/forecast?latitude=-0.1807&longitude=-78.4678&current_weather=true';
const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest/USD';

/**
 * Obtiene una frase inspiracional de la API Quotable
 * @returns {Promise<{content: string, author: string}>} Frase y autor
 */
export const fetchDailyQuote = async () => {
  try {
    const response = await fetch(QUOTABLE_API);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    return {
      content: data.content || 'El café es el aceite social del mundo.',
      author: data.author || 'Anónimo'
    };
  } catch (error) {
    console.warn('No se pudo cargar la frase del día:', error.message);
    return {
      content: 'Un buen café es como una buena conversación: intenso, cálido y siempre demasiado corto.',
      author: 'Quito Coffee Roasters'
    };
  }
};

/**
 * Obtiene el clima actual en Quito desde Open-Meteo
 * @returns {Promise<{temperature: number, weatherCode: number, description: string}>}
 */
export const fetchWeather = async () => {
  try {
    const response = await fetch(OPEN_METEO_API);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    const { temperature, weathercode } = data.current_weather;

    return {
      temperature: Math.round(temperature),
      weatherCode: weathercode,
      description: getWeatherDescription(weathercode)
    };
  } catch (error) {
    console.warn('No se pudo cargar el clima:', error.message);
    return {
      temperature: 18,
      weatherCode: 0,
      description: 'Parcial nublado'
    };
  }
};

/**
 * Obtiene la tasa de cambio USD → EUR desde ExchangeRate-API
 * @returns {Promise<{rate: number, date: string}>} Tasa de cambio y fecha
 */
export const fetchExchangeRate = async () => {
  try {
    const response = await fetch(EXCHANGE_RATE_API);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    return {
      rate: data.rates?.EUR || 0.92,
      date: data.time_last_update_utc?.split(' ').slice(0, 4).join(' ') || new Date().toLocaleDateString()
    };
  } catch (error) {
    console.warn('No se pudo obtener la tasa de cambio:', error.message);
    return {
      rate: 0.92,
      date: new Date().toLocaleDateString()
    };
  }
};

/**
 * Convierte un código WMO de clima a texto legible
 * @param {number} code - Código de condición climática WMO
 * @returns {string} Descripción del clima
 */
const getWeatherDescription = (code) => {
  const descriptions = {
    0: 'Despejado',
    1: 'Principalmente despejado',
    2: 'Parcial nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla con escarcha',
    51: 'Lluvia ligera',
    53: 'Lluvia moderada',
    55: 'Lluvia intensa',
    61: 'Lluvia',
    63: 'Lluvia moderada',
    65: 'Lluvia fuerte',
    71: 'Nieve ligera',
    73: 'Nieve moderada',
    75: 'Nieve fuerte',
    80: 'Chubascos ligeros',
    81: 'Chubascos moderados',
    82: 'Chubascos fuertes',
    95: 'Tormenta',
    96: 'Tormenta con granizo',
    99: 'Tormenta fuerte con granizo'
  };
  return descriptions[code] || 'No disponible';
};
