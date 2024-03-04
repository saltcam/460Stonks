import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

const Sort = () => {
    
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getAllSortedMoviesInfo = async () => {
            try {
                const response = await axios.get("http://localhost:2000/movies/sorted-by-rating", {
                    //headers: { 'sort': 'population' }
                });
                setMovies(response.data);
            } catch (err) {
                console.log("Error: " + err)
            }
        };
        getAllSortedMoviesInfo();
    }, []);

    // This is a handler when the user clicks on the Delete
    // link. We would like to prompt the user to confirm that the
    // Delete action. If the user confirms the action, a DELETE HTTP
    // Request is constructed and executed to a URL that is handled
    // by the server programming we developed in backend service API.
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

    // The return for this component will output the HTML code that
    // we wish to present through the UI. Note the mapping of the
    // JavaScript variables or collections using the curly brackets
    // Example: {city.city} will retrieve the data from the city
    // collection for an element named city using its state at that
    // moment in time.   
    // Note the use of a map of values (which will contain a list 
    // of cities and their population data) is used in conjunction
    // with HTML code to be able to dynamically construct the HTML
    // table rows for displaying our data returned back from the
    // backend Web Service API.
    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3">TCSS460 Full Stack Movie Web Services (Ranking Sorted Page)</h2>
            <div className="row">
                <div className='col-md-12'>
                <h3>View All Movies</h3>
                <p><Link to="/" className="btn btn-success">Home</Link></p>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Movies</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                movies.map((movie, m) => {
                                    return (
                                        <tr key={m}>
                                            <td>{movie.Name}</td>
                                            <td>{movie.Rating}</td>
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

export default Sort;