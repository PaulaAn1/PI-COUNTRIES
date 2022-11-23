const { Router } = require('express');
const { Op } = require('sequelize');
const { Activity, Country } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.get("/", async (req, res) => {
    try {
    const getAllActivities = await Activity.findAll();
    getAllActivities.length
        ? res.status(200).json(getAllActivities)
        : res.status(404).send("Activities not Found!");
    } catch (error) {
        console.log(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const { name, difficulty, duration, season, countries} = req.body;
        if(!name || !difficulty || !duration || !season || !countries) {
            res.status(404).send('Sorry, some fields are missing!')
        }
        const activityCreate = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });
        
        const country = await Country.findAll({
            where: {
                name: countries
            }
        });
        
        await activityCreate.addCountries(country);
    
        return res.status(200).send(activityCreate);
    } catch (error) {
            next(error);
    }
    });



module.exports = router;