const express = require('express');
const { generateMockUsers } = require('../util/mocking');
const { generateMockPets } = require('../util/mockingpets');
const User = require('../models/User');
const Pet = require('../models/Pet');

const router = express.Router();

router.get('/mockingusers', async (req, res) => {
  try {
    const users = await generateMockUsers(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar los usuarios' });
  }
});

router.get('/mockingpets', (req, res) => {
  try {
    const pets = generateMockPets();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar las mascotas' });
  }
});

router.post('/generateData', async (req, res) => {
  const { users, pets } = req.body;

  if (!users || !pets) {
    return res.status(400).json({ error: 'Requiere un número de usuarios y mascotas' });
  }

  try {
    const generatedUsers = await generateMockUsers(users);   
    const generatedPets = generateMockPets(pets);

    await User.insertMany(generatedUsers);
    await Pet.insertMany(generatedPets);



    res.json({ message: 'Exito al generar y insertar datos' });
  } catch (error) {
    res.status(500).json({ error: 'Error al generar y insertar datos' });
  }
});

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/pets', async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

module.exports = router;
