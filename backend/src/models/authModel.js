const connection = require('./connection')

const createUser = async (email, username, password) => {
    const query = "INSERT INTO users( username, email, password ) VALUES( $1, $2, $3) RETURNING *"
    const newUser = await connection.query(query, [username, email, password])
    return newUser.rows[0]
}

const getUser = async (email, username, password) => {
    console.log(username)
}

getUser()

module.exports = {
    createUser
}