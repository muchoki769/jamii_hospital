const express = require('express')
const router = express.Router()
const { pool } = require("../database/dbConfig");

/**
 * @swagger
 * /api/updateUsers:
 *   put:
 *     summary: Update a patient's information
 *     description: Update specific fields of a patient's profile
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Patient ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the patient
 *                 example: Yohana Updated
 *               email:
 *                 type: string
 *                 description: Updated email address
 *                 example: yohana.updated@example.com
 *               password:
 *                 type: string
 *                 description: New password (optional)
 *                 example: NewStrongPassword123
 *     responses:
 *       200:
 *         description: Patient updated successfully
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
 *                   example: Patient updated successfully
 *                 patient:
 *                   type: object
 *                   properties:
 *                     patient_id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Yohana Updated
 *                     email:
 *                       type: string
 *                       example: yohana.updated@example.com
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */

router.get('/', async(req, res) => {
    // res.render("login");
    res.json({status: 'success', data: req.body});
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, } = req.body;

  await pool.query(
    `UPDATE patient SET email=$1, name=$2 WHERE patient_id = $3`,
    [email, name, id]
  );
  res.redirect("/users/delete");
});
module.exports = router;