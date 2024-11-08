const bcrypt = require('bcrypt');
async function generateMockUsers(number) {
  const users = [];
  const hashedPassword = await bcrypt.hash('coder123', 10);

  for (let i = 0; i < number; i++) {
    const role = Math.random() < 0.5 ? 'user' : 'admin';
    users.push({
      username: `user${i + 1}`,
      password: hashedPassword,
      role: role,
      pets: [],
    });
  }
  return users;
}

module.exports = {
  generateMockUsers,
};
