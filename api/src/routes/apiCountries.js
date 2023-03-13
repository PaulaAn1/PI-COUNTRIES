const { default: axios } = require("axios");
const { Country } = require("../db");

//console.log(YOUR_API_KEY);

const apiCountries = async () => {
  try {
    // me triago la info de la api y la guardo en un objeto para usar en las solicitudes http
    let countries = await axios.get(`https://restcountries.com/v3/all`);
    const allCountries = countries.data
    console.log(allCountries);

    // Por cada country me trigo la data solicitada con un map, que recorre la data entregada por la api en un array  
    countries = allCountries?.map(country => {
      let count = {
        id: country.ccn3 ? country.ccn3 : '999',
        name: country.name.common,
        continent: country.region,
        population: country.population,
        image: country.flags[0],
        capital: country.capital ? country.capital[0] : '' ,
        subregion: country.subregion,
        area: country.area,
      }
      return count;
    })

    return countries; 

  } catch (error) { 
    console.error(error);
  }
}

const countriesDb = async () => {
  try {
    const countries = await Country.findAll();
    if (!countries.length) {
      const arr = await apiCountries();
      await Country.bulkCreate(arr);
      return countries;
    }
  } catch (error) {
    console.log("ERROR", error);
  }
};



module.exports = { apiCountries, countriesDb,};