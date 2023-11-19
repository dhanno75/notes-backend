import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  text: String,
  image: String,
  color: {
    type: String,
    default: "white",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
