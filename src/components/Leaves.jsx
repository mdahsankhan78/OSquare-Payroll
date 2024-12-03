import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { LeaveTable } from './Leave/LeaveTable'

const Leaves = () => {
    const {selectedEmployees} = useParams();

    const selectedEmployeeIds = selectedEmployees ? selectedEmployees.split(',') : [];
    
    return (
        <div className='p-10 '>
            <div className="flex justify-between">  
                <h1 className='text-gray-600 text-3xl'>Employees Leaves/Absent</h1>

                <Link  className='bg-primary text-white px-6 rounded-lg py-2 hover:text-white' type="submit">Next</Link>
            </div>

            <LeaveTable employeesid={selectedEmployeeIds}/>
        </div>
    )
}

export default Leaves