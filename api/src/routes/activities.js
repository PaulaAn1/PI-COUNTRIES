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

/* router.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id)
        await Activity.destroy({
        where:{id:id}
        })
        res.status(200).send("delete ok")
    } catch (error) {
        console.log("no se borro nada", error)
    }
})
    
router.put("/:id",async(req, res)=>{
    const {id}  = req.params
    const {name,difficulty,duration,season} = req.body
    try {
        await Activity.update({name,difficulty,duration,season}
        ,{where:{id:id}})
        res.status(201).send("actividad actualizada")
    } catch (error) {
    console.error("no se actualizo nada",error)
    }
}) */

module.exports = router;