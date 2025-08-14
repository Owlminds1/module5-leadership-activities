"use client";
import './style.css';

import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import Image from 'next/image';

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "@/components/ModalInit";

const initialOptions = [
    { id: "1", text: "Class Monitor", answer: "School" },
    { id: "2", text: "Team Captain", answer: "Sports" },
    { id: "3", text: "Principal", answer: "School" },
    { id: "4", text: "Referee", answer: "Sports" },
    { id: "5", text: "First Aid Leader", answer: "School/Sports" },
];

export default function DragDropOptions() {
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [sections, setSections] = useState({
        options: initialOptions.map(item => ({ ...item, color: "bg-yellow-500" })),
        School: [],
        Sports: []
    });

    // Question flow state
    const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0);
    const [questionStep, setQuestionStep] = useState(0);
    const [showQuestions, setShowQuestions] = useState(true);

    const questionsTemplate = [
        leader => `What does ${leader} leader do?`,
        () => "What should they do to be a good leader?",
        () => "What are the top 2-3 leadership qualities they should have?"
    ];

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceList = [...sections[result.source.droppableId]];
        const destinationList = [...sections[result.destination.droppableId]];
        const [movedItem] = sourceList.splice(result.source.index, 1);

        if (!destinationList.some(item => item.id === movedItem.id)) {
            destinationList.splice(result.destination.index, 0, movedItem);
        }

        setSections({
            ...sections,
            [result.source.droppableId]: sourceList,
            [result.destination.droppableId]: destinationList,
        });

        // If current leader is placed, hide questions and go to next leader
        if (movedItem.id === initialOptions[currentLeaderIndex].id) {
            setShowQuestions(false);
            setTimeout(() => {
                if (currentLeaderIndex < initialOptions.length - 1) {
                    setCurrentLeaderIndex(prev => prev + 1);
                    setQuestionStep(0);
                    setShowQuestions(true);
                }
            }, 300);
        }
    };

    const handleNextQuestion = () => {
        if (questionStep < questionsTemplate.length - 1) {
            setQuestionStep(prev => prev + 1);
        }
    };

    const handleSubmit = () => {
        const updatedSections = { ...sections };
        let correctCount = 0;
        let totalCount = 0;
        let missingCount = false;

        const minRequiredPerCategory = 2;

        ["School", "Sports"].forEach((sectionKey) => {
            if (updatedSections[sectionKey].length < minRequiredPerCategory) {
                missingCount = true;
            }

            updatedSections[sectionKey] = updatedSections[sectionKey].map(item => {
                const isCorrect = item.answer === sectionKey || item.answer === "School/Sports";
                if (isCorrect) correctCount++;
                totalCount++;
                return { ...item, color: isCorrect ? "bg-green-500" : "bg-red-500" };
            });
        });

        setSections(updatedSections);

        setTimeout(() => {
            if (missingCount) {
                setModalTitle("Almost there!");
                setModalContent(`Please make sure all the leadership roles are placed in their correct categories before submitting.`);
            } else if (correctCount === totalCount && totalCount > 0) {
                setModalTitle("Yay! All answers are correct!");
                setModalContent("Great job! You've placed all leadership roles in the correct categories.");
            } else {
                setModalTitle("Oops! Some answers are incorrect.");
                setModalContent("Check your placements and try again.");
            }
            setOpenModal(true);
        }, 200);
    };

    const showSubmitBtn = () => {
        return sections.School.length > 0 || sections.Sports.length > 0;
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <div className="relative h-screen p-5 flex flex-col sequenceConatinerX">

            <DragDropContext onDragEnd={onDragEnd}>
                {/* 3 Columns Layout */}
                <div className="grid grid-cols-3 gap-4 w-full">
                    {/* Options Column */}
                    <Droppable droppableId="options">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="min-h-[300px] p-4 bg-blue-100 rounded-lg shadow-lg"
                            >
                                <h2 className="text-lg font-semibold mb-4 text-center text-blue-700">
                                    <u>Leadership Roles</u>
                                </h2>
                                {sections.options.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-white text-black p-2 mb-2 rounded-md cursor-pointer hover:bg-green-500 hover:text-white transition"
                                            >
                                                {item.text}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {/* School Column */}
                    <Droppable droppableId="School">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="min-h-[300px] p-4 bg-green-100 rounded-lg shadow-lg"
                            >
                                <h2 className="text-lg font-semibold mb-4 text-center text-green-700">
                                    <u>School</u>
                                </h2>
                                <center>
                                    <Image src={S1} alt='s1' className='rounded-[10px] mb-[10px] w-[280px]' />
                                </center>
                                {sections.School.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`${item.color} text-white p-2 mb-2 rounded-md cursor-pointer`}
                                            >
                                                {item.text}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {/* Sports Column */}
                    <Droppable droppableId="Sports">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="min-h-[300px] p-4 bg-red-100 rounded-lg shadow-lg"
                            >
                                <h2 className="text-lg font-semibold mb-4 text-center text-red-700">
                                    <u>Sports</u>
                                </h2>
                                <center>
                                    <Image src={S2} alt='s2' className='rounded-[10px] mb-[10px] w-[280px]' />
                                </center>
                                {sections.Sports.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`${item.color} text-white p-2 mb-2 rounded-md cursor-pointer`}
                                            >
                                                {item.text}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

                {/* Submit Button */}
                {showSubmitBtn() &&
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow-lg hover:bg-green-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                }
            </DragDropContext>


            {/* Question Display */}
            {showQuestions && (
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <p className="text-lg font-semibold mb-2 text-black">
                        {questionsTemplate[questionStep](initialOptions[currentLeaderIndex].text)}
                    </p>
                    {questionStep < questionsTemplate.length - 1 && (
                        <button
                            onClick={handleNextQuestion}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Next
                        </button>
                    )}
                </div>
            )}

            {/* Modal */}
            <Modal
                title={modalTitle}
                content={modalContent}
                open={openModal}
                closeModal={closeModal}
            />
        </div>
    );
}
