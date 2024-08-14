import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState(0)
    const [error, setError] = useState("");
    const navigate=useNavigate();

    const{id}=useParams();

    const getSingleUser=async()=>{
        

        const response=await fetch(`http://localhost:5000/user/${id}`);

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if (response.ok) {
            setError("");
            setName(result.name);
            setName(result.email);
            setName(result.age);
           

        }
    }

    useEffect(()=>{
        getSingleUser();
    },[])

    const handleEdit=async(e)=>{
        e.preventDefault();

        const UpdatedUser = { name, email, age };

        const response = await fetch(`http://localhost:5000/user/${id}`, {
            method: "PATCH",
            body: JSON.stringify(UpdatedUser),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if (response.ok) {
            console.log(result);
            setError("");
            navigate("/get");
            setName(result.name);
            setName(result.email);
            setName(result.age);
        }
    }

  return (
    <div>
       <div>
            <div className="text-center my-2">
                {error && <div class="alert alert-danger">
                    {error}
                </div>}
                <h2 className="mt-3">Enter the data</h2>
            </div>

            <form onSubmit={handleEdit}>
                <p>{name}</p>
                <div className="mb-3">
                    <label className="form-label">Edit your Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Edit your Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Edit your Age</label>
                    <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </div>
    </div>
  )
}

export default Update
