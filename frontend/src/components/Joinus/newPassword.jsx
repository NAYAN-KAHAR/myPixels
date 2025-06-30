import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './join.css';



const NewPassword = () => {
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();

  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

   const handleForm = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.put(`${url}/api/new/password`, { password },
        { withCredentials: true }
      );
      console.log(response.data.message)
      if(response.data.message === 'Password updated successfully'){
          toast.success('Password updated successfully');
          setTimeout(() => navigate('/signin'), 2000);
      }
    }catch(err){
      console.log('error', err)
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

           
                <form onSubmit={handleForm} >
                  <h3 className="text-center mb-3 mt-3"><b>Create new password</b></h3>
         
               
                <div className="form-floating mb-3">
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control " id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">New Password</label>
                </div>
         
                <div className="form-floating mb-3">
                    <input type="password" onChange={(e) => setConfirmPass(e.target.value)} className="form-control " id="conPassword" placeholder="Password" />
                    <label htmlFor="conPassword">Confrim Password</label>
                </div>
         
                  <button type="submit" className="btn btn-dark text-light mb-3">Update</button>

                </form>
            </div>

            
         </div>
        </div>

    </>
  );
};

export default NewPassword;

