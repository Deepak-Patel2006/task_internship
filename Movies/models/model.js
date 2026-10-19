import mongoose from "mongoose";

const movieschema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: true
        },
        Director: {
            type: String,
            required: true
        },
        Year: {
            type: Number,
            required: true
        },
        Rating: {
            type: Number,
            required: true
        },
        Seen: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);
const Movie = mongoose.model("Movie", movieschema);
export default Movie;


