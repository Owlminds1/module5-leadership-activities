"use client";
import './style.css';

import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import Image from 'next/image';

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "@/components/ModalInit";

const initialOptions = [
    { id: "1", text: "Mayor", answer: "Community" },
    { id: "2", text: "Sports Club Captain", answer: "Sports" },
    { id: "3", text: "Referee", answer: "Sports" },
    { id: "4", text: "Crossing Guard", answer: "Community" },
    { id: "5", text: "First Aid Responder", answer: "Community/Sports" },
];

export default function DragDropOptions() {
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [sections, setSections] = useState({
        options: initialOptions.map(item => ({ ...item, color: "bg-yellow-500" })),
        Community: [],
        Sports: []
    });

    // Question flow state
    const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0); // which leader we're focusing on
    const [questionStep, setQuestionStep] = useState(0); // 0,1,2
    const [showQuestions, setShowQuestions] = useState(true); // hide when leader placed

    const questionsTemplate = [
        leader => `What does ${leader} leader do?`,
        () => "What does this leader do?",
        () => "What should they do to be a good leader?",
        () => "What are the top 2-3 leadership qualities they should have?"
    ];

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceId = result.source.droppableId;
        const destId = result.destination.droppableId;

        const sourceList = [...sections[sourceId]];
        const destinationList = [...sections[destId]];
        const [movedItem] = sourceList.splice(result.source.index, 1);

        // prevent duplicate in destination
        if (!destinationList.some(item => item.id === movedItem.id)) {
            destinationList.splice(result.destination.index, 0, movedItem);
        }

        setSections(prev => ({
            ...prev,
            [sourceId]: sourceList,
            [destId]: destinationList,
        }));

        // If the moved item is the current leader AND it was placed into a category (not back to 'options'),
        // advance to the next leader's questions
        const currentLeader = initialOptions[currentLeaderIndex];
        if (movedItem.id === currentLeader.id && destId !== 'options') {
            // hide questions briefly, then show next leader (or hide if last)
            setShowQuestions(false);

            setTimeout(() => {
                const nextIndex = currentLeaderIndex + 1;
                if (nextIndex < initialOptions.length) {
                    setCurrentLeaderIndex(nextIndex);
                    setQuestionStep(0);
                    setShowQuestions(true);
                } else {
                    // all leaders processed — hide question area (you can show a completion modal here)
                    setShowQuestions(false);
                }
            }, 400); // small pause for UX
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

        const totalRoles = initialOptions.length;
        const placedCount = sections.Community.length + sections.Sports.length;
        if (placedCount < totalRoles) {
            missingCount = true;
        }

        ["Community", "Sports"].forEach((sectionKey) => {
            updatedSections[sectionKey] = updatedSections[sectionKey].map(item => {
                const isCorrect = item.answer === sectionKey || item.answer === "Community/Sports";
                if (isCorrect) correctCount++;
                totalCount++;
                return { ...item, color: isCorrect ? "bg-green-500" : "bg-red-500" };
            });
        });

        setSections(updatedSections);

        setTimeout(() => {
            if (missingCount) {
                setModalTitle("Almost there!");
                setModalContent("Please make sure all the leadership roles are placed in their correct categories before submitting.");
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

    const showSubmitBtn = () => sections.Community.length > 0 || sections.Sports.length > 0;
    const closeModal = () => setOpenModal(false);

    const currentLeaderText = initialOptions[currentLeaderIndex]?.text;

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

                    {/* Community Column */}
                    <Droppable droppableId="Community">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="min-h-[300px] p-4 bg-green-100 rounded-lg shadow-lg"
                            >
                                <h2 className="text-lg font-semibold mb-4 text-center text-green-700">
                                    <u>Community</u>
                                </h2>
                                <center>
                                    <Image src={S1} alt='community' className='rounded-[10px] mb-[10px] w-[280px]' />
                                </center>

                                {sections.Community.map((item, index) => (
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
                                    <Image src={S2} alt='sports' className='rounded-[10px] mb-[10px] w-[280px]' />
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


            {/* Questions area */}
            {showQuestions && currentLeaderText && (
                <div className="bg-white p-4 rounded-lg shadow-md mt-4 max-w-3xl">
                    <p className="text-lg font-semibold mb-3 text-black">
                        {questionsTemplate[questionStep](currentLeaderText)}
                    </p>

                    {questionStep < questionsTemplate.length - 1 ? (
                        <button
                            onClick={handleNextQuestion}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Next
                        </button>
                    ) : (
                        <div className="text-sm text-gray-600 mt-2">
                            {/* Now drag and drop the <span className="font-semibold">{currentLeaderText}</span> into the right place. */}
                        </div>
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
