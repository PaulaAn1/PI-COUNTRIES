const { Router } = require('express');
const { Activity, Country } = require("../db");
const { countriesDb } = require('./apiCountries');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res, next) => {
    await countriesDb();
    try {
    const { name } = req.query;
    let bdCountry = await Country.findAll({
        include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: { attributes: [] },
        },
    });

    if (name) {
        const filterCountries = await bdCountry.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase()),
        );
        let countriesFilter = filterCountries.map( country => {
            return {
                id: country.id,
                name: country.name,
                flag: country.image,
                continent: country.continent,
                population: country.population,
                activities: country.activities
            }
        })
        return countriesFilter.length
        ? res.status(200).json(countriesFilter)
        : res.status(404).send("Country not found!");
    }
        let countriesAll = bdCountry.map(country => {
            return {
                id: country.id,
                name: country.name,
                flag: country.image,
                continent: country.continent,
                population: country.population,
                subregion: country.subregion,
                activities: country.activities,
            }
        })
        return res.status(200).json(countriesAll);

    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    let id = req.params.id

    try {
        if (id) {
            let countryBD = await Country.findOne({
                where: {
                    id: id,
                },
                include: {
                    model: Activity,
                    attributes: ["name", "difficulty", "duration", "season"],
                    through: { attributes: [] },
                },
            })
            res.status(201).send(countryBD)
        }
        else {
            res.status(404).send('Country not found!');
        }
    } catch (error) {
        next(error)
    }
    })



module.exports = router;