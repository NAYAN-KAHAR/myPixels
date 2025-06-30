
import { Link } from "react-router-dom";
import './join.css';

const JoinNavbar = ({data}) => {
    return(
        <>
        
        <nav className="navbar">
        <div className="container">
          <Link className="navbar-brand" to="/"><b>MyPixels</b></Link>

            <button className="btn btn-dark">
              <Link to={data? '/signup':'/signin'} className="text-decoration-none text-light">{data ? data : 'Login'} </Link>
            </button>
       
        </div>
      </nav>


   

        </>
    )
}

export default JoinNavbar;