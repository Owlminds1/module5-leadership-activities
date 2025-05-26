'use client'

const places = [
  'Garden',
  '__________',
  '__________',
  '__________',
  '__________'
]

export default function LeaderDetectiveTableStatic() {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-blue-50 rounded-3xl shadow-lg border border-blue-200">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">Leader Lookout Log</h1>
      <p className="text-lg text-center text-gray-700 mb-8">
        Look around these places and think about the leaders. Fill in each blank thoughtfully!
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-xl overflow-hidden text-left">
          <thead className="bg-blue-100 text-blue-800 font-semibold">
            <tr>
              <th className="px-4 py-3 border-r border-gray-300">Place</th>
              <th className="px-4 py-3 border-r border-gray-300">Who could be the leader?</th>
              <th className="px-4 py-3">What makes them a good leader?</th>
              <th className="px-4 py-3 border-r border-gray-300">Qualities they should have</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place, index) => (
              <tr key={index} className="border-t border-gray-200 text-gray-700 font-medium">
                <td className="px-4 py-3">{place}</td>
                <td className="px-4 py-3">__________</td>
                <td className="px-4 py-3">__________</td>
                <td className="px-4 py-3">__________</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
