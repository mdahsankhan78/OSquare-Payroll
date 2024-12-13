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
    <div className="py-4 flex space-x-2 bg-card px-8 overflow-x-auto navbarScroll">
      {links.map((link) => (
        <Link
          to={link.url}
          className={`px-4 py-2 font-normal rounded  ${location.pathname.startsWith(link.url) ? 'shadow-md shadow-primary-foreground dark:shadow-none bg-gradient-to-r from-primary to-primary-foreground text-white hover:text-white' : 'text-accent hover:text-accent'
            }`}
        >
          {link.name}
        </Link>
      ))}
      <style jsx>
        {`
        .navbarScroll::-webkit-scrollbar {
          background-color: transparent;
        }

        .navbarScroll::-webkit-scrollbar-thumb {
          background-color: transparent;
        }
        `}
      </style>
    </div>
  )
}

export default Navbar
