import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useLocation } from "react-router-dom";
import GetAttendanceRecord from "../../api/GetAttendanceRecord";
import { useState } from "react";
import Spinner from './../ui/Spinner' 

export function LeaveTable() {
    const location = useLocation();
    const selectedEmployees = location.state;
    const employeeIds = selectedEmployees.map(employee => employee.id);
    const [Employees, setEmployees] = useState()
    const startDate = localStorage.getItem('startDate')
    const endDate = localStorage.getItem('endDate')

    const handleFetch = (data) => {
        setEmployees(data)
    }
    
    return (
        <>
            <GetAttendanceRecord onDataFetched={handleFetch} startDate={startDate} endDate={endDate} employeeIds={employeeIds}/>
            <Table className='my-10'>
                <TableHeader>
                    <TableRow>
                        <TableHead>EMPLOYEE</TableHead>
                        <TableHead>Total Working Hours</TableHead>
                        <TableHead>Employee Working Hours</TableHead>
                        <TableHead>Total Days</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Absent</TableHead>
                        <TableHead>Leaves</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Employees ? Employees.map((employee, index) => (
                        <TableRow key={employee.employeeId}>
                            <TableCell>{selectedEmployees[index].name}</TableCell>
                            <TableCell>{employee.totalWorkingHours}</TableCell>
                            <TableCell>{employee.workingHours}</TableCell>
                            <TableCell>{employee.totalDays}</TableCell>
                            <TableCell>{employee.present}</TableCell>
                            <TableCell>{employee.absent}</TableCell>
                            <TableCell>{employee.leaves}</TableCell>
                        </TableRow>
                    ))
                    :
                    <TableRow>
                        <TableCell colspan='7'><Spinner/></TableCell>
                    </TableRow>
                    }
                </TableBody>
            </Table>
        </>
    );
}