import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useLocation } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./../ui/dialog";
import { Plus, PlusCircleIcon } from 'lucide-react';
import { Input } from './../ui/input';
import { Button } from '../ui/button';

const CalculationsTable = () => {
    const location = useLocation();
    const updatedEmployees = location.state;
    const [employeeIncentives, setEmployeeIncentives] = useState({});

    useEffect(() => {
        const initialIncentives = updatedEmployees.reduce((acc, employee) => {
            acc[employee.id] = [{ a: "", b: "", type: "" }];
            return acc;
        }, {});
        setEmployeeIncentives(initialIncentives);
    }, [updatedEmployees]);

    const handleIncentive = (e, index, employeeId) => {
        const { name, value } = e.target;
        const updatedIncentives = { ...employeeIncentives };
        if (!updatedIncentives[employeeId]) {
            updatedIncentives[employeeId] = [{ a: "", b: "", type: "" }];
        }
        updatedIncentives[employeeId][index] = {
            ...updatedIncentives[employeeId][index],
            [name]: value,
        };
        setEmployeeIncentives(updatedIncentives);
    };

    const addNewForm = (employeeId) => {
        const updatedIncentives = { ...employeeIncentives };
        if (!updatedIncentives[employeeId]) {
            updatedIncentives[employeeId] = [{ a: "", b: "", type: "" }];
        } else {
            updatedIncentives[employeeId].push({ a: "", b: "", type: "" });
        }
        setEmployeeIncentives(updatedIncentives);
    };

    const deleteForm = (index, employeeId) => {
        const updatedIncentives = { ...employeeIncentives };
        updatedIncentives[employeeId] = updatedIncentives[employeeId].filter(
            (_, idx) => idx !== index
        );
        setEmployeeIncentives(updatedIncentives);
    };

    return (
        <>
            <Table className='my-2'>
                <TableHeader>
                    <TableRow>
                        <TableHead>EMPLOYEE</TableHead>
                        <TableHead className='text-center'>Total salary</TableHead>
                        <TableHead className='text-center' colSpan={2}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {updatedEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell className='text-center'>{employee.formattedSalary}</TableCell>
                            <TableCell className='justify-items-center'>
                                <Dialog>
                                    <DialogTrigger className='focus:outline-none'>
                                        <Plus className='text-green-500' />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <div className="px-6 py-4">
                                            <h3>Add Incentive</h3>
                                            <hr className='my-4 border-input' />
                                            <div className="overflow-y-auto max-h-[50vh] flex flex-col gap-y-4">
                                                {(employeeIncentives[employee.id] || []).map((form, idx) => (
                                                    <form key={idx} className='flex flex-col gap-y-4'>
                                                        <div className={`${employeeIncentives[employee.id].length > 1 ? 'block' : 'hidden'} flex justify-between items-center`}>
                                                            <h4>Incentive {idx + 1}</h4>
                                                            {idx !== 0 && (
                                                                <button
                                                                    className='focus:outline-none'
                                                                    onClick={() => deleteForm(idx, employee.id)}
                                                                >
                                                                    <Plus className='h-4 rotate-45 mr-1' />
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-x-2">

                                                            <Input
                                                                placeholder='Enter'
                                                                name='a'
                                                                value={form.a}
                                                                onChange={(e) => handleIncentive(e, idx, employee.id)}
                                                            />
                                                            <Input
                                                                placeholder='Enter'
                                                                name='b'
                                                                value={form.b}
                                                                onChange={(e) => handleIncentive(e, idx, employee.id)}
                                                            />
                                                            <select
                                                                className='flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                                                                name='type'
                                                                value={form.type}
                                                                onChange={(e) => handleIncentive(e, idx, employee.id)}
                                                            >
                                                                <option value="" selected disabled>Incentive type</option>
                                                                <option value="apple">apple</option>
                                                                <option value="banana">banana</option>
                                                                <option value="grapes">grapes</option>
                                                            </select>
                                                        </div>
                                                    </form>
                                                ))}
                                            </div>
                                            <div className="justify-center flex mt-4">
                                                <button
                                                    className='focus:outline-none'
                                                    onClick={() => addNewForm(employee.id)}
                                                >
                                                    <PlusCircleIcon className='text-accent' />
                                                </button>
                                            </div>
                                            <hr className='my-4 border-input' />
                                            <div className="flex justify-end">
                                                <Button className='text-white'>Add</Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                            <TableCell className='justify-items-center'>
                                <Plus className='text-red-500 rotate-45' />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default CalculationsTable;
