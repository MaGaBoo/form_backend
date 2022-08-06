const express = require("express");
const router = express.Router();

const formController = require('../controller/form.controller');

router.get('/', (req, res, next) => {
  res.status(200).json({ ok: true })
})

/* Form route */

router.post('/', formController.create)

module.exports = router