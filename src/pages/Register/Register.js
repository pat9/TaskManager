import React, { useContext } from 'react'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { AppContext } from '../../context/AppContext'
import Header from '../components/Header'
import './Register.css'

const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    password: Yup.string().required("Required")
  });


const Register = () => {

    const { changeAuth } = useContext(AppContext)
    const { push } = useHistory()

    const onSubmit = async (values) => {
        const response = await fetch(`${ process.env.REACT_APP_ENDPOINT }/users/register`, {
            method:"POST",
            body: JSON.stringify(values),
            headers:{
                "Content-type": "application/json"
            }
        })
        const data = await response.json()
        changeAuth(true, data)
        push('/board')
    }

    const { handleSubmit,handleChange,values, errors } = useFormik({
        initialValues:{
            email:'',
            name:'',
            password:'',
        },
        validationSchema,
        onSubmit
    })

    return(
        <div className="register">
            <Header/>
            <div className="register__form">
                <form onSubmit={handleSubmit}>
                    <h3>Register</h3>
                    <label>E-mail</label>
                    <input type="text" name="email" placeholder="user@example.com" value={values.email} onChange={handleChange} />
                    {errors.email ? errors.email : null}
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Daniel Pat" value={values.name} onChange={handleChange} />
                    {errors.email ? errors.email : null}
                    <label>Password</label>
                    <input type="password" name="password" placeholder="mypassword" value={values.password} onChange={handleChange}/>
                    {errors.password ? errors.password : null}
                    
                    <button type="submit" className="register__form_button"> Go! </button>
                    <button onClick={ () => push('/login') } className="register__form_button"> Login </button>
                </form>
            </div>
        </div>
    )
}

export default Register