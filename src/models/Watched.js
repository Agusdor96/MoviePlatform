const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchedSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    watchedAt: { type: Date, default: Date.now }
});

const Watched = mongoose.model("Watched", watchedSchema);
module.exports = Watched;