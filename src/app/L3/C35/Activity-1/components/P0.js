export default function P0(props) {

    return (
        <div className="p-6">
            <video
                className="w-[100%] rounded-lg"
                controls
                src="/assets/L1-C25/Additional-Activity-1/v1.mp4"
            ></video>
            <br />
            <button
                onClick={props.handleNext}
                className="cursor-pointer px-4 py-2 bg-green-500 text-white w-[200px] rounded-md shadow-md hover:bg-green-600 transition"
            >
                Start
            </button>

        </div>
    );
}
