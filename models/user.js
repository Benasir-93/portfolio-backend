
import mongoose from "mongoose";

const formEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },

  message: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  formEntries: [formEntrySchema],
});

const User = mongoose.model("user", userSchema);

export { User, formEntrySchema };
