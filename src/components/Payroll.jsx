import React from 'react'
import { Button } from './ui/button'
import { PayrollTable } from './Payroll/PayrollTable'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog"
import Form from './Payroll/Form'

const Payroll = () => {
    return (
        <div className='p-10 '>
            <div className="flex justify-between">
                <h1 className='text-gray-600 text-3xl '>Payroll History</h1>

                <Dialog>
                    <DialogTrigger>
                        <Button className='text-white'>Initiate Payroll</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <Form/>
                    </DialogContent>
                </Dialog>
            </div>

            <PayrollTable />
        </div>
    )
}

export default Payroll