import React, { useState } from 'react'
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "./../ui/dialog"
import { Input } from "./../ui/input"
import { Label } from "./../ui/label"
import { Button } from "./../ui/button"
import { Link, useNavigate } from 'react-router-dom'

const Form = () => {
    const [data, setData] = useState({ name: '', station: '', from: '', to: '' })
    const navigate = useNavigate();

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        navigate('/payroll', { state: data });
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>Initiate Payroll</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-y-2 px-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        required
                        name='name'
                        onChange={handleInput}
                        id="name"
                        placeholder='Enter name'
                        value={data.name}
                    />
                </div>
                <div>
                    <Label htmlFor="station">Station</Label>
                    <Input
                        required
                        name='station'
                        onChange={handleInput}
                        id="station"
                        placeholder='Select Station'
                        value={data.station}
                    />
                </div>
                <div>
                    <Label htmlFor="from">From</Label>
                    <Input
                        required
                        name='from'
                        onChange={handleInput}
                        type='date'
                        id="from"
                        value={data.from}
                    />
                </div>
                <div>
                    <Label htmlFor="to">To</Label>
                    <Input
                        required
                        name='to'
                        onChange={handleInput}
                        id='to'
                        type='date'
                        value={data.to}
                    />
                </div>
            </div>
            <hr className='my-4' />
            <DialogFooter>
                <Button type="submit" className='bg-primary text-white px-6 rounded-lg py-2 hover:text-white'>
                    Next
                </Button>
            </DialogFooter>
        </form>
    )
}

export default Form
