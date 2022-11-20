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
        const { name, difficulty, duration, season, /* season2, */ countries} = req.body;
        if(!name || !difficulty || !duration || !season /* || !season2 */ || !countries) {
            res.status(404).send('Sorry, some fields are missing!')
        }
        console.log(countries);
        const activityCreate = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            /* season2, */
        });
        
        const country = await Country.findAll({
            where: {
                name: countries
            }
        });
        
        await activityCreate.addCountries(country);
        console.log(activityCreate);
    
        return res.send(activityCreate);
    } catch (error) {
            next(error);
    }
    })

    
    router.delete('/:id', async (req, res, next) => {
        const {id} = req.params
        console.log(id);
        try {
            await Activity.destroy({
                where: {
                    id: id
                }
            })
            
            let nameActivity = await Activity.findOne({
                where: {
                    id: id
                }
            })

            !nameActivity ? res.status(200).send('Activity Deleted!') : res.status(404).send('Activity not found to deleted!')
            
        } catch (error) {
            next(error)
        }
    })

    /* router.get('/:id', async (req, res, next) => {
        const {id} = req.params;
        try {
            const filterId = await Activity.findAll()
            if(id) {
            const filter = await filterId.filter(el => el.id === id)
    
            filter.length?
            res.status(200).send(filter)
            : res.status(404).send("actividad no encontrada")
            }
        } catch (error) {
            next(error)
        }
    }) */

    router.put('/:id', async (req, res, next) => {
        try {
            const {id} = req.params;
            const { name, difficulty, duration, season, countries} = req.body;

            await Activity.update({name, difficulty, duration, season, countries }, {
                where: {
                    id: id
                }
            });

            res.status(201).send('Activity updated!');
            
        } catch (error) {
            next(error)
        }
    })


module.exports = router;