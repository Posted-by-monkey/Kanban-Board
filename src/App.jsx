import React, { useState} from 'react';
import AddModal from './Components/AddModal';
import EditModal from './Components/EditModal';
import './App.css';

function App() {
    const [boards, setBoards] = useState([
        { id: 1, title: 'Backlog', items: [] },
        { id: 2, title: 'Todo', items: [] },
        { id: 3, title: 'InProgress', items: [] },
        { id: 4, title: 'Done', items: [] }
    ]);

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [modalAddVisible, setAddModalVisible] = useState(false);
    const [modalEditVisible, setEditModalVisible] = useState(false);
    const [movementHistory, setMovementHistory] = useState([]);
    
    const openModal = () => {
        setAddModalVisible(true);
    };

    const closeModal = () => {
        setAddModalVisible(false);
    };

    const handleModalSubmit = (formData) => {
        const newItem = { id: Date.now(), title: formData.name };
        const updatedBoards = [...boards];
        updatedBoards[0].items.push(newItem);
        setBoards(updatedBoards);
        closeModal();
    };

    const handleDeleteClick = (item, board) => {
        const updatedBoards = boards.map((b) => {
            if (b.id === board.id) {
                const updatedItems = b.items.filter((i) => i.id !== item.id);
                return { ...b, items: updatedItems };
            }
            return b;
        });
        setBoards(updatedBoards);
    };

    const handleEditClick = (item, board) => {
        setCurrentBoard(board);
        setCurrentItem(item);
        setEditModalVisible(true);
    };

    const handleSaveTitle = (newTitle) => {
        const updatedItems = boards.map(b => {
            if (b.id === currentBoard.id) {
                return {
                    ...b,
                    items: b.items.map(i => i.id === currentItem.id ? { ...i, title: newTitle } : i)
                };
            }
            return b;
        });
        setBoards(updatedItems);
    };

    const dropHandler = (e, targetBoard, item) => {
        e.preventDefault();
        const updatedBoards = boards.map((b) => {
            if (b.id === targetBoard.id) {
                return {
                    ...b,
                    items: [...b.items, item]
                };
            } else if (b.id === currentBoard.id) {
                return {
                    ...b,
                    items: b.items.filter((i) => i.id !== item.id)
                };
            }
            return b;
        });

        setBoards(updatedBoards);

        const updatedMovement = {
            item: { ...item },
            sourceBoard: currentBoard.title,
            targetBoard: targetBoard.title
        };

        setMovementHistory([...movementHistory, updatedMovement]);
    };

    return (
        <div className="App">
            <button className='AddTaskButton' onClick={openModal}>Добавить Задачу</button>
            <AddModal isAddVisible={modalAddVisible} title="Добавить Задачу" onClose={closeModal} onSubmit={handleModalSubmit} initialFormData={currentItem ? { name: currentItem.title } : { name: '' }} />
                {boards.map((board) => (
                    <div key={board.id} className='board' onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropHandler(e, board, currentItem)}>
                        <div className='board_title'>{board.title}</div>
                        {board.items.map((item, index) => (
                            <div
                                draggable
                                key={item.id}
                                onDragStart={() => {
                                    setCurrentBoard(board);
                                    setCurrentItem(item);
                                }}
                                className='item'
                            >
                                Задача {index + 1}: <br />{item.title}
                                <button className='EditEl' onClick={() => handleEditClick(item, board)}>✏</button>
                                <button className='DelEl' onClick={() => handleDeleteClick(item, board)}> х </button>
                            </div>
                        ))}
                    </div>
                ))}

                <EditModal
                    isEditVisible={modalEditVisible}
                    title="Редактировать Задачу"
                    onClose={() => setEditModalVisible(false)}
                    onSave={handleSaveTitle}
                    initialTitle={currentItem ? currentItem.title : ''}
                    movementHistory={movementHistory.filter(movement => movement.item.id === currentItem.id)}
                />
        </div>
    );
}

export default App;