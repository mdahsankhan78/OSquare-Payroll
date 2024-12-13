import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrls } from './apiurls';

const GetEmployees = ({ onDataFetched }) => {
    const getEmployeesUrl = apiUrls.getEmployees;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(getEmployeesUrl);
                onDataFetched(response.data.result);

            } catch (err) {
                console.error('Error fetching Employees data:', err);
            }
        };

        fetchData();


    }, [getEmployeesUrl]);

    return null;
};

export default GetEmployees;
