// Import necessary modules and libraries
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
    // The utilization of useParams Hook facilitates the retrieval 
    // of encoded data from the URL path within a component when a 
    // Route is active or becomes activated by a link, such as when 
    // a user clicks on a link. In the App.js file, the route for 
    // retrieving information about a city (Read component) is 
    // defined as 'read/:'.The name of the parameter is cityName.
    // Hence, the cityName parameter represents encoded data within 
    // the URL. Our objective is to extract this data in order to 
    // utilize it within our component.
    const { movieName } = useParams();

    // useState Hook is a function that enables a component to set
    // and manage the state that is associated with a component. In 
    // this case, we would like to manage the data within this 
    // component for a city. When a change is made to that data, 
    // useState (or React in this case) will update the UI
    // accordingly. We are initializing the values to empty. 
    const [ movie, setMovie ] = useState({
        Name: "",
        ReleaseDate: "",
        Rating: "",
        Director: "",
        Genre: ""
    });

    // useNavigate Hook provides access to navigation 
    // features that can be associated with navigation
    // actions (e.g., when a page changes)    
    const navigate = useNavigate();

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
        axios.get("http://localhost:2000/" + movieName)
            .then((res) => {
                console.log("response: ",res);
                setMovie(res.data[0]);
            })
            .catch((err) => console.log("Error: ", err));
    }, [movieName]);

    
    // handleChange is responsible for retrieving the value of a form element
    // associated with a specific element name. This method is used for handling
    // events assoicated with a form element.    
    const handleChange = (e) => {
        setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // handleSubmit is responsible for handling the form submission. In this case, 
    // we wish to put the data from the form elements to the URI that handles this
    // HTTP method. Note the use of decodeURI which decodes the data in the URL.      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(decodeURI("http://localhost:2000/"+ movieName), movie)
            console.log(response.data.Name)
            navigate("/");
          } catch (err) {
            console.log("Error: " + err);
          }
    };

    // The return for this component will output the HTML code that
    // we wish to present through the UI. Note the mapping of the
    // JavaScript variables or collections using the curly brackets
    // Example: {city.city} will retrieve the data from the city
    // collection for an element named city using its state at that
    // moment in time.   
    // Note the use of the curly brackets to retrieve the values
    // of data within our city collection. We also map these
    // values to the "value" parameter of an input which will 
    // automatically populate the data on the form element so that
    // a user can change it if needed. The handleSubmit will 
    // handle any data submission to be posted using the HTTP PUT
    // method. The handleChange simply updates the state of the 
    // form element. 
    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3">TCSS460 Full Stack Movie Web Services (CRUD: Update)</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <h3>Edit Movie Detail</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                            <label>Movie Name:</label>
                            <input type="text" className="form-control"  placeholder="Name" name="Name" value={movie.Name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Release Date:</label>
                            <input type="number"  min="1" step="1" className="form-control"  placeholder="ReleaseDate" name="ReleaseDate" value={movie.ReleaseDate} onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label>Rating:</label>
                            <input type="number" min="1" max="300" step="0.1"  className="form-control" placeholder="Rating" name="Rating" value={movie.Rating} onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label>Director:</label>
                            <input type="text" className="form-control" placeholder="Director" name="Director" value={movie.Director} onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label>Genre:</label>
                            <input type="text" className="form-control"  placeholder="Genre" name="Genre" value={movie.Genre} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary" >Edit Movie Details</button> 
                        <p></p>
                        <p><Link className="btn btn-secondary"  to="/">View all Movies (Main Page)</Link></p>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Update;