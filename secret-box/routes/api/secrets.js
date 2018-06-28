var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

/* GET secret show page. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id

  database.raw(
    'SELECT * from secrets WHERE id = ?',
    [id])
    .then((secret) => {
      if(secret.rows.length < 1) {
        return res.sendStatus(404)
      } else {
        res.json(secret.rows)
      }
    })
})

/* POST secret create route */
router.post('/', function(req, res, next) {
  var message = req.body.message

  if(!message) {
    return res.status(422).send({
      "error": "No message property provided"
    })
  }

  database('secrets')
    .insert({"message": message, "created_at": new Date})
    .returning(['id', 'message', 'created_at'])
    .then((secret) => {
      res.status(201).json(secret)
    })
})

module.exports = router;
