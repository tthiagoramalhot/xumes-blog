const express = require('express')
const router = express.Router()
const postagemRotas = require('./postagens')
const comentariosRotas = require('./comentarios')

router.use('/', postagemRotas)
router.use('/', comentariosRotas)

module.exports = router