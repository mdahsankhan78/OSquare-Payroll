import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();  
  const links = [
    {
      name: 'Employees',
      url: '/employees'
    },
    {
      name: 'Attendance',
      url: '/attendance'
    },
    {
      name: 'Payroll',
      url: '/'
    },
    {
      name: 'Forms',
      url: '/forms'
    },
  ]

  return (
    <div className="py-4 flex space-x-2 bg-white px-8">
      {links.map((link) => (
        <Link
          to={link.url}
          className={`px-4 py-2 font-normal rounded  ${
            location.pathname.startsWith(link.url) ? 'shadow-md shadow-primary-foreground bg-gradient-to-r from-primary to-primary-foreground text-white hover:text-white' : 'text-black hover:text-black'
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default Navbar
