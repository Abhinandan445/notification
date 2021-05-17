const express = require('express');
//Import controller file
const {
    sendNotification
} = require('../controllers/notification');

const router = express.Router({
    mergeParams: true
});

// Notification Route
router
    .route('/')
    .post(sendNotification);

 module.exports = router;