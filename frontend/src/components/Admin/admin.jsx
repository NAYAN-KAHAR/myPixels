import { useEffect, useState } from 'react';
import './admin.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const imageCategories = [
    "Nature", "Animals", "Architecture", "People", "Technology", "Food",
    "Sports", "Travel", "Abstract", "Art", "Fashion", "Health", "Lifestyle",
    "Science", "Education", "History", "Music", "Business", "Wedding", "Landscape",
    "Underwater", "Urban", "Space", "Industrial", "Religious", "Festivals", "Seasonal",
    "Vintage", "Black & White", "Aerial", "Close-up"
  ];
  const url = import.meta.env.VITE_BACKEND_URL;

  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState('');  // Store selected category
  const [file, setFile] = useState(null); // Store selected image file
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [refresh, setFresh] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [isEditable, setIsEditable] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imgModal, setImgModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
 
  const navigate = useNavigate();
  let adminUser = localStorage.getItem('userName');
  adminUser = adminUser?.split(' ')[0];

 

  useEffect(() => {
    axios
    .get(`${url}/api/file/admin`,{withCredentials: true})
    .then((response) => {
      // console.log('response', response.data.data);
      const reversedData = [...response.data.data].reverse(); // Clone and reverse
      setData(reversedData);
      setAllData(reversedData)
      // console.log('images', response.data);
    })
    .catch((err) => { console.log(err) })
   
  },[refresh])


  const handleAddProduct = () => {
    setModal(true); 
    setSelectedImg(null);
    setCategory(null);
    setIsEditable(false);
    setName(null);

  }

  const handleOption = (e) => {
    setCategory(e.target.value); // Update category when option is selected
    
  }

  // Handle images logic here
  const handleUploadFile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        if (!category && !file) {
            alert('Please upload correctly');
            setIsLoading(false)
        } else {
            const uploadData = new FormData();
            uploadData.append('author', name);
            uploadData.append('category', category);
            uploadData.append('file', file);
            console.log('file', file);

            if (isEditable) {
                const response = await axios.put(`${url}/api/file/${editId}`, uploadData,{
                  withCredentials: true
                });
                if (response.status === 200) {
                    setIsEditable(false);
                    setEditId(null);
                    setCategory('');  
                    setFile(null);  
                    setFresh((prev) => !prev);
                    toast('successfully updated');
                    setTimeout(() => setModal(false), 1000);
                } else {
                    alert('Failed to update file!');
                }
            } else {
                const response = await axios.post(`${url}/api/file`, uploadData,
                  {withCredentials: true}
                );
                if (response.status === 200) {
                    toast('successfully uploaded');
                    setFresh((prev) => !prev);
                    setTimeout(() => setModal(false), 700);
                } else {
                    alert('Failed to upload file!');
                }
            }
        }
    } catch (err) {
        console.log(err);
        alert('An error occurred while uploading!');
    }finally{
      setIsLoading(false)
    }
};


const handleFileChange = (e) => {
  const selected = e.target.files[0];
  setFile(selected); // Save file to state

  const objectUrl = URL.createObjectURL(selected);
  const fileType = selected.type;

  if (fileType.startsWith('image/')) {
    setSelectedImg(objectUrl);
    setSelectedVideo(null);
  } else if (fileType.startsWith('video/')) {
    setSelectedVideo(objectUrl);
    setSelectedImg(null);
  }
};

  // Images delete logic
 const deleteImg = async (id) => {
  console.log("id", id)
  const res = await axios.delete(`${url}/api/file/${id}`)
  console.log(res.data)
  setFresh((prev) => !prev);
 }

//  Search Images Logic
 const handleInput = (e) => {
  const query = e.target.value.toLowerCase();
  if(query){
    const filterImages = allData.filter((item) => {
      return item.category.toLowerCase().includes(query)
    });
    setData(filterImages)
  }else{
    setData(allData)
  }
 }

//  images update logic
const updateFile = (item) => {
  setEditId(item._id);
  setIsEditable(true);
  setCategory(item.category);  // Pre-fill the form with existing category
  setModal(true);
  setSelectedImg(item.fileUrl);  // Pre-fill the form with existing file
  setName(item.author)
};
;

// Show images/vidos in popup 
const handleShowImg = (type, url) => {
  if (type === "video") {
    setSelectedVideo(url);
    setSelectedImg(null);
  } else if (type === "image") {
    setSelectedImg(url);
    setSelectedVideo(null);
  }

  setImgModal(true);
};


const handleLogout = async () => {
  try {
      await axios.post(`${url}/api/logout`, {}, {
          withCredentials: true,
      });
      toast.success('Logged out successfully');
      localStorage.removeItem('user');
      navigate('/signin'); // Redirect to login page
  } catch (error) {
      console.log('Logout Error:', error);
      toast.error('Failed to logout');
  }
};




  return (
    <>
      <ToastContainer />
      <nav className="navbar mynavbar">
       <div className="container">
         <div className='navbar-brand'><Link to='/' className='text-decoration-none text-dark'>
         <b>MyPixels</b></Link></div>
         
         <div className='logoutBtn-div'>
{/* 
             <button className='btn btn-sm btn-dark text-light'>🙍🏻‍♂️ {adminUser}</button>
             <button onClick={handleLogout} className="btn btn-outline-danger btn-mb">Logout</button> */}


         <div className="dropdown">
          <button className="btn btn-dark  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          🙍🏻‍♂️ {adminUser}
          </button>
          <ul className="dropdown-menu">
            <li><button  onClick={handleLogout} className="dropdown-item text-danger" type="button">🔚 Logout</button></li>
  
          </ul>
        </div>

          </div>
      </div>
</nav>


      <div className='container admin-container py-5'>
        <div className='row justify-content-center'>

          <div className='col-lg-12 col-xl-12 col-sm-12 col-mb-12 col-12 mt-2'>

  
              <div className='search-bar mt-3 mb-3'>
                        <input type="text"  onChange={(e) => handleInput(e)}
                          className='form-control'
                          placeholder='Search image here'/>  

                          <button className="btn btn-dark btn-sm mx-2 text-light"
                            onClick={handleAddProduct} > + Add Product
                          </button>

                    </div>
          
             
             
            <div className='card imageCard'>
         
              <div className='card-body'>
              <div className="table-responsive-mb table-responsive-sm">
              <table className="table table-hover">

        
                <thead className='text-center thead'>
                    <tr className="text-center">
                      <th scope="col">#</th>
                      <th scope="col">Category</th>
                      <th scope="col">Image</th>
                      <th scope='col'>Edit</th>
                      <th scope='col'>Delete</th>
                    </tr>
                  </thead>
       
              
                  
                  <tbody className='tbody'>
                    {data && data.map((item,i) => {
                      return(
                        <tr key={i} className='text-center'>
                          <th scope="row">{i+1}</th>
                          <td>{item.category}</td>
                          <td>{item.fileType === "video" ?   <video
                                src={item.fileUrl}
                                width={80}
                                height={80}
                                autoPlay
                                muted
                                loop
                                onClick={() => handleShowImg(item.fileType, item.fileUrl)}
                                className="table-video"
                                />
                             :<img onClick={() => handleShowImg(item.fileType,item.fileUrl)} src={item.fileUrl} alt="img" 
                                  className="table-img img-fluid"/>
                           }</td>
                          <td><button className='btn btn-sm btn-warning' 
                                  onClick={() => updateFile(item)} >Edit</button></td>
                          <td><button className='btn btn-sm btn-danger' 
                                 onClick={() => deleteImg(item._id) }>Delete</button></td>
                    </tr>
                      )
                    })

                    }
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>





      {/* Modal for uploading image */}
      {modal && (
        <div className='modal' onClick={() => setModal(false)}>
          <div className='content' onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleUploadFile}>
              <h3 className="text-center mb-3"><b>{isEditable ? 'Update Here' : 'Upload Here'}  </b></h3>

              <div className="input-group mt-3">
              <span className="input-group-text">Author Name</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} aria-label="Author Name" className="form-control" />
              </div>
                <select className="form-select mb-3 mt-3"  value={category} onChange={handleOption}>
                  <option value="">Select Category</option>

                {imageCategories.map((data, i) => (
                  <option key={i} value={data}>{data}</option>
                ))}

              </select>
              
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label"></label>
                <input className="form-control"  type="file" id="formFile"  accept="image/*,video/*" onChange={handleFileChange} />
              </div>


              {selectedImg && <img src={selectedImg}  width={200} height={90}/> }
              {selectedVideo && <video src={selectedVideo}  width={200} height={90}/> }
              
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-dark text-center mt-3" onClick={() => setModal(false)}>←  Close</button>
                <button type="submit" className="btn btn-dark text-center mt-3" disabled={isLoading}>
                            {isLoading && (
                              <>
                                <span className="spinner-border spinner-border-sm mx-2" aria-hidden="true"></span>
                              </>
                            )}
                          {isEditable ? 'Update':'Upload'}
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}


 

{imgModal && (
  <div className='viewImg' onClick={() => setImgModal(false)}>
    <div className='viewImg-content' onClick={(e) => e.stopPropagation()}>
      {selectedImg && <img src={selectedImg} alt="" className="modal-img" />}
      
      {selectedVideo && (
        <video
          src={selectedVideo}
          autoPlay
          muted
          loop
          controls
          className="modal-video"
        />
      )}
    </div>
  </div>
)}


    </>
  );
}

export default AdminPage;
