const habitsModel = require('../models/habitsModel')

const allHabits_get = async (req,res) => {
    try {
        const habits = await habitsModel.getAllHabits(req.user.id)
        return res.status(200).json(habits)
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"Something wrong happened"})
    }
}

const singleHabit_get = async (req,res) => {
    const habitId = req.params.id
    try {
        const habit = await habitsModel.getSingleHabit(req.user.id, habitId)
        if(habit){
            return res.status(200).json(habit)
        }
        else{
            return res.status(400).json({msg: `There is no habit with this id`})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'Insert valid values in the fields'})
    }
}

const habit_post = async (req,res) => {
    const { title, frequency } = req.body
    try {
        const habit = await habitsModel.createHabit(req.user.id, title, frequency)
        return res.status(200).json(habit)
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: "Insert valid values in the fields" })
    }
}

const habit_put = async (req,res) => {
    const habitId = req.params.id
    const { title, frequency, status } = req.body
    if(!title && !frequency && !status){
        return res.status(400).json({msg: "Fields cannot be empty"})
    }
    try {
        const habit = await habitsModel.updateHabit(req.user.id, habitId,title,frequency,status)
        return res.status(204).json()
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: "Insert valid values in the fields"})
    }
}

const habit_delete = async (req,res) => {
    const habitId = req.params.id
    try {
        const habit = await habitsModel.deleteHabit(req.user.id, habitId)
        if(habit.rowCount){
            return res.status(204).json()
        }
        else{
            return res.status(400).json({msg: "There is no habit with this id"})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: "Something wrong happened"})
    }
}

module.exports = {
    allHabits_get,
    singleHabit_get,
    habit_post,
    habit_put,
    habit_delete
}