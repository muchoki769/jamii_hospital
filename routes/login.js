const express = require('express')
const router = express.Router()
const passport = require("passport");
const initializePassport = require("../passportConfig");


/**
 * @swagger
 * /api/login:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */

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