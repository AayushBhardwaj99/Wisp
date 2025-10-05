import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';


const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar); // For displaying all the users
// place the more specific /send/:id before the dynamic /:id so it doesn't get
// mistakenly matched as an id of "send"
router.get("/send/:id", protectRoute, sendMessage); // For message between two users
router.get("/:id", protectRoute, getMessages);

export default router;
