import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import empService from "../service/emp.service";



function AddEmp() {
    const [emp, setEmp] = useState({
        firstName: "",
        lastName: "",
        emailId: ""
    })

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setEmp({ ...emp, [e.target.name]: value });
    }
    const navigate = useNavigate();

    const SubmitEmp = (e) => {
        e.preventDefault();
        empService.saveEmp(emp).then((res) => {
            setMsg("Employee Added .");
            setEmp({
                firstName: "",
                lastName: "",
                emailId: ""
            })
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
                                Add New Employee
                            </div>
                            <div className="card-body ">
                                <form onSubmit={(e) => SubmitEmp(e)}>
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
                                {msg && <div class="alert alert-success mt-3" role="alert">
                                    {msg}
                                    {navigate("/")}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmp;
