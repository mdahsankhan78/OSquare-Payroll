import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { employees as employeeData } from '../../../data/employees';
import { useState } from "react";
import { Link } from "react-router-dom";

export function EmployeeTable() {
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    // Handle checkbox toggle
    const handleCheckboxChange = (employeeId) => {
        setSelectedEmployees(prevSelected => {
            if (prevSelected.includes(employeeId)) {
                return prevSelected.filter(id => id !== employeeId);
            } else {
                return [...prevSelected, employeeId];
            }
        });
    };

    return (
        <>
            <div className="flex justify-between">
                <h1 className='text-gray-600 text-3xl '>Select Employees</h1>

                <Link
                    to={`/payroll/leaves/${selectedEmployees}`}
                    className='bg-primary text-white px-6 rounded-lg py-2 hover:text-white'
                    type="submit">
                    Next
                </Link>
            </div>
            <Table className='my-10'>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>EMP ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Designation</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employeeData.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell className='flex justify-center'>
                                <input type="checkbox"
                                    className="h-4 w-4 "
                                    checked={selectedEmployees.includes(employee.id)}  
                                    onChange={() => handleCheckboxChange(employee.id)}  
                                />
                            </TableCell>
                            <TableCell className="font-bold">{employee.id}</TableCell>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>{employee.designation}</TableCell>
                        </TableRow>
                    ))}
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
