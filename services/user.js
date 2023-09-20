const {User} = require('../shemas/user');

const getAllUsers = async () => {
    return User.find();
};

const getUserByEmail = async (email) => {
    return User.findOne({ email });
};

const createUser = async ({ email }) => {
    return new User({ email});
};
const updateUsersSubscription = async (id, subscription) => {
    return User.findByIdAndUpdate({ _id: id }, subscription, { new: true });
  };

module.exports = { 
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUsersSubscription
 };