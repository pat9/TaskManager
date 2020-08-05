import React, { useContext } from 'react'
import Header from '../components/Header'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import './Login.css'
import { AppContext } from '../../context/AppContext'


const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required")
  });

const Login = () => {
    
    const { changeAuth } = useContext(AppContext)

    const onSubmit = async (values) => {
        const response = await fetch(`http://localhost:8000/users/login`, {
            method:"POST",
            body: JSON.stringify(values),
            headers:{
                "Content-type": "application/json"
            }
        })
        const data = await response.json()
        changeAuth(true, data)
    }

    const { handleSubmit,handleChange,values, errors } = useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema,
        onSubmit
    })

    return(
        <div className="login">
            <Header/>
            <div className="login__form">
                <form onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <label>E-mail</label>
                    <input type="text" name="email" placeholder="user@example.com" value={values.email} onChange={handleChange} />
                    {errors.email ? errors.email : null}
                    <label>Password</label>
                    <input type="password" name="password" placeholder="mypassword" value={values.password} onChange={handleChange}/>
                    {errors.password ? errors.password : null}
                    
                    <button type="submit" className="login__form_button"> Go! </button>
                </form>
            </div>
        </div>
    )
}

export default Login