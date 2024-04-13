import React, { useState } from 'react';
import "./AddModal.css"
const AddModal = ({ isAddVisible = false, title, onClose, onSubmit }) => {
const [formData, setFormData] = useState({ name: '' });

const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '' });
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
    ...prevData,
    [name]: value
    }));
};
const handleModalClick = (e) => {
    e.stopPropagation();
};

return !isAddVisible ? null :(
    <div className='add-modal' onClick={onClose}>
        <div className="modal-content-add" onClick={handleModalClick}>
            <h4 className="modal-title-add">
                <div className="modal-close-add" onClick={onClose}> х</div>
                <div className='title-name-add'>{title}</div> 
            </h4>
            <form className='form-add' onSubmit={handleFormSubmit}>
                <input
                className='input-add'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваша задача"
                />
                <button type="submit">Сохранить</button>
            </form>
        </div>    
</div>
);
};

export default AddModal;