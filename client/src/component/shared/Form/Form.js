import React, { useState } from 'react'
import InputType from './InputType'
import { NavLink } from 'react-router-dom'

function Form({ submitText, formTitle, formType }) {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [name, setName] = useState('')
    let [role, setRole] = useState('doner')
    let [phone, setPhone] = useState('')
    let [address, setAddress] = useState('')
    let [hospitalName, setHospitalName] = useState('')
    let [originazation, setOriginazation] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (formType === 'login') {
            try {
                console.log('Entered to login')
                //fetch data

                setEmail('')
                setPassword('')
            }
            catch (error) {
                console.log(error)
            }
        }
        else if (formType === 'register') {
            try {
                console.log('Entered to register');
                //fetch data

                setEmail('')
                setPassword('')
                setAddress('')
                setPhone('')
                setHospitalName('')
                setOriginazation('')
                setName('')
            }
            catch (error) {
                console.log(error)
            }
        }
    }
    return (

        <form>
            <h3> {formTitle}</h3>
            <hr />
            {/* {JSON.stringify(role,null,4)} */}
            <div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="role" id="doner" value="doner" defaultChecked onChange={(e) => setRole(e.target.value)} />
                    <label className="form-check-label" htmlFor="doner">Doner</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="role" id="admin" value="admin" onChange={(e) => setRole(e.target.value)} />
                    <label className="form-check-label" htmlFor="admin">Admin</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="role" id="hospital" value="hospital" onChange={(e) => setRole(e.target.value)} />
                    <label className="form-check-label" htmlFor="hospital">Hospital</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="role" id="originazation" value="originazation" onChange={(e) => setRole(e.target.value)} />
                    <label className="form-check-label" htmlFor="originazation">Originazation</label>
                </div>
            </div>
            {(() => {
                // eslint-disable-next-line
                switch (true) {
                    case formType === "login": {
                        return (
                            <>
                                {/* email */}
                                <InputType inputType="text" labelText="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" labelFor="email" />
                                {/* password */}
                                <InputType inputType="password" labelText="Password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" labelFor="password" />
                            </>
                        )
                    }
                    case formType === 'register': {
                        return (
                            <>
                                {/* name */}
                                {(role === "doner" || role === "admin") && (<InputType inputType="text" labelText="Name" value={name} onChange={(e) => setName(e.target.value)} name="name" labelFor="name" />)}
                                {/* //hospitalname */}
                                {(role === "hospital") && (
                                    <InputType inputType="text" labelText="Hospital Name" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} name="hospitalName" labelFor="hospitalName" />)}
                                {/* {originazationName} */}
                                {(role === "originazation") && (
                                    <InputType inputType="text" labelText="Originazation Name" value={originazation} onChange={(e) => setOriginazation(e.target.value)} name="originazation" labelFor="originazation" />)}
                                {/* email */}
                                <InputType inputType="text" labelText="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" labelFor="email" />
                                {/* password */}
                                <InputType inputType="password" labelText="Password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" labelFor="password" />
                                {/* {phone} */}
                                <InputType inputType="text" labelText="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" labelFor="phone" />
                                {/* //address */}
                                <InputType inputType="text" labelText="Address" value={address} onChange={(e) => setAddress(e.target.value)} name="address" labelFor="address" />
                            </>
                        )
                    }


                }
            })()}
            <div className='forget-password'>{formType === "login" && <NavLink>Forget Password</NavLink>}</div>
            {formType === "login" && <> Not registered yet ? Register <NavLink to="/register">Here !</NavLink></>}
            {formType === "register" && <>  Already Register ?  Login <NavLink to="/login">Here !</NavLink></>}
            <br />
            <button type="submit" className="btn btn-primary" onClick={(e) => submitHandler(e)}>{submitText}</button>
        </form>
    )
}

export default Form