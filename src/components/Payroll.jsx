import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from './ui/button';

// Function to get all days between two dates
const getDaysInRange = (startDate, endDate) => {
    const days = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
};

// Function to format date to DD-MM-YYYY
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const getDayName = (date) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
};

const Payroll = () => {
    const location = useLocation();
    const payrollData = location.state;

    // Extract from and to dates from payrollData
    const { from, to } = payrollData;

    // Get all days in the range
    const daysInRange = getDaysInRange(from, to);

    const [checkboxState, setCheckboxState] = useState(
        daysInRange.map(date => getDayName(date) !== "Sunday")
    );

    // Function to handle checkbox change
    const handleCheckboxChange = (index) => {
        const newCheckboxState = [...checkboxState];
        newCheckboxState[index] = !newCheckboxState[index];
        setCheckboxState(newCheckboxState);
    };

    // Calculate totals
    const totalDays = checkboxState.filter((checked, index) => checked).length;
    const totalWorkingDays = checkboxState.filter(
        (checked, index) => checked && getDayName(daysInRange[index]) !== "Sunday"
    ).length;
    const totalHours = totalDays * 8; // 8 hours per working day

    return (
        <div className='p-10'>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <div className="rounded-lg border h-[60vh] overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Day</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {daysInRange.map((date, index) => (
                                <TableRow key={index}>
                                    <TableCell className='flex justify-center'>
                                        <input type="checkbox" className="h-4 w-4"
                                            checked={checkboxState[index]}
                                            onChange={() => handleCheckboxChange(index)} />
                                    </TableCell>
                                    <TableCell className="font-bold">{getDayName(date)} {getDayName(date) === 'Sunday' ? '(Holiday)' : '(Working Day)'}</TableCell>
                                    <TableCell>{formatDate(date)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="rounded-lg border h-[60vh] p-4 text-accent overflow-y-auto relative">
                    <h1 className='text-3xl'>{payrollData.name}</h1>
                    <h1 className='text-2xl'>{payrollData.station}</h1>
                    <hr className='my-6' />
                    <div className="flex flex-col gap-y-4">
                        <h2 className='flex justify-between items-end'>
                            <span>Total Days</span>
                            <span className='text-3xl'>{totalDays} days</span>
                        </h2>
                        <h2 className='flex justify-between items-end'>
                            <span>Total Working Days (excluding Holidays)</span>
                            <span className='text-3xl'>{totalWorkingDays} days</span>
                        </h2>
                        <h2 className='flex justify-between items-end'>
                            <span>Total Hours (8 hrs per day)</span>
                            <span className='text-3xl'>{totalHours} hrs</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-x-2 justify-end mt-4" >
                        <Link to={'/'} className='bg-transparent border border-primary text-primary px-4 rounded-lg py-2 hover:text-primary'>Cancel</Link>
                        <Link to={'/payroll/employees'} className='bg-primary text-white px-4 rounded-lg py-2 hover:text-white'>Proceed</Link>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                input[type="checkbox"]:checked {
                    accent-color: hsl(var(--primary))
                }
                `}
            </style>
        </div>
    )
}

export default Payroll;
