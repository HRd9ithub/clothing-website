import { updatePassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase'

const ChangePassword = () => {
    const [data, setData] = useState({
        currentpassword: '',
        newpassword: '',
        confirmpassword: ''
    })
    //error store state
    const [errorMsg, setErrorMsg] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    //onchange function
    const InputEvent = (e) => {
        console.log(e.target.value);
        const name = e.target.name;
        const values = e.target.value;
        setData({ ...data, [name]: values })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //error handling
        setErrorMsg(validate(data));
        setIsSubmit(true);
    }

    const validate = (values) => {
        let error = {};

        if (!values.currentpassword) {
            error.currentpassword = "Please Enter The Current Password"
        }
        if (!values.newpassword) {
            error.newpassword = "Please Enter The New Password"
        }
        if (!values.confirmpassword) {
            error.confirmpassword = "Please Enter The Confirm Password"
        }
        if (values.newpassword) {
            if (values.newpassword !== values.confirmpassword) {
                error.confirmpassword = "Password is not match"
            }
        }
        return error;
    }

    const onSubmit = () => {
        const user = auth.currentUser;
        const newPassword = data.newpassword;
        //update password functionlity
        updatePassword(user, newPassword).then(() => {
            toast.success('Password Changed is Successfully!  ', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
        })
        setData({
            currentpassword: '',
            newpassword: '',
            confirmpassword: ''
        })


    }
    useEffect(() => {
        if (Object.keys(errorMsg).length === 0 && isSubmit) {
            onSubmit();
        }
    }, [errorMsg])
    return (
        <>
            <div className='container'>
                <div className='col-md-10 col-lg-4 mx-auto mt-5'>
                    <form onSubmit={handleSubmit} >
                        <div className="mb-1">
                            <label htmlFor="exampleInputPassword1" className="form-label">Current Password</label>
                            <input type="password"
                                className={errorMsg.currentpassword && "input-error border-danger"}
                                id="exampleInputPassword1"
                                placeholder="enter the Current Password"
                                name="currentpassword"
                                value={data.currentpassword}
                                autoComplete="off"
                                onChange={InputEvent}
                            />
                            <div className='errorshow'>{errorMsg.currentpassword}</div>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="exampleInputPassword2" className="form-label">New Password</label>
                            <input type="password"
                                className={errorMsg.newpassword && "input-error border-danger"}
                                id="exampleInputPassword2"
                                placeholder="enter the New Password"
                                name="newpassword"
                                value={data.newpassword}
                                autoComplete="off"
                                onChange={InputEvent}
                            />
                            <div className='errorshow'>{errorMsg.newpassword}</div>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="exampleInputPassword3" className="form-label">Confirm Password</label>
                            <input type="password"
                                className={errorMsg.confirmpassword && "input-error border-danger"}
                                id="exampleInputPassword3"
                                placeholder="enter the Confirm Password"
                                name="confirmpassword"
                                value={data.confirmpassword}
                                autoComplete="off"
                                onChange={InputEvent}
                            />
                            <div className='errorshow'>{errorMsg.confirmpassword}</div>
                        </div>
                        <div className='mt-3 mb-5 change-btn'>
                            <button type='submit' className='btn btn-primary change-button '>ChangePassword</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ChangePassword