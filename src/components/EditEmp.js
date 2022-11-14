import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import empService from '../service/emp.service';

function EditEmp() {
    const [emp, setEmp] = useState({
        id:"",
        firstName: "",
        lastName: "",
        emailId: ""
    })

    const [msg, setMsg] = useState("");

    const data=useParams();

    const navigate = useNavigate();


    useEffect(()=>{
        empService.getAllEmployeeFromId(data.id).then((res)=>{
            setEmp(res.data);
        }).catch((error)=>{
            console.log(error);
        })
    },[]);


    const handleChange = (e) => {
        const value = e.target.value;
        setEmp({ ...emp, [e.target.name]: value });
    }

    const updateEmp = (e) => {
        e.preventDefault();
        empService.update(emp.id,emp).then((res) => {
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-header text-center fs-3">
                                Edit Employee
                            </div>
                            <div className="card-body ">
                                <form onSubmit={(e) => updateEmp(e)}>
                                    <div className="mb-3">
                                        <label>Enter First Name</label>
                                        <input type="text" className="form-control" name="firstName" value={emp.firstName} onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Enter Last Name</label>
                                        <input type="text" className="form-control" name="lastName" value={emp.lastName} onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Enter Email Address</label>
                                        <input type="email" className="form-control" name="emailId" value={emp.emailId} onChange={(e) => handleChange(e)} />
                                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                        <label class="form-check-label" for="invalidCheck">
                                            Agree to terms and conditions
                                        </label>
                                        <div class="invalid-feedback">
                                            You must agree before submitting.
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-success">Submit</button>
                                        <input type="Reset" className="btn btn-danger ms-2" value="Clear" />
                                    </div>
                                </form>
                                {msg && <div class="alert alert-success" role="alert">
                                    {msg}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmp