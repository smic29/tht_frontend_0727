import React from 'react';

interface TableDataProps {
    index: number
    data: any
    header: string
}

interface CheckboxProps {
    checked: boolean
}

const TableData: React.FC<TableDataProps> = ({index, data, header}) => {
    return (
        <td className='border-b border-slate-100 dark:border-slate-700 p-1 pl-8 text-slate-500 dark:text-slate-400' key={index}>
            {header==='kidFriendly' ? <Checkbox checked={data[header]} /> : data[header]}
        </td>
    )
}

const Checkbox: React.FC<CheckboxProps> = ({checked}) => {
    if (checked) return ( <input type="checkbox" checked disabled name="kidFriendly" />)
    
    return <input type="checkbox" disabled name="kidFriendly" />
}

export default TableData