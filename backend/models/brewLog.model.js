import mongoose, { Schema } from 'mongoose';

const brewLogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    //story
    review: {
      type: String,
      required: true,
    },

    //visitedLocation
    tags: {
      type: [String],
      default: [],
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    // visitedDate: {
    //   type: Date,
    //   required: true,
    // },
  },
  { timestamps: true },
);

const BrewLog = mongoose.model('BrewLog', brewLogSchema);

export default BrewLog;
