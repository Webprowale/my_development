import React from "react";
import { useFormik} from "formik";
import { basicSchema } from "./schemas";
import { login } from "./API/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function Advance() {
  const db = getFirestore()
const navigate = useNavigate();
    const onSubmit = async (values)=>{
        try{
          const response = await login(values.email, values.password)
          var ref = doc(db, "UserAuthList", response.user.uid)
          const docSnap = await getDoc(ref);
          if(docSnap.exists()){
            sessionStorage.setItem("user-info", JSON.stringify({
              age: docSnap.data().age,
              email:docSnap.data().email,
            }))
            sessionStorage.setItem("user-cred", JSON.stringify(response.user));
             navigate("/home")
          }
        }
        catch(error){
          alert(error.message);
        }
    }
  const {values, handleBlur, errors, isSubmitting, touched, handleChange, handleSubmit,} = useFormik({
    initialValues: {
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  console.log(errors);
  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="d-flex flex-column align-items-start">
      <>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your Email"
          className={errors.email && touched.email ? 'input-error' : " "}
        />
        {errors.email && touched.email ? <p className="text-danger px-5">{errors.email}</p>: ""}
      </>
      <>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          value={values.age}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your Age"
          className={errors.age && touched.age? 'input-error' : " "}
        />
        {errors.age && touched.age ? <p className="text-danger px-5">{errors.age}</p>: ""}
      </>
      <>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your Password"
          className={errors.password && touched.password ? 'input-error' : " "}
        />
        {errors.password && touched.password ? <p className="text-danger px-5">{errors.password}</p>: ""}
      </>
      <>
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirm  your Password"
          className={errors.confirmPassword && touched.confirmPassword? 'input-error' : " "}
        />
        {errors.confirmPassword && touched.confirmPassword ? <p className="text-danger px-5">{errors.confirmPassword}</p> : " "}
      </>
      <button disabled={isSubmitting} type="submit" className="btn btn-primary px-3 py-1 my-3" style={{opacity: isSubmitting ? "0.6": ""}}>Submit</button>
    </form>
  );
}

export default Advance;
