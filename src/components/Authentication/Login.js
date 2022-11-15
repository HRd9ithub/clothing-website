import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';

const Login = () => {
    //form data store in state
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    //error message store in state
    const [errorMsg, setErrorMsg] = useState({});
    //submit state toggle karva
    const [isSubmit, setIsSubmit] = useState(false);
    //page redirect karva use
    const navigate = useNavigate();
    //use state in used of loader component of toggle
    const [loading, setLoading] = useState(false)

    //onchange function call
    const InputEvent = (event) => {
        let name = event.target.name;
        let values = event.target.value;

        setFormData({ ...formData, [name]: values })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(validate(formData));
        setIsSubmit(true)
    }
    //check state data
    const validate = (value) => {
        let error = {};  //error store

        if (!value.email) {
            error.email = "Please Enter the email"
        }
        if (!value.password) {
            error.password = "Please Enter the password"
        }
        return error;
    }

    const onSubmit = () => {
        const { email, password } = formData;
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password).then((res) => {   // create user login functionality 
            navigate("/");
            setLoading(false);
            // set path is redirect
        }).catch((err1) => {
            setLoading(false);
            toast.error(err1.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })
    }

    useEffect(() => {
        //check error state length 0 and submit state true to onsubmit call function 
        if (Object.keys(errorMsg).length === 0 && isSubmit) {
            onSubmit();
        }
    }, [errorMsg])// useEffect call in errormsg state in value is change of call 
    return (
        <>
            <div className='main-div'>
                {loading ? <Loader /> : <>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-10 form-info'>
                                <div className='contact'>
                                    {/* form title */}
                                    <div className='title'>
                                        <h3>login</h3>
                                        <hr />
                                    </div>
                                    {/* start form */}
                                    <form className='form' onSubmit={handleSubmit}>
                                        <div className='main-form'>
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                                                <input type="text"
                                                    className={errorMsg.email && "input-error border-danger"}
                                                    id="exampleFormControlInput1"
                                                    name="email"
                                                    value={formData.email}
                                                    autoComplete="off"
                                                    onChange={InputEvent}
                                                    placeholder="name@example.com" />
                                            </div>
                                            {/* error msg display */}
                                            <div className='errorshow'>{errorMsg.email} </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
                                                <input type="password"
                                                    className={errorMsg.password && "input-error border-danger"}
                                                    id="exampleFormControlInput2"
                                                    name="password"
                                                    value={formData.password}
                                                    autoComplete="off"
                                                    onChange={InputEvent}
                                                    placeholder="enter the password" />
                                            </div>
                                            {/* error msg display */}
                                            <div className='errorshow'>{errorMsg.password} </div>

                                            <div className="col-12">
                                                <button className="btn btn-outline-primary" type="submit">Login</button>
                                            </div>
                                            {/* register page redirect karva */}
                                            <p className='text'>Create a New account?
                                                <span><NavLink to="/register">   Register</NavLink></span>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                }
            </div>
            <ToastContainer />
        </>
    )
}

export default Login;