const express = require('express');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controller/chatController');
const { protect } = require('../middleware/authMiddleware');

const router =  express.Router();

router.route('/').post(protect, accessChat) // used protect so only logged in user can access this chat, not others
router.route('/').get(protect, fetchChats)
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
// router.route('/rename').put(protect, renameGroup);
router.route('/groupremove').put(protect, removeFromGroup);
router.route('/groupadd').put(protect, addToGroup);


module.exports = router;