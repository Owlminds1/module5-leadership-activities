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
    const [leaderShipDiff, setLeaderShipDiff] = useState({});
    const [optionCount, setOptionCount] = useState([0, 0, 0, 0]); // Tracks A, B, C, D

    const [quizCompleted, setQuizCompleted] = useState(false)

    const objects = [
        {
            text: "If there’s a disagreement in your group, how do you handle it?",
            options: [
                "I tell everyone what to do and settle the argument quickly.",
                "I listen to everyone’s perspective and work together to find a solution.",
                "I let everyone handle it themselves, as long as they reach a decision.",
                "I encourage everyone to share their ideas, and we’ll figure out a creative solution together.",
            ]
        },
        {
            text: "When starting a group project, what is your approach?",
            options: [
                "I assign tasks and tell everyone what needs to be done.",
                "I ask everyone what ideas they have and come to a decision together.",
                "I let the group decide on their own and step in only if needed.",
                "I inspire everyone to come up with exciting and new ideas.",
            ]
        },
        {
            text: "If someone on your team isn’t doing their part, you...",
            options: [
                "Tell them directly to do their work or face consequences.",
                "Talk to them to see if there’s an issue and how we can fix it.",
                "Let them figure it out themselves unless it becomes a bigger issue.",
                "Motivate them by encouraging them and showing them the benefits of doing their part.",
            ]
        },
        {
            text: "When making decisions for the group, I usually...",
            options: [
                "Make the final decision on my own, without asking for anyone’s opinion.",
                "Make sure to ask for everyone’s opinion and choose the best option together.",
                "Let the group come to a decision themselves while I observe.",
                "Share my vision and help the group see the bigger picture, motivating them to agree.",
            ]
        },
        {
            text: "In a team activity, I prefer to...",
            options: [
                "Take charge and make sure everyone follows the plan I’ve set.",
                "Work together, making sure every team member’s voice is heard.",
                "Let everyone work independently and check in when necessary.",
                "Inspire everyone to do their best and make the activity exciting.",
            ]
        },
        {
            text: "If someone in your group is having trouble with a task, you would...",
            options: [
                "Give them clear instructions and tell them how to do it.",
                "Offer help and ask them what they need to solve the problem.",
                "Let them figure it out on their own; I trust them to manage.",
                "Encourage them to think creatively and help them find solutions.",
            ]
        },
        {
            text: "During a team meeting, I usually...",
            options: [
                "Set the agenda and make sure everyone follows it strictly.",
                "Make sure everyone has a chance to speak and share ideas.",
                "Let the group set their own agenda and decide what’s important.",
                "Inspire everyone to think big and come up with exciting ideas.",
            ]
        },
        {
            text: "If a deadline is approaching and the group isn’t prepared, you would...",
            options: [
                "Take control and make sure everything is done on time.",
                "Ask the group to work together to meet the deadline, dividing tasks equally.",
                "Let the group manage it themselves, trusting that they’ll pull together.",
                "Motivate the group by focusing on the rewards and how well we can achieve it.",
            ]
        },
        {
            text: "When a group is struggling to complete a task, you...",
            options: [
                "Step in, take charge, and make sure everyone does their job.",
                "Organize a meeting to get everyone’s thoughts on how to move forward.",
                "Let them handle it on their own unless it becomes a major issue.",
                "Give them encouragement and keep the energy high so they don’t give up.",
            ]
        },
        {
            text: "When you think about being a leader, what stands out the most to you?",
            options: [
                "I like to be in control and make tough decisions.",
                "I enjoy working with others to find the best solutions together.",
                "I like to let others take the lead and manage their own responsibilities.",
                "I’m passionate about inspiring others to achieve great things.",
            ]
        }
    ]

    const ledershipStyleDef = [
        {
            text: "Decision-Maker",
            def: "You’re a confident leader who takes charge and gets things done. You’re great at solving problems quickly and keeping the team focused.",
        },
        {
            text: "Collaborator",
            def: "You believe in teamwork and making sure everyone has a voice. You help groups feel included and build fair solutions together.",
        },
        {
            text: "Hands-Off Leader",
            def: "You trust others and let them make their own choices. You give people space and step in only when really needed.",
        },
        {
            text: "Motivator",
            def: "You lead by inspiring others and bringing big ideas. You’re the one who keeps everyone excited and helps them do their best!",
        },
    ]

    useEffect(() => {
        if (timeLeft < 0 && !quizCompleted) {
            if (currentObjIndex < objects.length - 1) {
                setModalTitle('You missed answering! Moving to the next question.');
                setNextQ(true)
                setOpenModal(true)
            } else {
                hanleOp()
                setQuizCompleted(true);
            }
        }

        if (!openModal && !quizCompleted) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, openModal]);

    const handleSelectedOption = (selectedOption) => {
        // Count selected option
        setOptionCount(prev => {
            const updated = [...prev];
            updated[selectedOption]++;
            return updated;
        });

        setModalTitle('Answer Submitted!');
        setNextQ(true);
        setOpenModal(true);
    };

    const nextQuestion = () => {
        if (currentObjIndex < objects.length - 1) {
            setCurrentObjIndex(prev => prev + 1);
            setTimeLeft(30);
        } else {
            hanleOp()
            setQuizCompleted(true)
        }
    };

    const hanleOp = ()=>{
        const x = ['A', 'B', 'C', 'D'][
            optionCount.indexOf(Math.max(...optionCount))
        ]
        if (x === "A") {
            setLeaderShipDiff(ledershipStyleDef[0])
        } else if (x === "B") {
            setLeaderShipDiff(ledershipStyleDef[1])
        } else if (x === "C") {
            setLeaderShipDiff(ledershipStyleDef[2])
        } else if (x === "D") {
            setLeaderShipDiff(ledershipStyleDef[3])
        }
    }

    const closeModal = () => {
        setOpenModal(false);
        setModalContent('');
        if (nextQ) {
            nextQuestion();
            setNextQ(false);
        }
    };


    return (
        <div className="slideShowContainer p-4 space-y-4">
            {quizCompleted ? (
                <div className="text-center space-y-4">
                    <center>
                        <h1 className="text-[25px] font-semibold">
                            It seems your leadership style is:
                        </h1>
                        <h2 className="text-2xl font-bold mt-4 text-green-600">
                            {leaderShipDiff.text}
                        </h2>
                        <h2 className="mt-6 text-xl font-bold mt-4 w-[800px]">
                            {leaderShipDiff.text} : {leaderShipDiff.def}
                        </h2>
                    </center>
                </div>
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
                            <div key={index} className='w-[800px]'>
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
