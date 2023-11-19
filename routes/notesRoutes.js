import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controllers/notesController.js";
import { auth } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(auth, createNote).get(auth, getAllNotes);
router
  .route("/:notesId")
  .get(auth, getNote)
  .put(auth, updateNote)
  .delete(auth, deleteNote);

export default router;
