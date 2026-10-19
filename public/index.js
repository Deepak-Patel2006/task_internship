const output = document.getElementById('output');

const Display = (data) => {
    datas = data.movies;
    
    leng = datas.length;

    output.innerHTML = "";

    for(let i=0;i<leng;i++){

    const show = document.createElement('div');
    show.className = 'movie';

    show.innerHTML = 
        `<h2> Title : ${datas[i].Title}</h2>
        <p> <strong>Director : </strong>${datas[i].Director}</p>
        <p> <strong>Year : </strong>${datas[i].Year}</p>
        <p> <strong>Rating : </strong>⭐${datas[i].Rating}</p>
        <p> <strong>Status : </strong>${datas[i].Seen}</p>
        <h5> Movie ID : ${datas[i]._id}</h5> `
    output.appendChild(show);
    }
}

const play = (data) => {
    let datas = data.movie;

    const show = document.createElement('div');
    show.className = 'movie';

    show.innerHTML = 
        `<h2> Title : ${datas.Title}</h2>
        <p> <strong>Director : </strong>${datas.Director}</p>
        <p> <strong>Year : </strong>${datas.Year}</p>
        <p> <strong>Rating : </strong>⭐${datas.Rating}</p>
        <p> <strong>Status : </strong>${datas.Seen}</p>
        <h5> Movie ID : ${datas._id}</h5> `
    
    output.innerHTML = "";
    output.appendChild(show);
    
}


document.getElementById('logout').addEventListener('click', async() =>{

     const answer = await fetch('/movies/logout',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    });
   const data = await answer.json();
    console.log(data);
    alert(data.message);

});

document.getElementById('addMovie').addEventListener('click', async() =>{

    const Title = document.getElementById('title').value;
    const Director = document.getElementById('director').value;
    const Year = document.getElementById('year').value;
    const Rating = document.getElementById('rating').value;
    const Seen = document.getElementById('watched').checked;
    

    const answer = await fetch('/movies',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            Title,
            Director,
            Year,
            Rating,
            Seen
        })
    });    
    console.log("ADD MOVIE front HIT");
    this.disabled = true;
    const data = await answer.json();
    console.log(data);
    alert(data.message);
    if(data.success === true){
        play(data);
        return
    }else{
        setTimeout(() => {
        window.location.replace(data.redirectUrl); 
        }, 1000);
    }

    title.value = '';
    director.value = '';
    year.value = '';
    rating.value = '';
    watched.checked = '';
    this.disabled = false;

});

document.getElementById('deleteMovie').addEventListener('click', async() =>{

    const Id = document.getElementById('movieId').value;

    const answer = await fetch(`/movies/${Id}`,{
        method: 'DELETE',
    });

    const data = await answer.json();
    console.log(data);
    play(data);
    
    alert(data.message);

    movieId.value = '';

});

document.getElementById('updateMovie').addEventListener('click', async() =>{ 

    const Title = document.getElementById('updateTitle').value;
    const Director = document.getElementById('updateDirector').value;
    const Year = document.getElementById('updateYear').value;
    const Rating = document.getElementById('updateRating').value;
    const Seen = document.getElementById('updateWatched').checked;

    const hold = await fetch(`/movies/${Title}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            Director,
            Year,
            Rating,
            Seen
        })
    });
    
    const data = await hold.json();
    console.log(data);
    this.disabled = true;
    alert(data.message);
    play(data);
    
    updateId.value = '';
    updateTitle.value = '';
    updateDirector.value = '';
    updateYear.value = '';
    updateRating.value = '';
    updateWatched.checked = '';
    this.disabled = false;

});

document.getElementById('searchBtn').addEventListener('click', async() =>{

    const text = document.getElementById('searchMovie').value;

    const answer = await fetch(`/movies/search?title=${text}`);

    const data = await answer.json();
    console.log(data);
    
    Display(data);

    searchMovie.value = '';
    

});

document.getElementById('loadMovies').addEventListener('click', async() =>{
    
    const ans = await fetch('/movies/load');
    console.log('Load controller hitted by me !!!!');
    const data = await ans.json();
    console.log(data);
    if(data.success === true){
        Display(data);
        return
    }else{
        setTimeout(() => {
        window.location.replace(data.redirectUrl); 
        }, 1000);
    }

});

document.getElementById('watchedMovies').addEventListener('click', async() =>{

    const answer = await fetch('/movies/watched');

    const data = await answer.json();
    Display(data);

});

document.getElementById('topRated').addEventListener('click', async() =>{

    const answer = await fetch('/movies/rate');

    const data = await answer.json();
    console.log(data);
    
    Display(data);

});

document.getElementById('stats').addEventListener('click', async() =>{

    const answer = await fetch('/movies/stats');

    const data = await answer.json();

    const put = document.getElementById('put');
    put.innerHTML = "";
    put.innerHTML =
    `<h2> Total Movies : ${data.total}</h2>
    <h3> <strong>Watched Movies : </strong>${data.watched}</h3>
    <h3> <strong>Unwatched Movies : </strong>${data.unwatched}</h3> `
});
