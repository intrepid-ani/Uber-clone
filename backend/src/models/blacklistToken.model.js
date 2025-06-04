import { Schema, model } from "mongoose";

const blacklistTokenSchema = new Schema({
  token: {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blacklistToken = model("blacklistToken", blacklistTokenSchema);
export default blacklistToken;
