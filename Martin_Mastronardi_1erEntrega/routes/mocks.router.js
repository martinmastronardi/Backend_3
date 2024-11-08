const express = require('express');
const { generateMockUsers } = require('../util/mocking');
const User = require('../models/User');
const Pet = require('../models/Pet');

const router = express.Router();

router.get('/mockingusers', async (req, res) => {
  try {
    const users = await generateMockUsers(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error generating users' });
  }
});

router.post('/generateData', async (req, res) => {
  const { users, pets } = req.body;
  
  if (!users || !pets) {
    return res.status(400).json({ error: 'Parameters users and pets are required' });
  }

  try {
    const generatedUsers = await generateMockUsers(users);
    const generatedPets = Array.from({ length: pets }, () => ({
      name: `Pet${Math.floor(Math.random() * 1000)}`,
      species: 'Dog',
    }));

    await User.insertMany(generatedUsers);
    await Pet.insertMany(generatedPets);

    res.json({ message: 'Data generated and inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error generating or inserting data' });
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
