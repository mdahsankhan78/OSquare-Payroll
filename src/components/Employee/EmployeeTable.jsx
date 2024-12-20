import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GetEmployees from './../../api/GetEmployees'
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";

export function EmployeeTable() {
    const [employees, setEmployees] = useState(null);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const navigate = useNavigate();
    const totalDays = localStorage.getItem('totalDays')

    // Handle checkbox toggle
    const handleCheckboxChange = (employee) => {
        setSelectedEmployees(prevSelected => {
            const isSelected = prevSelected.some(e => e.id === employee.id);
            if (isSelected) {
                return prevSelected.filter(e => e.id !== employee.id);
            } else {
                return [...prevSelected, { id: employee.id, name: employee.name }];
            }
        });
    };

    const handleFetch = (data) => {
        setEmployees(data);
        //setting all employees by default checked
        setSelectedEmployees(data.map(employee => ({
            id: employee.id,
            name: employee.name,
            perDaySalary: (employee.cost / totalDays).toFixed(2), // Calculating perDaySalary
        })));
    }

    const handleNext = () => {
        navigate('/payroll/leaves', { state: selectedEmployees });
    }
    
    return (
        <>
            <GetEmployees onDataFetched={handleFetch} />
            <div className="flex justify-between">
                <h1 className='text-gray-600 text-3xl '>Select Employees</h1>
                <Button
                    onClick={handleNext}
                    className='bg-primary text-white px-6 rounded-lg py-2 hover:text-white'
                    type="submit"
                    disabled={selectedEmployees.length === 0}>
                    Next
                </Button>
            </div>
            <Table className='my-10'>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>EMP ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Basic Salary</TableHead>
                        <TableHead>Salary per Day</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees ? employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell className='flex justify-center'>
                                <input type="checkbox"
                                    className="h-4 w-4 "
                                    checked={selectedEmployees.some(e => e.id === employee.id)}
                                    onChange={() => handleCheckboxChange(employee)}
                                />
                            </TableCell>
                            <TableCell className="font-bold">{employee.id}</TableCell>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.cost}</TableCell>
                            <TableCell>{(employee.cost / totalDays).toFixed(2)}</TableCell>
                        </TableRow>

                    ))
                        :
                        <TableRow> 
                            <TableCell colspan='3'><Spinner /></TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
            <style jsx>
                {`
                input[type="checkbox"]:checked {
                    accent-color: hsl(var(--primary))
                }
                `}
            </style>
        </>
    );
}
