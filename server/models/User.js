  // import mongoose from "mongoose";

  // const userSchema = new mongoose.Schema({
  //   name: { type: String },
  //   email: { type: String, unique: true },
  //   password: { type: String },
  //   isVerified: { type: Boolean, default: false }
  // }, { timestamps: true });

  // export default mongoose.model("User", userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  profilePicture: {
    url: { type: String, default: null },
    publicId: { type: String, default: null }
  },
  gender: { type: String },
  birthday: { type: Date },
  phone: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local"
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },

  providerId: String, // google sub / facebook id
  email: { type: String, unique: true },
  password: { type: String },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
