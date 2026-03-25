import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroPage from './components/heropage'

import CenteredHeroPage from './components/Center'
import SplitPage from './components/ImageCardWrapper'
import SectorsPage from './components/SectorsPage'
import IndustriesPage from "./pages/IndustriesPage";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TestimonialSlider from "./components/TestimonialSlider";


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={
          
          <>
         
    
      <HeroPage/>
   
  
    <SectorsPage/>
    <SplitPage/>
  
    </>
      } />

      <Route path="/services" element={<IndustriesPage/>}/>
      <Route path="/about" element={<AboutUs/>}/>
       
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App