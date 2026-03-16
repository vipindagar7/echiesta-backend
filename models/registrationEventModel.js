import mongoose from "mongoose";

/* Team Member Schema */
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

/* Event Schema */
const eventSchema = new mongoose.Schema({

  eventName: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["Individual", "Team"],
    required: true
  },

  feePerMember: {
    type: Number,
    default: 0
  },

  members: [memberSchema],

  totalEventFee: {
    type: Number,
    default: 0
  }

});

/* Registration Schema */
const registrationSchema = new mongoose.Schema({

  student: {

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    college: {
      type: String,
      required: true
    },

    rollNumber: {
      type: String
    }

  },

  events: [eventSchema],

  totalFee: {
    type: Number,
    default: 0
  },

  /* ADD THIS FIELD */
  paymentScreenshot: {
    type: String,
    default: null
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  paymentId: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Registration", registrationSchema);