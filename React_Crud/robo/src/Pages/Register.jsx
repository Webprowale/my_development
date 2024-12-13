import React from 'react'
import { validateUser } from '../schemas';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import { registerAuth } from '../Component/API';
import { toast } from "react-toastify";
const Register = () => {
    const onSubmit =async(values)=>{
        try{
            const res = registerAuth(values.email, values.password)
            console.log(res)
            alert("Registration successful")
        }
        catch(error){
            alert(error.message);
        }
    }
    const { values, handleBlur, handleChange, handleSubmit, isSubmitting, errors, touched} = useFormik({
     initialValues:{
        username: "",
       email: "",
       password: "",
     },
     validationSchema: validateUser,
     onSubmit,
    })
    return (
        <div className="container-fluid hero login shadow rounded">
          <div className=" mx-auto formBody">
            <div className="text-center">
              <span className="fs-1 text-black">🧸</span>
              <h2 className="fw-bold  fs-2 fText mb-5">Register</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="i.e kelvin"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="floatingInput">Username</label>
                {errors.username && touched.username ? <small className="fw-semibold text-danger">{errors.username}</small>:""}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="floatingInput">Email address</label>
                {errors.email && touched.email ? 
                  <small className="fw-semibold text-danger">{errors.email}</small>
                 : 
                  ""
                }
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="floatingPassword">Password</label>
                {errors.password && touched.password ? 
                  <small className="fw-semibold text-danger">
                    {errors.password}
                  </small>
                 : 
                  ""
                }
              </div>
              <button
                type="submit"
                className="formBtn hero text-white px-5 py-1 rounded-pill w-100 my-3"
                disabled={isSubmitting} style={{opacity: isSubmitting ? "0.6": ""}}
              >
                Register
              </button>
            </form>
            <p className="fw-bold text-center mt-2">
              <Link to="/login">Already Have an Account? Login</Link>
            </p>
            <p className="fw-semibold regText m-2">
              By using this service, you agree to our Privacy Policy, Terms of
              Service and any related policies. (Check Disclaimer)
            </p>
          </div>
        </div>
      );
}

export default Register