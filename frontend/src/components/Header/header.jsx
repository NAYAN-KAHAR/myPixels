
import { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import './header.css';
import searchParam from '../queryContext/query';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

    const searchValue = useContext(searchParam);
  const authUser = localStorage.getItem('user');

  // Scroll event listener to show the input field when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowInput(true);
      } else {
        setShowInput(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  const handleSearch = (e) => {
    e.preventDefault();
    const newValue = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
    // console.log("Searching for:", searchQuery);
    searchValue.setSearch(newValue);
    setSearchQuery('')
  };

  return (
 
<nav className="navbar">
  <div className="container-fluid main-nav-div">
    <Link to="/" className="navbar-brand mx-3"><b>MyPixels</b></Link>
    
    <form onSubmit={handleSearch} className="d-flex search-form" role="search">
      <input
        type="text"
        placeholder="Search photos"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {authUser ? (
        <Link to="/admin" className="btn btn-dark text-light btn-sm mx-2">Admin</Link>
      ) : (
        <Link to="/signup" className="btn btn-dark text-light btn-sm-button mx-2">Join</Link>
      )}
    </form>
  </div>
</nav>



  );
};

export default Header;