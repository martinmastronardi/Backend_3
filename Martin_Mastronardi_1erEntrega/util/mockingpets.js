function generateMockPets(count = 20) {
    return Array.from({ length: count }, (_, i) => ({
      name: `Pet${i + 1}`,
      species: 'Dog',
      age: Math.floor(Math.random() * 10) + 1, 
    }));
  }
  
  module.exports = { generateMockPets };
  