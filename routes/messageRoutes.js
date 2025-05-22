import express from "express"
import { createContactMessage, getAllContactMessages, getContactMessageById, deleteContactMessage, markasRead } from "../controllers/contactUsController.js"

const router = express.Router()

// Routes
router.post("/", createContactMessage)
router.get("/", getAllContactMessages)
router.get("/:id", getContactMessageById)
router.delete("/:id", deleteContactMessage)
router.patch("/:id", markasRead)

export default router
