"use client";
import './p1Style.css'

import Image from 'next/image';
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "@/components/ModalInit";

import I1 from '../assets/p1/i1.png';
import I2 from '../assets/p1/i2.png';
import I3 from '../assets/p1/i3.png';
import I4 from '../assets/p1/i4.png';
import I5 from '../assets/p1/i5.png';

import PI1 from '../assets/p1/pI1.png';
import PI2 from '../assets/p1/pI2.png';
import PI3 from '../assets/p1/pI3.png';
import PI4 from '../assets/p1/pI4.png';
import PI5 from '../assets/p1/pI5.png';

const initialOptions = [
    { id: "1", qImg: PI1, img: I1, text: "Submarine", answer: "dolphinsEcholocation" },
    { id: "2", qImg: PI2, img: I2, text: "LED lights", answer: "fireflyGlow" },
    { id: "3", qImg: PI3, img: I3, text: "Syringe needle", answer: "mosquito" },
    { id: "4", qImg: PI4, img: I4, text: "Bullet Trains", answer: "kingfisherBeak" },
    { id: "5", qImg: PI5, img: I5, text: "Airplanes", answer: "birdWings" },
];

// Fisher-Yates shuffle
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function DragDropOptions(props) {
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [moveToNextQ, setmoveToNextQ] = useState(false);

    const [sections, setSections] = useState({
        options: initialOptions.map(item => ({ ...item, color: "bg-yellow-500" })), // Start unshuffled
        dolphinsEcholocation: [],
        fireflyGlow: [],
        mosquito: [],
        kingfisherBeak: [],
        birdWings: [],
    });

    // Shuffle only after client mount to avoid hydration issues
    useEffect(() => {
        setSections(prev => ({
            ...prev,
            options: shuffleArray(prev.options),
        }));
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceList = [...sections[result.source.droppableId]];
        const destinationList = [...sections[result.destination.droppableId]];

        const [movedItem] = sourceList.splice(result.source.index, 1);

        // Prevent duplicates in destination
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

        ["dolphinsEcholocation", "fireflyGlow", "mosquito", "kingfisherBeak", "birdWings"].forEach((sectionKey) => {
            updatedSections[sectionKey] = updatedSections[sectionKey].map(item => {
                const isCorrect = item.answer === sectionKey;
                if (isCorrect) correctCount++;
                totalCount++;
                return { ...item, color: isCorrect ? "bg-green-500" : "bg-red-500" };
            });
        });

        setSections(updatedSections);

        setTimeout(() => {
            if (correctCount === totalCount) {
                setModalTitle('Good job moving to next part!');
                setmoveToNextQ(true);
            } else {
                setModalTitle("Oops! your answers are incorrect.");
            }
            setOpenModal(true);
        }, 200);
    };

    const closeModal = () => {
        setOpenModal(false);
        if (moveToNextQ) {
            props.handleNext();
        }
    };

    return (
        <div className="relative h-screen pt-2 flex flex-col sequenceConatinerX">
            <DragDropContext onDragEnd={onDragEnd}>

                {/* Top Sections */}
                {/* <div className="grid grid-cols-5 gap-4 w-full"> */}
                <div className="flex gap-6">

                    {["dolphinsEcholocation", "fireflyGlow", "mosquito", "kingfisherBeak", "birdWings"].map((sectionKey) => (
                        <Droppable key={sectionKey} droppableId={sectionKey}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="w-64 min-h-[200px] p-4 bg-gray-100 rounded-lg shadow-lg d2"
                                >
                                    <div className="flex items-center mb-2">
                                        <Image
                                            src={
                                                sectionKey === "dolphinsEcholocation"
                                                    ? PI1
                                                    : sectionKey === "fireflyGlow"
                                                        ? PI2
                                                        : sectionKey === "mosquito"
                                                            ? PI3
                                                            : sectionKey === "kingfisherBeak"
                                                            ? PI4
                                                            : PI5
                                            }
                                            alt={sectionKey}
                                            className="rounded-md mb-1 w-[130px] mr-2"
                                        />
                                        <h2 className="text-lg font-semibold text-center">
                                            <u>
                                                {
                                                    sectionKey === "dolphinsEcholocation"
                                                        ? "Dolphins"
                                                        : sectionKey === "fireflyGlow"
                                                            ? "Firefly Glow"
                                                            : sectionKey === "mosquito"
                                                                ? "Mosquito"
                                                                : sectionKey === "kingfisherBeak"
                                                                ? "Kingfisher Beak"
                                                                : "Bird Wings"
                                                }
                                            </u>
                                        </h2>
                                    </div>

                                    {sections[sectionKey].map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`${item.color} text-white p-2 mb-2 rounded-md cursor-pointer flex items-center`}
                                                >
                                                    <Image className='rounded-[10px] w-[50px] mr-2' src={item.img} alt="item" />
                                                    {item.text}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>

                {/* Submit Button (Only when options are empty) */}
                {sections.options.length === 0 && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow-lg hover:bg-green-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                )}

                {/* Bottom Options Section */}
                <div className="absolute bottom-0 w-full flex justify-center p-2 bg-blue-500">
                    <Droppable droppableId="options">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="w-full p-4 flex flex-wrap gap-2 justify-center"
                            >
                                <h2 className="w-full text-lg font-semibold text-center text-white mb-2">Invention</h2>
                                {sections.options.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-white text-black p-2 rounded-md cursor-pointer transition duration-300 hover:bg-green-500 hover:text-white"
                                            >
                                                <Image className='rounded-[10px] w-[120px]' src={item.img} alt="item" />
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
            </DragDropContext>

            <Modal
                title={modalTitle}
                content={modalContent}
                open={openModal}
                closeModal={closeModal}
            />
        </div>
    );
}
