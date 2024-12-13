import React, { useState, useEffect } from "react";
import { storage } from "../FirebaseConfig";
import { useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable } from "firebase/storage";

const initialState = {
  name: "",
  email: "",
  info: "",
  contact: "",
};
function AddEditUser() {
  const [data, setDate] = useState(initialState);
  const { name, email, info, contact } = data;
  const [file, setFile] = useState(null);
  const [progess, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    setDate({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  useEffect(()=>{
    const uploadFile =()=>{
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage,file.name);
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot)=>{
            const progresss = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progresss)
            switch(snapshot.state){
                case "pauseed":
                   console.log("upload is pause");
                   break;
                case "running":
                    console.log("upload is Running");
                    break;
                default :
                   break;       
            };
        },(error)=>{
            console.log(error)
        })
    }
  })
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center my-5">
      {isSubmit ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <form
          className="form-control d-flex flex-column"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="form-control mb-3"
            value={name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="form-control mb-3"
            value={email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="info"
            placeholder="Enter information"
            className="form-control mb-3"
            value={info}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Enter contact"
            className="form-control mb-5"
            value={contact}
            onChange={handleChange}
          />
          <input
            type="file"
            name="upload"
            placeholder="Enter image"
            className="form-control mb-5"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AddEditUser;
