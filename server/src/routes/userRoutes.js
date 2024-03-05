const express = require('express');
const {
  registerUser,
  loginUser,
  getUsers,
  onBoarding,
  updateSettings,
} = require('../controllers/usersController');
const { uploadProfilePic } = require('../middlewares/fileUpload');

const app = express();

app.use(express.json());

// Annotate your API route files with Swagger annotations to describe the endpoints
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Error creating user
 */
app.post('/register', registerUser);

// Annotate getting the list of users
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Error logging in user
 */
app.post('/login', loginUser);

// Annotate getting the list of users based on the username
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       400:
 *         description: Error retrieving users
 */
app.get('/users', getUsers);

// Annotate updating user details for the settings page
/**
 * @swagger
 * /settings:
 *   put:
 *     summary: Update user details
 *     description: Update user details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               bio:
 *                 type: string
 *               profilePicUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: User details updated successfully
 *       400:
 *         description: Error updating user details
 */
app.put('/settings', updateSettings);

// Annotate Onboarding route with profile picture upload
/**
 * @swagger
 * /onboarding:
 *   post:
 *     summary: Onboarding
 *     description: Onboarding
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: User onboarding successful
 *       400:
 *         description: Error onboarding user
 */
app.post('/onboarding', uploadProfilePic, onBoarding);

module.exports = app;
