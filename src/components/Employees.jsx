import React from 'react'
import { Button } from './ui/button'
import { EmployeeTable } from './Employee/EmployeeTable'
import { Link } from 'react-router-dom'

const Employees = () => {
    return (
        <div className='p-10 '>
            

            <EmployeeTable />
        </div>
    )
}

export default Employees