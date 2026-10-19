
import Movie from "../models/model.js";

export const createMovie = async (data) => {
    const movie = await Movie.create(data);
    return movie;
}

export const allmovies = async ()=>{
    const movies = await Movie.find();
    return movies;  
}

export const search = async (title) => {
    const movies = await Movie.find({
        Title: {
            $regex: title,
            $options: "i"
        }
    });

    return movies;
};

export const updateMovie = async (title, updateData) => {

    const movie = await Movie.findOneAndUpdate(
        {
            Title: title
        },
        updateData,
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    return movie;
};

export const deleteMovie = async(id)=>{
    
    const movie = await Movie.findByIdAndDelete(id);
    return movie;
}

export const sortMovie = async()=>{
    
    const movies = await Movie.find().sort('-Rating');
    return movies;
}
