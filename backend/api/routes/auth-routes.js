const express = require('express');
const router = express.Router();

const AuthService = require('../../domain/services/auth-service');
const RequestLoginDTO = require('../dtos/auth-dto');

router.post('/login', async (req, res) => {
  var authDto = new RequestLoginDTO(req.body);
  if (!authDto.isSuccess) {
    return res.status(400).json({ isSuccess: false, message: authDto.errorMessage });
  }

  var token = await AuthService.login(authDto);
  res.status(200).json({ isSuccess: true, token: token });
});

module.exports = router;