const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: '74165293883',
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
};

const createUser = (request, response) => {
  let { firstName, middleName, lastName, email } = request.body
  if(!middleName) {
    middleName = '';
  };
  pool.query('INSERT INTO users (first_name, middle_name, last_name, email) VALUES ($1, $2, $3, $4)', 
    [firstName, middleName, lastName, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { firstName, middleName, lastName, email } = request.body

  pool.query(
    'UPDATE users SET firstName = $1, middle_name = $2, last_name =$3, email = $4 WHERE id = $5',
    [firstName, middleName, lastName, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    });
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
