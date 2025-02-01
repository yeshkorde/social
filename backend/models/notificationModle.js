const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    status: {
      type: String,
      enum: ['unread', 'read'], 
      default: 'unread',
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'success', 'error', 'alert', 'reminder'], 
      required: true,
      default: 'info',
    },
    metadata: {
      type: Object, 
      default: {},
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model('Notification', notificationSchema);

