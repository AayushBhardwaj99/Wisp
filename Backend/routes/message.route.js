import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';


const router = express.Router();

router.get("/users",protectRoute,getUsersForSidebar);                        //For displaying all the users
router.get("/:id",protectRoute,getMessages);    
router.get("/send/:id",protectRoute,sendMessage);                           //For message between two users

export default router;
