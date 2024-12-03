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


const Header = () => {
  return (
    <div className="flex justify-between h-20 py-4 px-8">
      <div className="flex items-center">
        <Moon />
      </div>
      <img src="/images/osquare-dark.png" alt="" />

      <div className="flex items-center space-x-3">
        <div className='text-end'>
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

        <Bell />
      </div>
    </div>
  )
}

export default Header