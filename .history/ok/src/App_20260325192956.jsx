import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroPage from './components/heropage'


import SplitPage from './components/ImageCardWrapper'
import SectorsPage from './components/SectorsPage'
import IndustriesPage from "./pages/IndustriesPage";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



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
       
       <Route path="/contact" element={<Cona}
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App