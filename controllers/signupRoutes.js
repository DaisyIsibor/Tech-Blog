const express = require('express');
const router = express.Router();



router.get('/signup', (req, res) => {
    // Render the signup form
    res.render('signup');
});


module.exports = router; 