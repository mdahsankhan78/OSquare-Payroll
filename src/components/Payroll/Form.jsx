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
import { apiUrls } from '../../api/apiurls'
import axios from 'axios'

const Form = () => {
    const [data, setData] = useState({ name: '', station: '', startDate: '', endDate: '' })
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate' || name === 'endDate') {
            setData({ ...data, [name]: new Date(value).toISOString() });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(apiUrls.payrollMaster, data)
            .then(res => {
                console.log(res)
                if (res) {
                    localStorage.setItem('payrollId', res.data.result.id)
                    localStorage.setItem('startDate', data.startDate)
                    localStorage.setItem('endDate', data.endDate)

                }
                navigate('/payroll', { state: data });
            })
            .catch(err => console.log(err));


    };

    console.log(data);

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
                        name='startDate'
                        onChange={handleInput}
                        type='date'
                        id="startDate"
                        value={data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : ''}
                    />
                </div>
                <div>
                    <Label htmlFor="to">To</Label>
                    <Input
                        required
                        name='endDate'
                        onChange={handleInput}
                        id='to'
                        type='date'
                        value={data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : ''}
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
