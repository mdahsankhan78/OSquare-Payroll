import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { employees } from '../../../data/employees';

export function LeaveTable({ employeesid }) {
    // Filter employees based on the provided employeesid
    const filteredEmployees = employees.filter(employee => employeesid.includes(String(employee.id)));

    
    return (
        <Table className='my-10'>
            <TableHeader>
                <TableRow>
                    <TableHead>EMP ID</TableHead>
                    <TableHead>EMPLOYEE</TableHead>
                    <TableHead>Leaves</TableHead>
                    <TableHead>Absents</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                        <TableCell className="font-bold">{employee.id}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.leaves}</TableCell>
                        <TableCell>{employee.absents}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}