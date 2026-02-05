const express = require('express');
const router = express.Router();

// Importing the controllers using require
import {
    registerUser, // Renamed to match the controller we made earlier
    loginUser,
    
} from "../controllers/userController.js";

const { NewContact } = require('../controllers/publicController.js');

// 1. Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);




// Exporting the router properly for CommonJS
export default router;