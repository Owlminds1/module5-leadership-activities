'use client'

import './style.css'
import { useState, useEffect } from 'react';
import Modal from "@/components/ModalInit";

export default function SlideShow() {
    const [modalTitle, setModalTitle] = useState('')
    const [modalContent, setModalContent] = useState('')
    const [openModal, setOpenModal] = useState(false);
    const [nextQ, setNextQ] = useState(false);

    const [currentObjIndex, setCurrentObjIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [score, setScore] = useState(0);

    const objects = [
        {
            "text": "If your team is sad, what should a leader do?",
            "options": [
                "Yell",
                "Cheer them up",
                "Ignore"
            ],
            "correctAnswer": 1
        },
        {
            "text": "A player isn’t listening. Should the coach…",
            "options": [
                "Speak to them calmly and kindly",
                "Bench them",
                "Walk away"
            ],
            "correctAnswer": 0
        },
        {
            "text": "Your little sibling spill juice. What would a helpful leader do?",
            "options": [
                "Laugh at them",
                "Complain loudly",
                "Help clean it up"
            ],
            "correctAnswer": 2
        },
        {
            "text": "Your friend wants a turn with the ball. A fair leader should…",
            "options": [
                "Keep playing forever",
                "Say “too bad”",
                "Share the ball"
            ],
            "correctAnswer": 2
        },
        {
            "text": "Someone in your group is shy. What could a leader do?",
            "options": [
                "Ignore them",
                "Let them talk when they’re ready",
                "Talk over them"
            ],
            "correctAnswer": 1
        },
        {
            "text": "If you’re leading a game and someone breaks a rule, what should you do?",
            "options": [
                "Explain the rule once again",
                "Shout at them",
                "Stop the game forever"
            ],
            "correctAnswer": 0
        },
        {
            "text": "What makes a good leader?",
            "options": [
                "Being kind, fair, and helpful",
                "Being the loudest",
                "Making all the rules alone",
            ],
            "correctAnswer": 0
        }                
    ]

    const [quizCompleted, setQuizCompleted] = useState(false)
    useEffect(() => {
        // console.log(timeLeft, currentObjIndex, objects.length)
        if (timeLeft < 0) {
            if (currentObjIndex === (objects.length - 1)) {
                nextQuestion()
            } else {
                setModalTitle('You missed answering! Move to the next question.');
                setModalContent(`Correct answer is : ${objects[currentObjIndex].options[objects[currentObjIndex].correctAnswer]}`)
                setNextQ(true)
                setOpenModal(true)
            }
        }

        if (!openModal) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const handleSelectedOption = (selectedOption) => {
        if (selectedOption === objects[currentObjIndex].correctAnswer) {
            setModalTitle('Yay! Your answer is correct!')
            setScore(prevScore => prevScore + 1);
        } else {
            setModalTitle('Incorrect Answer');
            setModalContent(`Correct answer is : ${objects[currentObjIndex].options[objects[currentObjIndex].correctAnswer]}`)
        }
        setNextQ(true)
        setOpenModal(true)
    };


    const nextQuestion = () => {
        if (currentObjIndex < objects.length - 1) {
            setCurrentObjIndex(prev => prev + 1);
            setTimeLeft(30);
        } else {
            setQuizCompleted(true)
        }
    };

    const closeModal = () => {
        setOpenModal(false)
        setModalContent('')
        if (nextQ) {
            nextQuestion();
            setNextQ(false)
        }
    }

    return (
        <div className="slideShowContainer p-4 space-y-4">
            {quizCompleted ? (
                <h1 className="text-[30px] font-semibold text-center">
                    Quiz completed! Your final score is {score}/{objects.length}
                </h1>
            ) : (
                <div>
                    <p style={openModal ? { visibility: 'hidden' } : {}}
                        className="text-right text-[30px] mt-4 mb-4 text-red-500 font-bold"
                    >
                        Time left: {timeLeft}s
                    </p>
                    <p className="text-lg font-semibold text-center mb-4 bg-gray-100 p-4 rounded-lg">
                        Question {currentObjIndex + 1}: {objects[currentObjIndex].text}
                    </p>
                    <center>
                        {objects[currentObjIndex].options.map((option, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => handleSelectedOption(index)}
                                    className="px-4 cursor-pointer py-2 m-2 bg-blue-500 text-white rounded-lg shadow-md">
                                    {option}
                                </button>
                                <br />
                            </div>

                        ))}
                    </center>
                </div>
            )}


            <Modal
                title={modalTitle}
                content={modalContent}
                open={openModal}
                closeModal={closeModal}
            />
        </div>
    );
}
