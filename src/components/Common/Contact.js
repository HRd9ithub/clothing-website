import React, { useEffect, useState } from 'react'

const Contact = () => {
    //form data store in state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        message: ""
    })
    //error message store in state
    const [errorMsg, setErrorMsg] = useState({});

    //onchange function call
    const InputEvent = (event) => {
        let name = event.target.name;
        let values = event.target.value;

        setFormData({ ...formData, [name]: values })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(validate(formData));
    }

    //check data 
    const validate = (value) => {
        let error = {};

        if (!value.name) {
            error.name = "Please Enter the name"
        }
        if (!value.email) {
            error.email = "Please Enter the email"
        }
        if (!value.number) {
            error.number = "Please Enter the number"
        }
        if (!value.message) {
            error.message = "Please Enter the message"
        }
        return error;
    }

    const onSubmit = () => {
        setFormData({
            name: "",
            email: "",
            number: "",
            message: ""
        })
    }

    useEffect (()=>{
        if(Object.keys(errorMsg).length === 0){
            onSubmit();
        }
    },[errorMsg])

    return (
        <>
            <div className='main-contact-div'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 form-info'>
                            <div className='contact'>
                                {/* form title */}
                                <div className='title'>
                                    <h3>contact</h3>
                                    <hr/>
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
                                            <label htmlFor="exampleFormControlInput3" className="form-label">Number</label>
                                            <input type="number"
                                                className={errorMsg.number && "input-error border-danger"}
                                                id="exampleFormControlInput3"
                                                name="number"
                                                value={formData.number}
                                                autoComplete="off"
                                                onChange={InputEvent}
                                                placeholder="enter the number"
                                                 />
                                        </div> {/* error msg display */}
                                        <div className='errorshow'>{errorMsg.number} </div>

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                                            <textarea 
                                                className={errorMsg.message && "input-error border-danger"}
                                                id="exampleFormControlTextarea1"
                                                name="message"
                                                value={formData.message}
                                                autoComplete="off"
                                                onChange={InputEvent}
                                                rows="3"></textarea>
                                        </div>
                                         {/* error msg display */}
                                         <div className='errorshow'>{errorMsg.message} </div>

                                        <div className="col-12">
                                            <button className="btn btn-outline-primary" type="submit">Submit form</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact