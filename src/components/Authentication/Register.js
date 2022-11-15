import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Common/Loader';

const Register = () => {
    //form data store in state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    //error message store in state
    const [errorMsg, setErrorMsg] = useState({});
    //submit state toggle 
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

    const validate = (value) => {
        let error = {}; // store error
        //check the input filed value is empty or not
        if (!value.name) {
            error.name = "Please Enter the name"
        }
        if (!value.email) {
            error.email = "Please Enter the email"
        }
        if (!value.password) {
            error.password = "Please Enter the password"
        }

        return error;
    }

    const onSubmit = () => {
        const { name, email, password } = formData;
        //signup code
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
            const user = res.user;
            //updete name
            await updateProfile(user, {
                displayName: name,
            })
            navigate("/")
            setIsSubmit(false)
            setLoading(false);
        }).catch((err) => {
            setLoading(false)
            toast.error(err.message, {
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
        //submit before in state is empty
        setFormData({
            name: "",
            email: "",
            password: "",
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
                                        <h3>Sign-Up</h3>
                                        <hr />
                                    </div>
                                    {/* start form */}
                                    <form className='form' onSubmit={handleSubmit}>
                                        <div className='main-form'>
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">FullName</label>
                                                <input type="text"
                                                    className={errorMsg.name && "input-error border-danger"}
                                                    id="exampleFormControlInput1"
                                                    name="name"
                                                    value={formData.name}
                                                    autoComplete="off"
                                                    onChange={InputEvent}
                                                    placeholder="enter the name" />
                                            </div>
                                            {/* error msg display */}
                                            <div className='errorshow'>{errorMsg.name} </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput2" className="form-label">Email Address</label>
                                                <input type="email"
                                                    className={errorMsg.email && "input-error border-danger"}
                                                    id="exampleFormControlInput2"
                                                    name="email"
                                                    value={formData.email}
                                                    autoComplete="off"
                                                    onChange={InputEvent}
                                                    placeholder="name@example.com" />
                                            </div>
                                            {/* error msg display */}
                                            <div className='errorshow'>{errorMsg.email} </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput3" className="form-label">password</label>
                                                <input type="password"
                                                    className={errorMsg.password && "input-error border-danger"}
                                                    id="exampleFormControlInput3"
                                                    name="password"
                                                    value={formData.password}
                                                    autoComplete="off"
                                                    onChange={InputEvent}
                                                    placeholder="enter the password"
                                                />
                                            </div> {/* error msg display */}
                                            <div className='errorshow'>{errorMsg.password} </div>

                                            <div className="col-12">
                                                <button className="btn btn-outline-primary" type="submit">Register</button>
                                            </div>
                                            <p className='text'>Already have an account ?
                                                <span><NavLink to="/login">    login</NavLink></span>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
            <ToastContainer />
        </>
    )
}

export default Register