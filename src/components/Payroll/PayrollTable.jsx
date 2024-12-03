import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { payrolls } from '../../../data/payrolls'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons"


export function PayrollTable() {
    return (
        <Table className='my-10'>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Station</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead >To</TableHead>
                    <TableHead >Status</TableHead>
                    <TableHead >actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {payrolls.map((payroll) => (
                    <TableRow key={payroll.payroll}>
                        <TableCell className="font-bold ">{payroll.id}</TableCell>
                        <TableCell>{payroll.station}</TableCell>
                        <TableCell>{payroll.from}</TableCell>
                        <TableCell >{payroll.to}</TableCell>
                        <TableCell >{payroll.status === 'Paid' ?
                            <span className="text-green-500">{payroll.status}</span> 
                            : <span className="text-gray-400">{payroll.status}</span> }</TableCell>
                        <TableCell className='flex items-center text-gray-500 space-x-4'><FontAwesomeIcon icon={faEye} /><FontAwesomeIcon icon={faPencil} /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
