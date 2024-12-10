import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrls } from './apiurls';

const GetAttendanceRecord = ({ onDataFetched, startDate, endDate, employeeIds }) => {
    const getEmployeeAttendanceUrl = apiUrls.getEmployeeAttendance;
    const getEmployeeAttendanceUrl2 = apiUrls.getEmployeeAttendance2;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${getEmployeeAttendanceUrl}${startDate}${getEmployeeAttendanceUrl2}${endDate}`, employeeIds);
                onDataFetched(response.data.result);

            } catch (err) {
                console.error('Error fetching Attendance Record:', err);
            }
        };

        fetchData();


    }, [getEmployeeAttendanceUrl, getEmployeeAttendanceUrl2]);

    return null;
};

export default GetAttendanceRecord;
