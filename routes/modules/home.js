const express = require('express')
const router = express.Router()

const db = require('../../models/index')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  const userId = req.user.id
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { userId }
  })
    .then(todos => {
      return res.render('index', { todos: todos })
    })
    .catch(error => { return res.status(422).json(error) })
})

module.exports = router