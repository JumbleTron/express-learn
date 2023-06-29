import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    start_at: {
      type: Date,
      required: true,
      format: 'YYYY-MM-DD',
    },
    promo_price: {
      type: String,
      required: false,
    },
    end_at: {
      type: Date,
      required: true,
      format: 'YYYY-MM-DD',
    },
    start_time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
      },
    },
    available_places: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
      },
    },
    booked_places: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
      },
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.method({
  decreesAvailablePlaces(numberOfPlaces = 1) {
    this.available_places -= numberOfPlaces;
    this.booked_places += numberOfPlaces;
  },
  increaseAvailablePlaces(numberOfPlaces = 1) {
    this.available_places += numberOfPlaces;
    this.booked_places -= numberOfPlaces;
  },
});

export const User = mongoose.model('Course', courseSchema);
