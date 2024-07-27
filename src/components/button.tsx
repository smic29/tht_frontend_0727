import React from 'react';
import { mkConfig, generateCsv, download } from 'export-to-csv';

interface ButtonProps {
    text: string
    onClick?: () => void
    data?: any
}

const Button: React.FC<ButtonProps> = ({text, onClick = null, data = null}) => {
    if (onClick) return (
        <button onClick={onClick} className='bg-blue-500 text-white font-bold py-2 px-4 mx-2 rounded hover:bg-blue-700 transition duration-200'>{text}</button>
    )

    if (text === 'JSON') return (
        <a className='bg-blue-500 text-white font-bold py-2 px-4 mx-2 rounded hover:bg-blue-700 transition duration-200'
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
           )}`}
        download="file.json">Download JSON</a>
    )

    if (text === 'CSV') {
        const csvConfig = mkConfig({ useKeysAsHeaders: true })

        const csv = generateCsv(csvConfig)(data)

        const downloadCsv = () => {
            download(csvConfig)(csv)
        }

        return (
            <button onClick={downloadCsv}
                    className='bg-blue-500 text-white font-bold py-2 px-4 mx-2 rounded hover:bg-blue-700 transition duration-200'
            >
                Download CSV
            </button>
        )
    }
}

export default Button