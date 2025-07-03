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
    expires: 86400 * 7,
  },
});

const blacklistToken = model("blacklistToken", blacklistTokenSchema);
export default blacklistToken;
