import { 
    createMovie,
    allmovies,
    search,
    updateMovie,
    deleteMovie,
    sortMovie
} from "../services/service.js";

// let movies = [];
// let id = 0;
export const logout =(req,res)=>{
    if(!req.session.isLoggedIn){
        return res.status(400).json({
            success:false,
            message:"user already logged out !!!"
        });
    }
    req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Logout failed"
      });
    }

    res.clearCookie("connect.sid");

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  });
};

export const Addmovie = async (req, res, next) => {

    try {
        const movie = await createMovie(req.body);
        console.log("ADD MOVIE CONTROLLER HIT");
        res.status(201).json({
            success: true,
            message: "Movie created successfully",
            movie
        });

    } catch (error) {
        next(error);
    }
};

export const Deletemovie = async (req,res,next) =>{

    try {
        
        console.log('Delete controller hit');
        const id = req.params.Id;

        const movie = await deleteMovie(id);
        
        res.status(200).json({
            success: true,
            message: "Movie deleted",
            movie
        });

    } catch (error) {
        next(error);
    }

}

export const Updatemovie = async (req, res, next) => {
    try {

        const title = req.params.Title;
        
        const movie = await updateMovie(title, req.body);
        console.log(movie.Title);
        
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            movie
        });

    } catch (error) {
        next(error);
    }
};

export const Searchmovie =async (req,res,next)=>{

    try {
        const Search = await search(req.query.title);
        console.log("SEARCH MOVIE CONTROLLER HIT");
        res.status(201).json({
            success: true,
            message: "Movie found successfully",
            movies: Search,
        });
    } catch (error){
        next(error);
    }

}

export const Load = async (req, res, next) => {
    try {

        const movies = await allmovies();

        res.status(200).json({
            success: true,
            movies
        });

    } catch (error) {

        next(error);

    }
};

export const Watchedmovie = (req,res) =>{

    const watched = movies.filter(mv => mv.seen === 'Watched');

    res.json(watched);

};

export const Toprated = async(req,res,next) =>{
    try {

        const movies = await sortMovie()

        res.status(200).json({
            success: true,
            movies
        });
        
    } catch (error) {

        next(error);

    }

};

export const Stats = (req, res) => {

    const total = movies.length;

    const watched = movies.filter(movie => movie.seen === 'Watched').length;

    const unwatched = total - watched;

    res.json({
        total,
        watched,
        unwatched
    });

}

