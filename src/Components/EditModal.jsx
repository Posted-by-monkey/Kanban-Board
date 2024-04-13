import React, { useState, useEffect } from 'react';
import './EditModal.css';

const EditModal = ({ isEditVisible, title, onClose, onSave, initialTitle,movementHistory }) => {
    const [newTitle, setNewTitle] = useState('');
    useEffect(() => {
        setNewTitle(initialTitle || '');
    }, [isEditVisible, initialTitle]);

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleSave = () => {
        onSave(newTitle);
        onClose();
    };
    console.log(movementHistory)
    return !isEditVisible ? null :(
        <div className={'edit-modal'}>
            <div className="modal-content">
                <h4 className="modal-title">
                    <div className="modal-close" onClick={onClose}> х  </div>
                    <div className='title-name'>{title}</div> 
                </h4>
                <div className="movement-history"> История перемещений:
                    {movementHistory && movementHistory.map((movement, index) => (
                        <div key={index}>{movement.sourceBoard} →  {movement.targetBoard}</div>
                    ))}
                </div>
                <input className='input' type="text" value={newTitle} onChange={handleTitleChange} placeholder="Новая задача" />
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default EditModal;