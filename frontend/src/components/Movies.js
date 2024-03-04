// ****************************************************
// TCCSS 460: Tutorial 5B
// Winter 2024
// Building React Frontend
// Frontend consumes backend API (Tutorial 5A)
// Developed in Module 6
// ****************************************************
// ****************************************************
// IMPORTANT: PORT number for the backend web service
// API that is used in Tutorial 5a is 2000. Ensure this
// port number matches your backend web service
// API that is running. 
// ****************************************************

// Import necessary modules and libraries
import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

// We are defining a React component for building a UI that will handle
// the retrieval of all city data to be displayed in tabular format.
// Components in React are reusable which can be combined along with 
// other components to devel the final user interface. In our example, 
// Read along with Update, Add, and Cities formulate the UI we wish 
// to provide the end user in order to interact with the backend
// RESTful web service API we developed as part of the example in 
// Module 6 (example in Assignment 4). 
const Movies = () => {
    // useState Hook is a function that enables a component to set
    // and manage the state that is associated with a component. In 
    // this case, we would like to manage the data within this 
    // component for a city. When a change is made to that data, 
    // useState (or React in this case) will update the UI
    // accordingly.     
    const [movies, setMovies] = useState([]);

    // When executing actions such as making HTTP requests and 
    // receiving associated responses, it is possible that a 
    // side effect could occur, such as an infinite loop. 
    // Therefore, it is desirable to provide a method that enables 
    // us to effectively manage and mitigate the potential adverse
    // consequences associated with these side effects. The 
    // useEffect Hook in React serves to handle side effects and 
    // mitigate their impact on the main component's processing. 
    // We are using Axios HTTP client library to construct our HTTP
    // Requests. Console.log is used for debugging purposes. The 
    // outcome of the console.log should be shown on the console
    // of the developer tools in the browser you use.
    useEffect(() => {
        const getAllMoviesInfo = async () => {
            try {
                const response = await axios.get("http://localhost:2000/", {
                    //headers: { 'sort': 'population' }
                });
                setMovies(response.data);
            } catch (err) {
                console.log("Error: " + err)
            }
        };
        getAllMoviesInfo();
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
            <h2 className="w-100 d-flex justify-content-center p-3">TCSS460 Full Stack Movie Web Services (Main Page)</h2>
            <div className="row">
                <div className='col-md-12'>
                <h3>View All Movies</h3>
                <p><Link to="/movies/sorted" className="btn btn-success">Movies From Highest to Lowest Rating</Link></p>
                <p><Link to="/movies/search" className="btn btn-success">Search by Genre</Link></p>
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

export default Movies;