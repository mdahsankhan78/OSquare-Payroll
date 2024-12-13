import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrls } from './apiurls';

const GetAttendanceRecord = ({ onDataFetched, payrollMasterId, employeeIds }) => {
    const getEmployeeAttendanceUrl = apiUrls.getEmployeeReports;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${getEmployeeAttendanceUrl}${payrollMasterId}`, employeeIds);
                onDataFetched(response.data.result);
                console.log(response);
                

            } catch (err) {
                console.error('Error fetching Attendance Record:', err);
            }
        };

        fetchData();


    }, [getEmployeeAttendanceUrl]);

    return null;
};

export default GetAttendanceRecord;
