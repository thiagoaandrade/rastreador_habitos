const connection = require('./connection')

const createUser = async (email, username, password) => {
    const query = "INSERT INTO users( username, email, password ) VALUES( $1, $2, $3) RETURNING *"
    const newUser = await connection.query(query, [username, email, password])
    return newUser.rows[0]
}

const getUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = $1"
    const values = [email]
    const user = await connection.query(query, values)
    return user.rows[0]
}

const getUserById = async (id) => {
    const query = "SELECT * FROM users WHERE id = $1"
    const values = [id]
    const user = await connection.query(query,values)
    return user.rows[0]
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById
}