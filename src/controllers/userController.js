const UserRepository = require('../repositories/GenericRepository');
const User = require('../models/user');

const userRepository = new UserRepository('users');

async function getAllUsers(req, res) {
    try {
        const users = await userRepository.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllUsers,
};
