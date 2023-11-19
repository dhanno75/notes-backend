import Notes from "../models/notesModel.js";
import User from "../models/userModel.js";

// CREATE NOTE
export const createNote = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { title, text, image, color } = req.body;
    console.log(req.body);

    const newNote = await Notes.create({
      userId,
      title,
      text,
      color,
      image,
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { notesId: newNote._id },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Note addedd successfully",
      data: newNote,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong. Please try again later.",
    });
  }
};

// GET A NOTE
export const getNote = async (req, res) => {
  try {
    const notesId = req.params.notesId;

    const note = await Notes.findById(notesId);

    res.status(200).json({
      status: "success",
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong. Please try after sometime",
    });
  }
};

// GET ALL NOTES OF THE USER
export const getAllNotes = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const notes = await Notes.find({ userId });

    res.status(200).json({
      status: "success",
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong. Please try after sometime",
    });
  }
};

// UPDATE A NOTE
export const updateNote = async (req, res, next) => {
  try {
    const notesId = req.params.notesId;
    const updatedNote = await Notes.findByIdAndUpdate(notesId, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: updatedNote,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong. Please try after sometime",
    });
  }
};

// DELETE A NOTE
export const deleteNote = async (req, res, next) => {
  try {
    const notesId = req.params.notesId;
    const updatedNote = await Notes.findByIdAndDelete(notesId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong. Please try after sometime",
    });
  }
};

// 576835;
