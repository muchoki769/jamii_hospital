const express = require('express')
const router = express.Router()
const { pool } = require("../database/dbConfig");


/**
 * @swagger
 * /api/getUsers:
 *   get:
 *     summary: Get all patients
 *     description: Retrieve a list of all patients in the system
 *     tags: [Patients]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *         example: 10
 *     responses:
 *       200:
 *         description: List of patients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 patients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       patient_id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: yohana
 *                       email:
 *                         type: string
 *                         example: yohana@example.com
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-01-15T10:30:00Z
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 25
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/getUsers/{id}:
 *   get:
 *     summary: Get a specific patient by ID
 *     description: Retrieve detailed information about a specific patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Patient ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Patient retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 patient:
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
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-01-15T10:30:00Z
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

router.post("/users/edit/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(`SELECT * FROM users where patient_id = $1`, [id]);
//   res.render("edit", { users: result.rows[0] });
});

module.exports = router;