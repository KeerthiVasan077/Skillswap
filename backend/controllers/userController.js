const User = require('../models/User');

// Get my profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId)
      .select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

// Update my profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, photo, skillsOffered, skillsWanted } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userData.userId,
      {
        name,
        bio,
        photo,
        skillsOffered,
        skillsWanted
      },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};