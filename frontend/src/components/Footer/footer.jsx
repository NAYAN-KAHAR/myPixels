

const Footer = () => {
    return(
        <>

        <section className="py-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.01)'}}>

        <footer className="bg-body-dark text-center text-md-start">
        <div className="container p-4">
    
      <div className="row">
  
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h3 className="tex-dark"><b>Where stories come together.</b></h3>
        </div>


 
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-muted">Mypixels</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="#!" className="text-body">Link 1</a>
            </li>
         
           
          </ul>
        </div>
     
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="mb-0 text-muted">Free Stock Photos</h5>

          <ul className="list-unstyled mt-2">
            <li>
              <a href="#!" className="text-body ">Link 1</a>
            </li>
          
           
          </ul>
        </div>
       
      </div>

    </div>

    <div className="text-center p-3">
      © 2020 Copyright :
      <a className="text-body" href=""> MyPixels.com</a>
    </div>
   
  </footer>

</section>
        
        </>
    )
}


export default Footer;