import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import './join.css';
import axios from 'axios';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

  const handleOtp = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Move focus to the next input if there's a value
    if (e.target.value && index < otp.length - 1) {
      e.target.nextElementSibling?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    console.log(otp.join(''));
    const newOtp = otp.join('');
    try{
       const response = await axios.post(`${url}/api/otp/verify`, { newOtp },
         {withCredentials: true}
      )
       console.log(response.data.message)
       if(response.data.message === "OTP verified successfully."){
          toast.success('OTP verified successfully');
          setTimeout(() => navigate('/newpassword'), 2000);
          return;
       }
    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />

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
            <h3 className="text-center mb-3 mt-3"><b>Verify Otp</b></h3>

            <div className="input-div">
              {otp.map((_, i) => (
                <input
                  key={i}
                  type="number"
                  value={otp[i]}
                  className="form-control"
                  onChange={(e) => handleOtp(e, i)}  // Use onChange instead of onInput
                />
              ))}
            </div>

            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-dark text-light mb-3">
                <Link to="/signin" className="text-decoration-none text-white">←  Back</Link>
              </button>

              <Link to="/newpassword" className="text-decoration-none">
                    <button type="submit" onClick={handleVerifyOtp} 
                         className="btn btn-dark text-light mb-3">Verify
                    </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
