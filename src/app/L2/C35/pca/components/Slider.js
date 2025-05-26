'use client'

import './style.css'


export default function Slider() {
    const data = [
        {
            col1: "",
            col2: "",
            col3: "",
            col4: '',
        },
        {
            col1: "",
            col2: "",
            col3: "",
            col4: '',
        },
        {
            col1: "",
            col2: "",
            col3: "",
            col4: '',
        },
        {
            col1: "",
            col2: "",
            col3: "",
            col4: '',
        }
    ];
    return (
        <div className='slidesMainContainer p-10'>
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-3 text-left">Problem at Home</th>
                                <th className="border border-gray-300 p-3 text-left">Solution 1</th>
                                <th className="border border-gray-300 p-3 text-left">Solution 2</th>
                                <th className="border border-gray-300 p-3 text-left">Best Solution & Why</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="trx border border-gray-300 odd:bg-gray-100 even:bg-white">
                                    <td className="border border-gray-300 p-3">{row.col1}</td>
                                    <td className="border border-gray-300 p-3">{row.col2}</td>
                                    <td className="border border-gray-300 p-3">{row.col3}</td>
                                    <td className="border border-gray-300 p-3">{row.col4}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
