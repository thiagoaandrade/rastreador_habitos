const connection = require('./connection')

const getAllHabits = async (userId) => {
    const query = 'SELECT * FROM habits WHERE user_id = $1'
    const values = [userId]
    const habits = await connection.query(query, values)
    return habits.rows
}

const getSingleHabit = async (userId, habitId) => {
    const query = 'SELECT * FROM habits WHERE user_id = $1 AND id = $2'
    const values = [userId, habitId]
    const habit = await connection.query(query,values)
    return habit.rows[0]
}

const createHabit = async (userId, title, frequency) => {
    const query = 'INSERT INTO habits( title, status, frequency, user_id ) VALUES( $1, $2, $3, $4 ) RETURNING *'
    const values = [title, 'ativo', frequency, userId]
    const habit = await connection.query(query, values)
    return habit.rows[0]
}

const updateHabit = async (userId, habitId, title, frequency, status) => {
    let query = 'UPDATE habits SET '
    let count = 0
    let values = []
    if(title){
        count += 1
        query += `title = $${count}`
        values.push(title)
    }
    if(frequency){
        count += 1
        if(count > 1){
            query += ', '
        }
        query += `frequency = $${count}`
        values.push(frequency)
    }
    if(status){
        count += 1
        if(count > 1){
            query += ', '
        }
        query += `status = $${count}`
        values.push(status)
    }
    count += 1
    query += ` WHERE id = $${count} AND user_id = $${count+1}`
    values.push(habitId, userId)
    const habit = await connection.query(query, values)
    return habit
}

const deleteHabit = async (userId, habitId) => {
    const query = 'DELETE FROM habits WHERE id = $1 AND user_id = $2'
    const values = [habitId, userId]
    const habit = await connection.query(query, values)
    return habit
}

module.exports = {
    getAllHabits,
    getSingleHabit,
    createHabit,
    updateHabit,
    deleteHabit
}