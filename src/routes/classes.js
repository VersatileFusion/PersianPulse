const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - instructor
 *         - duration
 *         - type
 *         - category
 *         - difficulty
 *         - capacity
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the class
 *         title:
 *           type: string
 *           description: Title of the class
 *         description:
 *           type: string
 *           description: Detailed description of the class
 *         instructor:
 *           type: string
 *           description: Reference to the instructor ID
 *         duration:
 *           type: number
 *           description: Duration of the class in minutes
 *         type:
 *           type: string
 *           enum: [live, recorded]
 *           description: Type of the class
 *         category:
 *           type: string
 *           enum: [yoga, cardio, strength, hiit, dance, pilates, other]
 *           description: Category of the class
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *           description: Difficulty level of the class
 *         capacity:
 *           type: number
 *           description: Maximum number of participants
 *         price:
 *           type: number
 *           description: Price of the class
 *         videoUrl:
 *           type: string
 *           description: URL to the video for recorded classes
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: Start time for live classes
 *         enrolledUsers:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs enrolled in the class
 *         isAvailable:
 *           type: boolean
 *           description: Availability status of the class
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Date when the class was created
 *       example:
 *         _id: 60d0fe4f5311236168a109cc
 *         title: Beginner Yoga
 *         description: A gentle introduction to yoga for beginners
 *         instructor: 60d0fe4f5311236168a109cb
 *         duration: 60
 *         type: live
 *         category: yoga
 *         difficulty: beginner
 *         capacity: 20
 *         price: 15
 *         startTime: 2023-06-01T18:00:00.000Z
 *         enrolledUsers: []
 *         isAvailable: true
 *         createdAt: 2023-01-01T10:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Class management API
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         description: Filter by difficulty level
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by class type
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all classes', query: req.query });
});

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found
 */
router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Get class ${req.params.id}` });
});

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - instructor
 *               - duration
 *               - type
 *               - category
 *               - difficulty
 *               - capacity
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               instructor:
 *                 type: string
 *               duration:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [live, recorded]
 *               category:
 *                 type: string
 *                 enum: [yoga, cardio, strength, hiit, dance, pilates, other]
 *               difficulty:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *               capacity:
 *                 type: number
 *               price:
 *                 type: number
 *               videoUrl:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Invalid input data
 */
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create new class', data: req.body });
});

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     summary: Update a class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *               capacity:
 *                 type: number
 *               price:
 *                 type: number
 *               videoUrl:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       404:
 *         description: Class not found
 */
router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Update class ${req.params.id}`, data: req.body });
});

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 */
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete class ${req.params.id}` });
});

/**
 * @swagger
 * /api/classes/{id}/enroll:
 *   post:
 *     summary: Enroll a user in a class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User enrolled successfully
 *       400:
 *         description: Class is full or user already enrolled
 *       404:
 *         description: Class or user not found
 */
router.post('/:id/enroll', (req, res) => {
  res.status(200).json({ 
    message: `Enroll user in class ${req.params.id}`, 
    userId: req.body.userId 
  });
});

module.exports = router; 