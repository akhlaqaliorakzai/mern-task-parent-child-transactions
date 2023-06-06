import React from 'react'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className='mt-5 ps-5 mb-3 ms-2 fs-5'>
      <Link to = "/" className='text-decoration-none bg-primary text-white ps-3 pe-3 pt-2 pb-2 rounded'>Home</Link>
    </div>
  )
}
