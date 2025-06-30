import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './join.css';
import JoinNavbar from "./joinNav";




const Login = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();



   const handleForm = async (e) => {
    e.preventDefault()
    try{
      const userData = {email,password}
      const response = await axios.post(`${url}/api/login`, userData, 
        { withCredentials: true }
      );
      // console.log(response.data.existsUser.name);
      console.log(response.data.existsUser.name)
      localStorage.setItem('userName', response.data?.existsUser?.name);

      if (response.data.message === "incorrect password here") {
        toast.error('Incorrect password');
      } else if (response.data.message === "user not found") {
        toast.error("user not found");
        setTimeout(() => navigate('/signup'), 2000);
      } else if (response.data.message === "user login sucessfully") {
        toast.success('Successfully logged in');
        localStorage.setItem('user', true);
        setTimeout(() => navigate('/admin'), 2000);
     }
    }catch(err){
      // console.log('error', err?.response.data.error.details[0].message);
      toast.error(err?.response?.data?.error?.details[0]?.message || 'Something went wrong!');
      navigate('/login');
    }
    
   }
  return (
    <>
    <ToastContainer/>
    <JoinNavbar  data="Join Us" />

    <div className="container py-3">
      <div className="row justify-content-center mt-2 form-row">
        <div className="col-lg-5 col-mb-6 col-sm-12 py-5 col-xl-5 py-5">

           
         <h3 className="mb-3 mt-3 text-center">Where your photography is seen, used, and loved by the world.</h3> 
      
                <form onSubmit={handleForm} >
                  <h3 className="text-center mb-3 mt-3"><b>Welcome Back</b></h3>
         
                 <div className="form-floating mb-3">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                

                <div className="form-floating mb-3">
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control " id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
         
                
                  <Link className="text-decoration-none" to="/forget/password">
                  <p className="forget-pass">Forgot Password </p></Link>
              

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-dark text-light mb-3">
                  <Link to="/" className="text-decoration-none text-white">←  Back</Link></button>
                  
                  <button type="submit" className="btn btn-dark text-light mb-3">Submit</button></div>
                  <p className="text-center">don't have an account? Please Join Us </p>

                </form>
            </div>

            <div className="col-lg-5 col-mb-6 col-sm-12 col-xl-5 py-5 img-col">
              <img src="https://img.freepik.com/premium-vector/online-registration-illustration-design-concept-websites-landing-pages-other_108061-938.jpg" 
              className="img-fluid mt-3" alt="" />
            </div>
         </div>
        </div>

    </>
  );
};

export default Login;

