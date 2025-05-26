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
    { id: "4", text: "School Nurse", answer: "Community" },
    { id: "5", text: "Emergency Medical Technician", answer: "Community/Sports" },
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
    };

    const handleSubmit = () => {
        const updatedSections = { ...sections };
        let correctCount = 0;
        let totalCount = 0;

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
            if (correctCount === totalCount) {
                setModalTitle('Yay! All answers are correct!');
            } else {
                setModalTitle("Oops! Some answers are incorrect.");
            }
            setOpenModal(true);
        }, 200);
    };

    const showSubmitBtn = () => {
        return sections.Community.length > 0 || sections.Sports.length > 0;
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
                                    <Image src={S1} alt='s1' className='rounded-[10px] mb-[10px] w-[280px]' />
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
                                    <Image src={S2} alt='s1' className='rounded-[10px] mb-[10px] w-[280px]' />
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
