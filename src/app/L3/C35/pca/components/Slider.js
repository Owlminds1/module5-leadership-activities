'use client'

import './style.css'

export default function Slider() {
    const data = [
        { col1: "", col2: "", col3: "", col4: '' },
        { col1: "", col2: "", col3: "", col4: '' },
        { col1: "", col2: "", col3: "", col4: '' },
        { col1: "", col2: "", col3: "", col4: '' }
    ];

    return (
        <div className='slidesMainContainer px-10 mt-[6px] space-y-8'>
            
            {/* Instructions Section */}
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg shadow-sm text-left">
                <h2 className="text-2xl font-bold text-green-800 mb-4 ">
                    Are you ready to go on a nature adventure as an inventor?
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                    Your job is to observe the world around you and find natural things to inspire cool inventions. 
                    Observe how creatures move and plants grow. Notice how things are shaped. 
                    Nature is full of smart ideas!
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    Create a table in your notebook to fill it up with your observations and invention ideas.
                </p>

                <h3 className="font-semibold text-lg text-green-700 mb-2">Instructions:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Go for a Walk:</strong> Observe around your garden, balcony, park, or even out your window. Pay attention to:
                        <ul className="list-disc list-inside ml-6">
                            <li>Creatures and how they move</li>
                            <li>Shapes of leaves, wings, shells, etc.</li>
                            <li>How plants grow or protect themselves</li>
                            <li>How insects build homes or carry things</li>
                        </ul>
                    </li>
                    <li><strong>Use Notes or Draw:</strong> Use a notebook or piece of paper to jot down what you see. You can even draw it!</li>
                    <li><strong>Think like an Inventor:</strong> Ask yourself:
                        <ul className="list-disc list-inside ml-6">
                            <li>What’s clever or interesting about this?</li>
                            <li>How can I use this idea to solve a problem people face?</li>
                        </ul>
                    </li>
                    <li><strong>Fill in the Table</strong></li>
                </ul>
            </div>

            {/* Table Section */}
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-3 text-left">Object in Nature</th>
                                <th className="border border-gray-300 p-3 text-left">What’s Inspiring About It?</th>
                                <th className="border border-gray-300 p-3 text-left">Your Invention</th>
                                <th className="border border-gray-300 p-3 text-left">What Problem Does It Solve?</th>
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
