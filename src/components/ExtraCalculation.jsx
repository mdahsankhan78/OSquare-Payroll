import React from 'react'
import CalculationsTable from './ExtraCalculations/CalculationsTable'

const ExtraCalculation = () => {
    return (
        <>
            <div className='p-10 '>
                <div className="flex justify-between">
                    <h1 className='text-accent text-3xl '>Incentive or Deduction</h1>
                </div>

                <CalculationsTable/>
            </div>
        </>
    )
}

export default ExtraCalculation