import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Hero from '../Component/Hero';
import Feature from '../Component/Feature';
import Testimony from '../Component/Testimony';
import Download from '../Component/Download';
import Footer from '../Component/Footer';
function Home() {
  return (
    <div className='container-fluid p-0 bg-white'>
        <Hero />
        <Feature />
       <Testimony />
       <Download />
      <Footer />
    </div>
  )
}

export default Home