import React from 'react';
import TableData from './tableData';

interface Props {
    taskData: any;
}

const Table: React.FC<Props> = ({taskData}) => {
    const tableHeaders = Object.keys(taskData[0])

    return (
        <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-hidden my-8">
                <table className='table-auto border-collapse w-full text-sm'>
                    <thead>
                        <tr>
                            {tableHeaders.map((header,index) => (
                                <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center' key={index}>{header.toUpperCase()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='bg-white dark:bg-slate-800'>
                        {taskData.map((data:any, index:any) => (
                            <tr className='hover:bg-slate-100' key={index}>
                                {tableHeaders.map((header,index) => (
                                    <TableData index={index} data={data} header={header}/>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table