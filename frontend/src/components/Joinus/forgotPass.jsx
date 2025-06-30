import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';



const ForgetPassword = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const url = import.meta.env.VITE_BACKEND_URL;

  const handleOtp = async () => {
    try{
      const response = await axios.post(`${url}/api/forget/password`, { email },
        { withCredentials: true }
      );
      console.log(response.data)
      if(response.data.message === "OTP already sent. Please wait for it to expire or request a new one."){
        return toast.error("OTP already sent. Please wait for it to expire or request a new one.")
      } 
      if(response.data.message ='OTP sent successfully' ){
        toast.success('send otp successfully');
        setTimeout(()=> navigate('/verifyotp'), 1000);
        return;
      }
    }catch(err){
      console.log('error', err)
      toast.error(err.response.data.message)
    }
  }

  return (
    <>
    <ToastContainer/>
    
    <nav className="navbar nav-bg">
        <div className="container">
           <Link className="text-decoration-none" to="/">
               <h3 className="navbar-brand"><b>MyPixels</b></h3>
            </Link>
        </div>
    </nav>


    <div className="container py-5">
      <div className="row justify-content-center mt-2 form-row">
        <div className="col-lg-5 col-mb-6 col-sm-12 py-5 col-xl-5 py-5">

               
          <h3 className="text-center mb-3 mt-3"><b>Forget Password </b></h3>
         
          <div className="form-floating mb-3">
             <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
            </div>
                                                         
        
            <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-dark text-light mb-3">
                  <Link to="/signin" className="text-decoration-none text-white">←  Back</Link></button>
                  
              <button onClick={handleOtp} className="btn btn-dark text-light mb-3">Get Otp</button>
            

            </div>

            </div>
            
         </div>
        </div>

    </>
  );
};

export default ForgetPassword;

