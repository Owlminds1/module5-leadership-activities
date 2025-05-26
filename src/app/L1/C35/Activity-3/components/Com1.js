import Image from 'next/image';

export default function Com1(props) {
  const obj = {
    sh1: {
      name: "Super Zappy",
      dis: "Quick, fun-loving, always thinking of exciting ideas."
    },
    sh2: {
      name: "Dr. Brainy",
      dis: "Calm, thoughtful, gets ideas from nature and real life."
    }
  }
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="grid grid-cols-2 gap-10 items-center mb-8">

        <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-pink-600">SuperHero 1 - {obj.sh1.name}</h2>
          <Image src={props.Sh1} alt="sh1" className='w-[300px] rounded-[10px]' />
          <p className="text-gray-700 mt-4 text-[22px]">{obj.sh1.dis}</p>
        </div>

        <div className="flex flex-col items-center  bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-600">SuperHero 2 - {obj.sh2.name}</h2>
          <Image src={props.Sh2} alt="sh2" className='w-[300px] rounded-[10px]' />
          <p className="text-gray-700 mt-4 text-[22px]">{obj.sh2.dis}</p>
        </div>

      </div>
      <button onClick={props.handleStart} className="px-8 py-3 cursor-pointer bg-purple-500 text-white text-lg font-semibold rounded-[20px] shadow hover:bg-purple-600 transition">Start</button>
    </div>
  );


}