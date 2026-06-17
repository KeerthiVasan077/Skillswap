const SwapRequest = require('../models/SwapRequest');

// Send swap request
exports.sendRequest = async (req, res) => {
  try {
    const { toUser, offeredSkill, wantedSkill, message } = req.body;

    // Check if request already exists
    const existingRequest = await SwapRequest.findOne({
      fromUser: req.userData.userId,
      toUser,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ 
        message: 'You already sent a request to this user' 
      });
    }

    const swapRequest = new SwapRequest({
      fromUser: req.userData.userId,
      toUser,
      offeredSkill,
      wantedSkill,
      message
    });

    await swapRequest.save();

    res.status(201).json({
      message: 'Swap request sent successfully',
      swapRequest
    });

  } catch (error) {
    res.status(500).json({ message: 'Error sending request', error });
  }
};

// Get all my requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      $or: [
        { fromUser: req.userData.userId },
        { toUser: req.userData.userId }
      ]
    })
    .populate('fromUser', 'name email photo skillsOffered')
    .populate('toUser', 'name email photo skillsOffered')
    .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error });
  }
};

// Accept or reject request
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const requestId = req.params.id;

    const swapRequest = await SwapRequest.findById(requestId);

    if (!swapRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Only the receiver can accept or reject
    if (swapRequest.toUser.toString() !== req.userData.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    swapRequest.status = status;
    await swapRequest.save();

    res.json({
      message: `Request ${status} successfully`,
      swapRequest
    });

  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error });
  }
};

// Get single request
exports.getRequestById = async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id)
      .populate('fromUser', 'name email photo')
      .populate('toUser', 'name email photo');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching request', error });
  }
};