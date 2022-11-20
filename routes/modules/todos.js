const express = require('express')
const router = express.Router()

const db = require('../../models/index')
const Todo = db.Todo
const User = db.User

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user.id
  const name = req.body.name
  return Todo.create({ name, UserId: userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => {
      res.render('detail', { todo: todo.toJSON() })
    })
    .catch(error => console.error('error'))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, userId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.error('error'))
})


router.put('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ where: { id, userId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.error('error'))
})

router.delete('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.destroy({ where: { id, userId } })
    .then(() => res.redirect(`/`))
    .catch(error => console.error('error'))
})

module.exports = router