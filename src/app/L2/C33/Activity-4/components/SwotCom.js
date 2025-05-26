'use client'

import './style.css'

import { useState, useEffect } from "react";

export default function Slider(props) {
    const [currentSolutionObj, setCurrentSolutionObj] = useState([])
    // currentSwotData holds the data of all swot and can be pushed put
    const [currentSwotData, setCurrentSwotData] = useState({})

    const solutionObj = [
        "S : Strengths",
        "W : Weaknesses",
        "O : Opportunities",
        "T : Threats",
    ]

    const nonGeneral = [
        "What sports are you naturally good at? These are the ones you feel confident and perform well in.",
        "What sports do you find difficult or need more practice in?",
        "What sports could you improve in if you put in some extra effort before Sports Day?",
        "What might stop you from doing well or enjoying Sports Day?",
    ];


    const generalQuestions = [
        "What’s good about this idea?",
        "What could be the downside?",
        "What could it lead to later?",
        "What could go wrong?"
    ];

    const borderStyles = [
        'border-red-400 shadow-md shadow-red-200',
        'border-blue-400 shadow-md shadow-blue-200',
        'border-green-400 shadow-md shadow-green-200',
        'border-yellow-400 shadow-md shadow-yellow-200',
    ];


    useEffect(() => {
        setCurrentSolutionObj([])
    }, [props.currentObjIndex]);


    const updateSolution = () => {
        const len = currentSolutionObj.length;
        if (len < solutionObj.length) {
            setCurrentSolutionObj([...currentSolutionObj, solutionObj[len]]);
        }
    };

    const swotUpdate = (e) => {
        const val = e.target.value
        const index = currentSolutionObj.length - 1;
        const newObj = {
            [solutionObj[index]]: val
        }
        setCurrentSwotData((prevCurrentSwotData) => ({ ...prevCurrentSwotData, ...newObj }));
        props.passOnSwotData(currentSwotData, currentSolutionObj.length, props.seen)
    }

    return (
        <div className='slidesMainContainer'>
            {/* {console.log(props)} */}
            <div className="flex gap-4">

                <div className="w-[100%] p-2 rightCon">

                    {currentSolutionObj.length > 0 &&
                        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg">
                            {currentSolutionObj.map((value, index) => (
                                <div key={index} className='flex flex-col justify-evenly'>
                                    {/* {console.log(props.questions)} */}
                                    <p className='font-semibold'>{value}</p>
                                    {props && props.questionSet && 
                                        <p>
                                            {props.questionSet === 'nonGeneral' ? nonGeneral[index]: generalQuestions[index]}
                                        </p>
                                    }
                                    <textarea
                                        key={index}
                                        className={`w-full h-24 p-2 rounded border ${borderStyles[index % borderStyles.length]}`}
                                        // value={value}
                                        onChange={(e) => swotUpdate(e)}
                                    />
                                </div>
                            ))}
                        </div>
                    }


                    {currentSolutionObj.length < solutionObj.length &&
                        <center>
                            <button onClick={updateSolution} className="font-semibold p-2 bg-yellow-500 text-white cursor-pointer text-[20px] px-4 rounded-lg">
                            Update SWOT Chart
                            </button>
                        </center>
                    }
                </div>
            </div>
        </div>
    );
}
