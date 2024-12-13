import React from 'react'
import Card from './Card'

function Feature() {
  return (
    <div className='container-fluid'>
       <div className="container mx-auto">
        <div className="col-md-12 mt-md-5 pt-5 mb-3">
         <h2 className='fw-bold text-center fText'>Why use Robonymous?</h2>
         <p className='text-center fwCard '>Our Anonymous Messaging App comes along with many great features. <br />Here we are going to list some of them. Have a look below.</p>
        </div>
       </div>
       <Card />
    </div>
  )
}

export default Feature