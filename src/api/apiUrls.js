const baseUrl = 'http://192.168.18.116:5339/api/';

export const apiUrls = {

    //Payroll Master
    payrollMaster : `${baseUrl}PayrollMaster/Add`,

    //Working Dates
    addWorkingDatesRange : `${baseUrl}WorkingDates/AddRange`,

    //Employees
    getEmployees : `${baseUrl}Employee`,

    //Leaves
    getEmployeeLeaves : `${baseUrl}Employee`,

    //Employees
    getEmployeeAttendance : `${baseUrl}Employee/GetAttendanceRecord?startDate=`,
    getEmployeeAttendance2 : `&endDate=`,

    //Employees
    getEmployeeSalaries : `${baseUrl}Employee`,

    //GetEMployee Reports
    getEmployeeReports : `${baseUrl}Employee/GetReport?PayRollMasterId=`


}