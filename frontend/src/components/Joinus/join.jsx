import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiso from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './join.css';
import JoinNavbar from "./joinNav";
import userContext from "../userContext/context";

const JoinUs = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conformPass, setConformPass] = useState();
  const navigate = useNavigate();

   const url = import.meta.env.VITE_BACKEND_URL;

  const loginAuth = useContext(userContext);

   const handleForm = async (e) => {
    e.preventDefault();

    try{ 
      if(password !== conformPass) alert('pass and conPass are not match')
      const userData = {name,email,password}
      const response = await axiso.post(`${url}/api`,userData);
      console.log(response.data);
      if(response.data.message === "User already exists, please try another email") {
        return toast.error("User already exists, please try another email")
      }
      loginAuth.setAuth(response.data.newUser.name)
      toast('successfully register user')
      setTimeout(() => navigate('/signin'), 600);
    }catch(err){
      console.log('error', err)
    }
   }
   
  return (
    <>
    <ToastContainer />

    <JoinNavbar/>

    <div className="container py-3">
      <div className="row justify-content-center">
        
        <div className="col-lg-5 col-mb-6 col-sm-12 py-5">
          
         <h3 className="mt-3">Where your photography is seen, used, and loved by the world.</h3> 
         <p className="mt-3">Share your photos in one of the largest free libraries of visual content on the Internet.</p>

                <form onSubmit={handleForm} >
                  <h4 className="text-center mb-3"><b>Join Us</b></h4>
                <div className="form-floating mb-3">
                    <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="floatingText" placeholder="name" />
                    <label htmlFor="floatingText">Full Name</label>
                </div>

                 <div className="form-floating mb-3">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control " id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" onChange={(e) => setConformPass(e.target.value)} className="form-control " id="floatingConPassword" placeholder="Password" />
                    <label htmlFor="floatingConPassword">Confirm Password</label>
                </div>

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-dark text-light mb-3">
                  <Link to="/" className="text-decoration-none text-white">←  Back</Link></button>
                  <button type="submit" className="btn btn-dark text-light mb-3">Submit</button></div>
                  <p className="text-center dispaly-1">By joining, you will be able to upload images</p>

                </form>
            </div>

            <div className="col-lg-5 col-mb-6 col-sm-12 py-5 img-col">
              <img src="https://img.freepik.com/premium-vector/online-registration-illustration-design-concept-websites-landing-pages-other_108061-938.jpg"  className="img-fluid mt-3" alt="" />
            </div>

         </div>
        </div>

    </>
  );
};

export default JoinUs;

