const express = require('express')
const router = express.Router()
const passport = require("passport");
const initializePassport = require("../passportConfig");

initializePassport(passport);

router.get('/', async(req, res) => {
    // res.render("login");
    res.json({status: 'success', data: req.body});
});

router.post('/', passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect:"/login",
    failureFlash: true,
})
);

module.exports = router;