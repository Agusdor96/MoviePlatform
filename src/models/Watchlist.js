const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    addedAt: { type: Date, default: Date.now }
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
module.exports = Watchlist;