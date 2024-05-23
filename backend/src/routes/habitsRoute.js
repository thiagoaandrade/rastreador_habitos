const express = require('express')
const router = express.Router()

const habitsController = require('../controllers/habitsController')

// Rotas da API
router.get('/api/habits', habitsController.allHabits_get)
router.get('/api/habits/:id', habitsController.singleHabit_get)
router.post('/api/habits', habitsController.habit_post)
router.put('/api/habits/:id', habitsController.habit_put)
router.delete('/api/habits/:id', habitsController.habit_delete)

module.exports = router