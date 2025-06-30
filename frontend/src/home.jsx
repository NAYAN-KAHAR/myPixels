import React, { useState, Suspense } from "react";
import Header from "./components/Header/header";
import HeroSection from "./components/Hero_Section/hero";
// import Gallery from "./components/Gallery/gallery";
import searchParam from './components/queryContext/query';
import Footer from './components/Footer/footer';

const Gallery = React.lazy(() => import("./components/Gallery/gallery"))

const Home = () => {
  const [search, setSearch] =  useState('');
  return (
    <>
     <searchParam.Provider value={{search, setSearch}}>
        <Header />
        <HeroSection/>
        <Suspense fallback={<p className="text-center py-5"><b>Data Loading...</b></p>}>
         <Gallery/>
        </Suspense>
        <Footer />
      </searchParam.Provider>
    </>
  );
};

export default Home;