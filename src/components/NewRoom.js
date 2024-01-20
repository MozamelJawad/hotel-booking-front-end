// NewRoom.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../redux/actions';

const NewRoom = ({ categories }) => {
  const dispatch = useDispatch();
  const [newRoomDetails, setNewRoomDetails] = useState({
    name: '',
    category_id: '',
  });

  const handleSaveRoom = async () => {
    try {
      dispatch(saveFormData(newRoomDetails));
      setNewRoomDetails({
        name: '',
        category_id: '',
      });
    } catch (error) {
      throw new Error('Error saving room:', error);
    }
  };

  // Check if categories is undefined before rendering the component
  if (!categories || categories.length === 0) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="new-form">
      <h1>Add a New Room</h1>

      {/* Render form inputs for each field (name, room_type, description, etc.) */}
      <input
        type="text"
        placeholder="Name"
        value={newRoomDetails.name}
        onChange={(e) => setNewRoomDetails({
          ...newRoomDetails, name: e.target.value,
        })}
      />

      {/* Add a dropdown to select a category */}
      <select
        value={newRoomDetails.category_id}
        onChange={(e) => setNewRoomDetails({
          ...newRoomDetails, category_id: e.target.value,
        })}
      >

        <option value="">Select a Category</option>
        {/* Map over categories if available */}
        {categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>

      <button type="button" onClick={handleSaveRoom}>
        Add Room
      </button>
    </div>
  );
};

NewRoom.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  // handleFormSubmit: PropTypes.func.isRequired,
};

export default NewRoom;
