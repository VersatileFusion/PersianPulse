const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Instructor:
 *       type: object
 *       required:
 *         - user
 *         - biography
 *         - specialties
 *         - experience
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the instructor
 *         user:
 *           type: string
 *           description: Reference to the User ID
 *         biography:
 *           type: string
 *           description: Instructor's biography
 *         specialties:
 *           type: array
 *           items:
 *             type: string
 *           description: Instructor's specialties
 *         experience:
 *           type: number
 *           description: Years of experience
 *         averageRating:
 *           type: number
 *           description: Average rating from students
 *         totalReviews:
 *           type: number
 *           description: Total number of reviews
 *         isVerified:
 *           type: boolean
 *           description: Verification status
 *       example:
 *         _id: 60d0fe4f5311236168a109cb
 *         user: 60d0fe4f5311236168a109ca
 *         biography: Certified personal trainer with over 5 years of experience in strength training.
 *         specialties: [strength, hiit, cardio]
 *         experience: 5
 *         averageRating: 4.8
 *         totalReviews: 24
 *         isVerified: true
 */

/**
 * @swagger
 * tags:
 *   name: Instructors
 *   description: Instructor management API
 */

/**
 * @swagger
 * /api/instructors:
 *   get:
 *     summary: Get all instructors
 *     tags: [Instructors]
 *     responses:
 *       200:
 *         description: A list of instructors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instructor'
 */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all instructors' });
});

/**
 * @swagger
 * /api/instructors/{id}:
 *   get:
 *     summary: Get an instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Instructor ID
 *     responses:
 *       200:
 *         description: Instructor details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor'
 *       404:
 *         description: Instructor not found
 */
router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Get instructor ${req.params.id}` });
});

/**
 * @swagger
 * /api/instructors:
 *   post:
 *     summary: Create a new instructor profile
 *     tags: [Instructors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - biography
 *               - specialties
 *               - experience
 *             properties:
 *               user:
 *                 type: string
 *               biography:
 *                 type: string
 *               specialties:
 *                 type: array
 *                 items:
 *                   type: string
 *               experience:
 *                 type: number
 *     responses:
 *       201:
 *         description: Instructor profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor'
 *       400:
 *         description: Invalid input data
 */
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create new instructor', data: req.body });
});

/**
 * @swagger
 * /api/instructors/{id}:
 *   put:
 *     summary: Update an instructor profile
 *     tags: [Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Instructor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               biography:
 *                 type: string
 *               specialties:
 *                 type: array
 *                 items:
 *                   type: string
 *               experience:
 *                 type: number
 *     responses:
 *       200:
 *         description: Instructor profile updated successfully
 *       404:
 *         description: Instructor not found
 */
router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Update instructor ${req.params.id}`, data: req.body });
});

/**
 * @swagger
 * /api/instructors/{id}:
 *   delete:
 *     summary: Delete an instructor profile
 *     tags: [Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Instructor ID
 *     responses:
 *       200:
 *         description: Instructor profile deleted successfully
 *       404:
 *         description: Instructor not found
 */
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete instructor ${req.params.id}` });
});

module.exports = router; 