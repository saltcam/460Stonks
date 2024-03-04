import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const Search = () => {
    const [genre, setGenre] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/movies/search?genre=` + genre);
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies by genre:", error);
            setMovies([]);
        }
    };

const handleDelete = async (Name) => {
        const deleteConfirmed = window.confirm('Are you sure about the deletion of this record permanently from the database?');
        if (deleteConfirmed) {
            try {
                await axios.delete('http://localhost:2000/' + Name);
                console.log(Name);
                window.location.reload()
            } catch (err) {
                console.log("Error:" + err);
            }
        } 
    };

    // return (
    //     <div>
    //         <p><Link to="/" className="btn btn-success">Home</Link></p>
    //         <input
    //             type="text"
    //             value={genre}
    //             onChange={(e) => setGenre(e.target.value)}
    //             placeholder="Enter genre"
    //         />
    //         <button onClick={searchMovies}>Search</button>
    //         <ul>
    //             {movies.map((movie, index) => (
    //                 <li key={index}>{movie.Name} - {movie.Genre}</li>
    //             ))}
    //         </ul>
    //     </div>
    // );

    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3">TCSS460 Full Stack Movie Web Services (Genre Search Page)</h2>
            <div className="row">
                <div className='col-md-12'>
                <h3>View All Movies</h3>
                <p><Link to="/" className="btn btn-success">Home</Link></p>
                <input
                type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Enter genre"/>
                <button onClick={searchMovies}>Search</button>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Movies</th>
                                <th>Genre</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                movies.map((movie, m) => {
                                    return (
                                        <tr key={m}>
                                            <td>{movie.Name}</td>
                                            <td>{movie.Genre}</td>
                                            <td>
                                                <Link to={`/read/${movie.Name}`} className="btn btn-primary">View</Link>&nbsp;&nbsp;
                                                <Link to={`/update/${movie.Name}`} className="btn btn-info">Edit</Link>&nbsp;&nbsp;
                                                <Link onClick={()=>handleDelete(movie.Name)} className="btn btn-danger">Delete</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <p><Link to="/add" className="btn btn-success">Add Movie</Link></p>

        </div>
    );
};

export default Search;
