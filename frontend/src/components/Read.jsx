import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Read = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    

    async function getData() {
        const response = await fetch("http://localhost:5000/get");
        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if (response.ok) {
            if (Array.isArray(result)) {
                setData(result);
            } else {
                console.error("API response is not an array");
            }
        }
    }

    const handleDelete=async(id)=>{
        const response=await fetch(`http://localhost:5000/delete/${id}`,{
            method:"DELETE"
        });


        const result=await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if (response.ok) {
            setError("Data Deleted Successfully!");

            setTimeout(() => {
               setError("");
               getData(); 
            }, 1000);
        }


    }

    useEffect(() => {
        getData();
    }, [])

    console.log(data);

    return (
        <div>
            <div className="container my-2">
            {error && <div class="alert alert-danger">
                    {error}
                </div>}
                <h2 className="text-center">All data</h2>

                <div className="row">
                    {data?.map((ele) => (
                        <div key={ele._id} className="col-3">
                            <div className="card" style={{ marginBottom: '15px' }}>
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">{ele.name}</h6>
                                    <p className="card-text">{ele.age}</p>
                                    <p className="card-text">{ele.email}</p>
                                    <a href="#" className="card-link" onClick={()=>handleDelete(ele._id)}>Delete</a>
                                    <Link to={`/user/${ele._id}`} href="#" className="card-link">Edit</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Read;