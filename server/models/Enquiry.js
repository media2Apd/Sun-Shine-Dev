import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      required: true,
    },
    note: {
      type: String,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const enquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: { type: String, required: true },

    company: { type: String },
    location: { type: String },

    enquiryType: {
      type: String,
      enum: ["Product", "Bulk Order", "Dealer"],
      default: "Product",
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    quantity: { type: String },
    message: { type: String },

    contactMethod: {
      type: String,
      enum: ["Email", "Phone"],
      default: "Email",
    },

    // ✅ CURRENT STATUS (FAST ACCESS)
    currentStatus: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },

    // ✅ STATUS HISTORY (MAIN CHANGE)
    statusHistory: [statusHistorySchema],
  },
  { timestamps: true }
);

// ✅ AUTO ADD INITIAL STATUS
enquirySchema.pre("save", function (next) {
  if (this.isNew) {
    this.statusHistory.push({
      status: "New",
      note: "Enquiry created",
    });
  }
  next();
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;