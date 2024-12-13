import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bell, Moon } from 'lucide-react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
}
  from "@/components/ui/dropdown-menu"
import { Dropdown } from './Header/Dropdown'
import { Link } from 'react-router-dom'
import { ThemeToggler } from './ui/ThemeToggler'
import { useTheme } from './theme-provider'


const Header = () => {
  const { theme } = useTheme();
  return (
    <div className="flex justify-between h-20 py-4 px-8">
      <div className="flex items-center sm:flex hidden'">
        <ThemeToggler />
      </div>
      <Link to={'/'}>
        {theme === 'dark' ?
          <img src="/images/osquare-white.png" className='h-12' alt="" />
          :
          <img src="/images/osquare-dark.png" className='h-12' alt="" />
          }
      </Link>

      <div className="flex items-center space-x-3">
        <div className='text-end sm:block hidden'>
          <h4 className='font-semibold'>Tahir Aziz</h4>
          <p className='text-sm'>Admin</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img src="/images/dp.png" className='rounded-full h-12 w-12' alt="" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <Dropdown />
          </DropdownMenuContent>

        </DropdownMenu>

        <Bell className='sm:block hidden' />
      </div>
    </div>
  )
}

export default Header