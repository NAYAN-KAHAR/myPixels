import { useState, useContext } from "react";
import './hero.css';
import { MdSearch } from "react-icons/md";
import searchParam from '../queryContext/query';

const HeroSection = () => {
  const [search, setSearch] = useState('');

  const searchValue = useContext(searchParam); 

  const handleInput = (e) => {
    e.preventDefault();
    const newValue = search.charAt(0).toUpperCase() + search.slice(1); 
    searchValue.setSearch(newValue);
  }
  
  return (
    <>
    <div className="container-fluid">
    <div className="row">

    <div className="col-lg-12 hero-section">

        <div className="search">
            <div>
                <h4 className="text-white mb-3">The best free stock photos, royalty free <br />
                 Images shared by creators.</h4>
                 
                <div className="search-inner-div">
                <form className="form" onSubmit={handleInput}>
                    <input 
                      type="text" 
                      onChange={(e) => setSearch(e.target.value)} 
                      className="form-control" 
                      placeholder="Search for free photos" 
                    />
                    <button type="submit"  >
                      <img src="https://static.thenounproject.com/png/2946467-200.png" alt="logo" width={20} />
                    </button>
                  </form>


                </div>
            </div>
        </div>


    </div>
    </div>
    </div>
        
    </>
  );
};

export default HeroSection;
