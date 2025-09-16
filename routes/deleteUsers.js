const express = require('express')
const router = express.Router()
const { pool } = require("../database/dbConfig");


/**
 * @swagger
 * /api/deleteUsers:
 *   delete:
 *     summary: Delete a patient
 *     description: Permanently remove a patient from the system
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Patient ID to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Patient deleted successfully
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
 *                   example: Patient deleted successfully
 *       404:
 *         description: Patient not found
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
 *                   example: Patient not found
 *       500:
 *         description: Internal server error
 */


router.get('/', async(req, res) => {
    // res.render("login");
    res.json({status: 'success', data: req.body});
});

router.post("/users/delete/:id", async (req, res) => {
 
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM patient WHERE patient_id = $1`, [id]);
    // res.redirect("/users/delete");
  } catch (err) {
    res.send("Error deleting user");
  }
});

module.exports = router;