const express = require('express')
const router = express.Router()
const passport = require("passport");
const initializePassport = require("../passportConfig");


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a patient
 *     description: Authenticate a patient 
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the patient
 *                 example: yohana@example.com
 *               password:
 *                 type: string
 *                 description: Password for account
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Patient logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     patient_id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: yohana
 *                     email:
 *                       type: string
 *                       example: yohana@example.com
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *       500:
 *         description: Internal server error
 */
initializePassport(passport);

router.get('/', async(req, res) => {
    // res.render("login");
    res.json({status: 'success', data: req.body});
});

router.post('/', passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect:"/login",
    // failureFlash: true,
})
);

module.exports = router;