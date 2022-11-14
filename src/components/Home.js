import React from 'react'
import EmployeesTable from './EmployeesTable'

function Home() {
    return (
        <div >
            <h1 className='text-center mt-5'>Home Page</h1>
            
            <EmployeesTable></EmployeesTable>
        </div>
    )
}

export default Home