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
        <div className='slidesMainContainer'>
            {/* Instructions */}
            <div className="mb-3 text-left bg-yellow-50 border border-yellow-300 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-yellow-800 mb-2">Instructions</h2>
                <ul className="list-disc pl-5 text-[18px] space-y-2 text-gray-700">
                    <li>Find at least <strong>5 small problems</strong> that you notice around you.</li>
                    <li>These can be things like a loose door handle, a messy drawer, intertwined headphones, or something else that can be better.</li>
                    <li>For each problem:
                        <ul className="list-disc pl-6 mt-1 space-y-1">
                            <li>Think of two different ways to resolve it.</li>
                            <li>Decide which solution you think is best and explain why.</li>
                        </ul>
                    </li>
                    <li>Create a table similar to the one below in your notebook and record all your findings.</li>
                </ul>
            </div>

            {/* Table */}
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-3 text-left">Problem</th>
                                <th className="border border-gray-300 p-3 text-left">Solution 1</th>
                                <th className="border border-gray-300 p-3 text-left">Solution 2</th>
                                <th className="border border-gray-300 p-3 text-left">Best Solution & Why</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr
                                    key={index}
                                    className="trx border border-gray-300 odd:bg-gray-100 even:bg-white"
                                >
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
