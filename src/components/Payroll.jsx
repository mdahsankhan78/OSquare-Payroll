import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { format } from "date-fns";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from './ui/button';
import axios from 'axios';
import { apiUrls } from '../api/apiurls';

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
    const [WorkingDates, setWorkingDates] = useState([]);
    const apiUrl = apiUrls.addWorkingDatesRange;
    const location = useLocation();
    const payrollData = location.state;
    const payrollMasterId = localStorage.getItem('payrollId');
    const navigate = useNavigate();

    // Extract from and to dates from payrollData
    const { startDate, endDate } = payrollData;

    // Get all days in the range
    const daysInRange = getDaysInRange(startDate, endDate);

    const [checkboxState, setCheckboxState] = useState(
        daysInRange.map(date => getDayName(date) !== "Sunday")
    );


    useEffect(() => {
        const initialWorkingDates = daysInRange.reduce((acc, date, index) => {
            const formattedDate = date.toISOString();
            if (checkboxState[index] && getDayName(date) !== "Sunday") {
                acc.push({ date: formattedDate, payrollMasterId });
            }
            return acc;
        }, []);
        setWorkingDates(initialWorkingDates);
    }, []);

    const handleCheckboxChange = (index) => {
        const newCheckboxState = [...checkboxState];
        newCheckboxState[index] = !newCheckboxState[index];
        setCheckboxState(newCheckboxState);

        const updatedWorkingDates = [...WorkingDates];
        const date = daysInRange[index].toISOString();

        if (newCheckboxState[index]) {
            // Add the date only if it's not Sunday
            updatedWorkingDates.push({
                Date: date,
                PayrollMasterId: payrollMasterId,
            });
        } else {
            // Remove the date if unchecked
            const dateIndex = updatedWorkingDates.findIndex(item => item.date === date);
            if (dateIndex !== -1) {
                updatedWorkingDates.splice(dateIndex, 1);
            }
        }
        setWorkingDates(updatedWorkingDates);
    };


    // Calculate totals
    const totalDays = checkboxState.filter((checked, index) => checked).length;
    const totalWorkingDays = checkboxState.filter(
        (checked, index) => checked && getDayName(daysInRange[index]) !== "Sunday"
    ).length;
    const totalHours = totalDays * 8; // 8 hours per working day

    const AddWorkingDates = async (e) => {
        e.preventDefault();
        await axios.post(apiUrl, WorkingDates)
            .then(res => {
                console.log(res)
                navigate('/payroll/employees');
                localStorage.setItem('totalDays',totalDays);
                localStorage.setItem('totalWorkingDays',totalWorkingDays);
                localStorage.setItem('totalHours',totalHours);
            })
            .catch(err => console.log(err))
    }
    
    console.log(totalWorkingDays, totalDays, totalHours);
    

    return (
        <form onSubmit={AddWorkingDates} className='p-10'>
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
                    <hr className='my-4' />
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
                        <Button to={'/'} className='bg-transparent border border-primary text-primary px-4 rounded-lg py-2 hover:text-primary'>Cancel</Button>
                        <Button type='submit' className='bg-primary text-white px-4 rounded-lg py-2 hover:text-white'>Proceed</Button>
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
        </form>
    )
}

export default Payroll;
