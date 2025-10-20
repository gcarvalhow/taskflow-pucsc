const express = require('express');
const router = express.Router();

const wrapAsync = require('../middleware/wrap-middleware');

const UserService = require('../../domain/services/user-service');
const { RequestUserDTO, ResponseUserDto } = require('../dtos/user-dto');

router.post('/', wrapAsync(async (req, res) => {
  const userDto = new RequestUserDTO(req.body);
  if (userDto.isSuccess === false) {
    return res.status(400).json({ isSuccess: false, message: userDto.errorMessage });
  }

  const user = await UserService.createUser(userDto);
  const responseDto = new ResponseUserDto(user);

  res.status(201).json({ isSuccess: true, user: responseDto });
}));

router.get('/:id', wrapAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  const responseDto = new ResponseUserDto(user);
  
  res.status(200).json({ isSuccess: true, user: responseDto });
}));

module.exports = router;