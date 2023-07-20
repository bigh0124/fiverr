import mongoose from "mongoose";

const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    readByBuyer: {
      type: Boolean,
      required: true,
      default: false,
    },
    readBySeller: {
      type: Boolean,
      required: true,
      default: false,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);
