const { Router } = require('express');
const Exercise = require('../models/exercise');
const User = require('../models/user');
const mongoose = require('mongoose');

const router = Router();

router.get('/', async(req, res) => {

    const users = await User.find({});

    res.status(200).json(users)
})

router.post('/', async (req, res) => {
    const { username } = req.body;
    try {
        //Create new user
        const user = new User({ username })
        //Save user in DB
        await user.save()
        
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
    }
})

router.post('/:_id/exercises', async (req, res) => {
    
    try {
        const { _id } = req.params;
        const { description, duration, date } = req.body;
        const dateRegEx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
        let formatDate;
    
        //Establecer la fecha
        if (!dateRegEx.test(date) && date) {
          res.json({
            error: 'Invalid Date added'
          })
        }
    
        if (!date) {
          formatDate = new Date();
        } else {
          formatDate = new Date(date);
        }
        
        //Buscar usuario por id
        const user = await User.findById(_id);
        if (!user) {
          res.json({
            error: `user with id ${_id} not found`
          })
        }
        
        //Crear data para el ejercicio
        const data = {
          username: user.username,
          id: user._id,
          description,
          duration,
          date: formatDate
        }
    
        //Creating and saving exercise
        const exercise = new Exercise(data)
        await exercise.save()
    
        res.json(exercise)
    
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/:_id/logs', async(req, res) => {
    const { _id } = req.params;
    let count = 0;
    let { from = '1000-01-01', to =  '9999-12-31', limit = 5 } = req.query;
    
try {
    //Find exercises with the same ID
    const exercises = await Exercise.find({ id: _id })
                                    .where('date').gt(new Date(from))
                                    .where('date').lt(new Date(to))
                                    .limit(limit);
    // console.log(exercises)
    if(!exercises) {
        res.json({
            error: `user with id ${_id} has no data`
        })
    }

    count = exercises.length;
    const { username } = exercises[0]
    const log = exercises.map(elem => {
        return {
            description: elem.description,
            duration: elem.duration,
            date: elem.date.toDateString()
        }
    })
    
    res.json({
        username,
        count,
        _id,
        log
    })
} catch (error) {
    console.log(error)
    throw new Error('Algo salió mal')
}
    
})


module.exports = router;