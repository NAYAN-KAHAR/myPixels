import { useEffect, useState, useContext } from "react";
import './gallery.css';
import axios from "axios";
import searchParam from '../queryContext/query';
import userContext from "../userContext/context";
import { toast, ToastContainer } from 'react-toastify';

const Gallery = () => {
  const imageCategories = [
    "Nature", "Animals", "Architecture", "People", "Technology", "Food",
    "Sports", "Travel", "Art", "Fashion",
    "Education", "History", "Music", "Business", "Wedding", 
    "Urban", "Space", "Religious", "Festivals" 
  ];

  const url = import.meta.env.VITE_BACKEND_URL;
  
  const [showImg, setShowImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [author, setAuthor] = useState();
  const [hasMore, setHasMore] = useState(true); // To manage if there are more images to load
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0); // Track the number of images skipped
  const [activeCategory, setActiveCategory] = useState(""); // New state to track active category
  const [loading, setLoading] = useState(false);

  const [hoveredIndex ,setHoveredIndex] = useState(null);

  const searchValue = useContext(searchParam);
  const loginAuth = useContext(userContext);

  // handle Images and Videos to shows
const handleImages = (imgSrc) => {
  setAuthor(imgSrc.author);
  setShowImg(true);

  if (imgSrc.fileType === 'image') {
  setSelectedImage(imgSrc.fileUrl);
  setSelectedVideo(null);
} else {
  setSelectedVideo(imgSrc.fileUrl);
  setSelectedImage(null);
}

};


const closeModal = () => {
  setShowImg(false);
  setSelectedImage(null);
  setSelectedVideo(null); // ✅ add this
};


  const downloadImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const fileName = url.split('/').pop();
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      toast.success('image dowloaded');
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl); // Clean up after download
      setTimeout(() => closeModal(), 1000);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };


  const loadImages = async (data) => {
    setLoading(true)
    try {
      let urled = '';
      if (data) {
        urled = `${url}/api/file/search/?query=${data}&limit=${limit}&skip=${skip}`;
        setImages([]);
      } else {
        urled = `${url}/api/file?limit=${limit}&skip=${skip}`;
      }
      const response = await axios.get(urled);
      setImages((prevImages) => [...prevImages, ...response.data.data]);
      setHasMore(response.data.hasMore); // Update hasMore based on the response
      // console.log('images/videos', response.data);
      
    } catch (err) {
      console.log('Error:', err);
    }finally{
      setLoading(false);
    }
  };

  const loadMoreImages = () => {
    setSkip(skip + limit); // Update skip to load the next set of images
  };

  
  useEffect(() => {
    loadImages(searchValue.search);  // Load initial images when component mounts
  }, [searchValue.search, skip]); // Trigger when skip changes


  const handleCategoryClick = (category) => {
    // Check if the clicked category is already active, and set accordingly
    if (category === activeCategory) {
      setActiveCategory(""); 
    } else {
      setActiveCategory(category);
    }
    loadImages(category); // Load images based on the selected category
  };

  return (
    <>
    <ToastContainer />
      {/* Modal Popup */}
     {showImg && (
  <div className="show-image" onClick={closeModal}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <div className="popup-content-header">
        <div><p><b>{author}</b></p></div>
        <button
          className="btn btn-dark text-light mb-2 me-3"
          onClick={() => downloadImage(selectedImage || selectedVideo)} >
          Download
        </button>
      </div>

      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          className="popup-image mb-3"
        />
      )}

      {selectedVideo && (
        <video
          src={selectedVideo}
          controls
          muted
          loop
          autoPlay
          className="popup-video mb-3"
        />
      )}
    </div>
  </div>
)}


      <div className="container-fluid py-2">
        <div className="row">
          <div className="sub-category">

            {imageCategories.map((category, i) => (
              <div
                key={i}
                className={`active-div ${activeCategory === category ? 'active' : ''}`} // Apply active className conditionally
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
            
          </div>

          <h5 className="mb-3 mt-3 mx-3"><b>Free Stock Photos</b></h5>

          <div className="col-lg-12">
            <div className="gallery">

            {images && images.map((image, index) => (

                    <div  key={index} className="pics" 
                      onMouseOver={() => setHoveredIndex(index)}  // Set hovered image index
                      onMouseOut={() => setHoveredIndex(null)}  >
                      {image.fileType ==='video' ? (
                         <video
                          onClick={() => handleImages(image)} // ✅ Add this!
                          src={image.fileUrl}
                          autoPlay
                          muted
                          loop
                          className="gallery-video"                 
                    />
                      ):(
                        <img onClick={() => handleImages(image)}
                        src={image.fileUrl}
                        alt="Gallery"
                        className="gallery-image"
                      />
                      )
                      }
                      {/* Show buttons only for the hovered image */}
                      {hoveredIndex === index && (
                        <div className="button-overlay">
                          <div className="text-light mx-2">👨🏻‍💼 <b>{author}</b></div>
                          <button className="btn btn-light mx-2"  onClick={() => downloadImage(image.image)}>Download</button>
                        </div>
                      )}
                    </div>
                    ))}
             
            </div>

            {loading && (
                  <div className="loader-container">
                    <div className="spinner-border text-dark loader" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                    )}
          </div>


          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-3">
              <button onClick={loadMoreImages} className="btn btn-outline-dark btn-lg">
                Load More...
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
