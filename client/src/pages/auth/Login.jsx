import React from 'react'
import Form from '../../component/shared/Form/Form'

function Login() {
    return (

        <>
            <div className="row g-0">
                <div className="col-md-5">
                    <img src='./assest/pexels-karolina-grabowska-4226923.jpg' alt="blood_bank_login" className='img-fluid login-image' />
                </div>
                <div className="col-md-6 form-container">

                    <Form role="" submitText="submit" formTitle="Login" formType="login"/>

                </div>
            </div>
        </>
    )
}

export default Login