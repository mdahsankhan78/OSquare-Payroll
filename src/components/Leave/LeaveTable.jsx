import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GetAttendanceRecord from "../../api/GetAttendanceRecord";
import { useEffect, useState } from "react";
import Spinner from './../ui/Spinner'
import { Badge } from './../ui/badge'
import { Button } from "../ui/button";

const getDaysInRange = (startDate, endDate) => {
    const days = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
};

const getMonthsFromDays = (days) => {
    const months = new Set();
    days.forEach((day) => {
        const month = day.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
        months.add(month);
    });
    return Array.from(months);
};

export function LeaveTable() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedEmployees = location.state;
    const employeeIds = selectedEmployees.map(employee => employee.id);
    const [Employees, setEmployees] = useState()
    const [filteredDays, setFilteredDays] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const startDate = localStorage.getItem('startDate')
    const endDate = localStorage.getItem('endDate')
    const daysInRange = getDaysInRange(startDate, endDate);
    const months = getMonthsFromDays(daysInRange);
    const payrollMasterId = localStorage.getItem('payrollId');
    const totalDays = localStorage.getItem('totalDays');

    const handleFetch = (data) => {
        setEmployees(data)
    }

    useEffect(() => {
        if (selectedMonth) {
            const filtered = daysInRange.filter((day) =>
                day.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) === selectedMonth
            );
            const validFilteredDays = filtered.filter((day) => {
                const formattedDate = day.toISOString().split('T')[0];
                return Employees?.some(employee => employee.attendanceRecords[formattedDate]);
            });
            setFilteredDays(validFilteredDays);
        } else {
            const validFilteredDays = daysInRange.filter((day) => {
                const formattedDate = day.toISOString().split('T')[0];
                return Employees?.some(employee => employee.attendanceRecords[formattedDate]);
            });
            setFilteredDays(validFilteredDays);
        }
    }, [selectedMonth, Employees]);

    // Calculate salary and update selectedEmployees with formattedSalary
    const updatedEmployees = Employees ? Employees.map((employee, index) => {
        const absentDays = filteredDays.filter((day) => {
            const formattedDate = day.toISOString().split('T')[0];
            const attendance = employee.attendanceRecords[formattedDate];
            return attendance === 'A';
        }).length;

        const totalSalary = (selectedEmployees[index].perDaySalary * totalDays) - (absentDays * selectedEmployees[index].perDaySalary);
        const formattedSalary = Number.isInteger(totalSalary) ? totalSalary : totalSalary.toFixed(1);

        // Add the formattedSalary to the employee object
        return {
            ...selectedEmployees[index],
            formattedSalary,
        };
    }) : [];
    
    const handleNext = () => {
        navigate('/payroll/extras', { state: updatedEmployees });
    }

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between gap-y-2">
                <h1 className='text-gray-600 text-3xl'>Employees Leaves/Absent</h1>

                <Button
                    onClick={handleNext}
                    className='bg-primary text-white px-6 rounded-lg py-2 hover:text-white'>
                    Next
                </Button>
            </div>
            <div className="my-4">
                {months.length > 1 && (
                    <select
                        className="border p-2 px-4 focus:outline-none rounded"
                        onChange={handleMonthChange}
                        value={selectedMonth}
                    >
                        <option value="">All Months</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <GetAttendanceRecord onDataFetched={handleFetch} payrollMasterId={payrollMasterId} employeeIds={employeeIds} />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='sticky left-0 bg-card '>EMPLOYEE</TableHead>
                        {filteredDays &&
                            filteredDays.map((day, index) => (
                                <TableHead key={index} className="whitespace-nowrap">
                                    {day.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </TableHead>
                            ))}
                        <TableHead>Summary</TableHead>
                        <TableHead>Total salary</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Employees ? Employees.map((employee, index) => {

                        // Calculate the number of present days
                        const absentDays = filteredDays.filter((day) => {
                            const formattedDate = day.toISOString().split('T')[0];
                            const attendance = employee.attendanceRecords[formattedDate];
                            return attendance === 'A';
                        }).length;

                        const presentsDays = filteredDays.filter((day) => {
                            const formattedDate = day.toISOString().split('T')[0];
                            const attendance = employee.attendanceRecords[formattedDate];
                            return attendance === 'P';
                        }).length;

                        const leaveDays = filteredDays.filter((day) => {
                            const formattedDate = day.toISOString().split('T')[0];
                            const attendance = employee.attendanceRecords[formattedDate];
                            return attendance === 'L';
                        }).length;

                        const presentDays = filteredDays.filter((day) => {
                            const formattedDate = day.toISOString().split('T')[0];
                            const attendance = employee.attendanceRecords[formattedDate];
                            return attendance != 'A';
                        }).length;

                        const absentAmount = absentDays * selectedEmployees[index].perDaySalary
                        const totalSalary = (selectedEmployees[index].perDaySalary * totalDays) - absentAmount;
                        const formattedSalary = Number.isInteger(totalSalary) ? totalSalary : totalSalary.toFixed(1);

                        return (
                            <TableRow key={employee.employeeId}>
                                <TableCell className='sticky left-0 bg-background'>{selectedEmployees[index].name}</TableCell>
                                {filteredDays.map((day, dayIndex) => {
                                    const formattedDate = day.toISOString().split('T')[0];

                                    const attendance = employee.attendanceRecords[formattedDate] || "-";

                                    return (
                                        <TableCell key={dayIndex} className="whitespace-nowrap text-white">
                                            <Badge className={`text-white pointer-events-none ${attendance === 'A'
                                                ? 'bg-red-500'
                                                : attendance === 'P'
                                                    ? 'bg-green-500'
                                                    : attendance === 'L'
                                                        ? 'bg-blue-500'
                                                        : 'bg-gray-500' // Default color
                                                }`}>
                                                {attendance}
                                            </Badge>
                                        </TableCell>
                                    );
                                })}
                                <TableCell className='whitespace-nowrap'>
                                    <span className="text-green-500">{presentsDays}P</span> + <span className="text-red-500">{absentDays}A</span> + <span className="text-blue-500">{leaveDays}L</span>
                                </TableCell>
                                <TableCell>
                                    {formattedSalary}
                                </TableCell>
                            </TableRow>
                        )
                    })
                        :
                        <TableRow>
                            <TableCell className='sticky left-0 bg-background'><Spinner /></TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </>
    );
}