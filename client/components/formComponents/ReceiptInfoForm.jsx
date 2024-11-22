import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddPerson from './AddPerson.jsx';
import AddItem from './AddItem.jsx';
import InfoInput from './InfoInput.jsx';
import NavBar from '../NavBar.jsx';
import { useNavigate } from 'react-router-dom';
import { updateReceipt } from '../../slices/receiptSlice.js';
import { updateSplitHistory } from '../../slices/historySlice.js';

const ReceiptInfoForm = () => {
  const currentBill = useSelector((state) => state.receipt);
  const { isNewSplit } = useSelector((state) => state.history);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [people, setPeople] = useState(currentBill.people);
  const [foodItems, setFoodItems] = useState(currentBill.foodItems);
  const [billInfo, setBillInfo] = useState(currentBill.billInfo);

  const handleInfoChange = (event) => {
    let data = JSON.parse(JSON.stringify(billInfo));
    data[event.target.name] = event.target.value;
    setBillInfo(data);
  };

  const handlePersonChange = (index, event) => {
    let data = JSON.parse(JSON.stringify(people));
    data[index][event.target.name] = event.target.value;
    setPeople(data);
  };

  const handleFoodChange = (index, event) => {
    const { name, value } = event.target;
    let data = JSON.parse(JSON.stringify(foodItems));

    if (name === 'people') {
      const valueArray = typeof value === 'string' ? value.split(',') : value;
      data[index][name] = valueArray;
    } else {
      data[index][name] = value;
    }
    setFoodItems(data);
  };

  const addPerson = () => {
    let newPerson = { name: '' };
    setPeople([...people, newPerson]);
  };

  const removePerson = (index) => {
    let data = JSON.parse(JSON.stringify(people));
    data.splice(index, 1);
    setPeople(data);
  };

  const addItem = () => {
    let newItem = { itemName: '', price: '', quantity: '', people: [] };
    setFoodItems([...foodItems, newItem]);
  };

  const removeItem = (index) => {
    let data = JSON.parse(JSON.stringify(foodItems));
    data.splice(index, 1);
    setFoodItems(data);
  };

  const checkFields = () => {
    if (
      people.length === 0 ||
      foodItems.length === 0 ||
      people.some((person) => person.name === '') ||
      foodItems.some((item) =>
        Object.values(item).some((value) => value === '')
      ) ||
      Object.values(billInfo).some((value) => value === '')
    ) {
      return false;
    }
    return true;
  };

  const submit = (event) => {
    event.preventDefault();
    const ready = checkFields();
    if (ready) {
      dispatch(updateReceipt({ billInfo, people, foodItems }));
      if (!isNewSplit) {
        dispatch(updateSplitHistory({ isNewSplit, isEdited: true }));
      }
      navigate('/summary');
    } else {
      alert('Please fill out the form completely');
    }
  };

  return (
    <>
      <NavBar />
      <h2>Split Bill</h2>
      <div className="splitForm">
        <InfoInput
          handleInfoChange={handleInfoChange}
          billInfoFields={billInfo}
        />
        <AddPerson
          peopleInputFields={people}
          handlePersonChange={handlePersonChange}
          removePerson={removePerson}
        />
        <button className="addEntry" onClick={addPerson}>
          Add person
        </button>
        <AddItem
          peopleInputFields={people}
          handleFoodChange={handleFoodChange}
          foodInputFields={foodItems}
          removeFoodItem={removeItem}
        />
        <button className="addEntry" onClick={addItem}>
          Add item
        </button>
        <label className="form-group">
          Tax ($):
          <input
            name="tax"
            type="number"
            placeholder="Tax"
            value={billInfo.tax}
            onChange={(event) => handleInfoChange(event)}
          />
        </label>
        <label className="form-group">
          Tip ($):
          <input
            name="tip"
            type="number"
            placeholder="Tip"
            value={billInfo.tip}
            onChange={(event) => handleInfoChange(event)}
          />
        </label>
        <button className="submit" onClick={(event) => submit(event)}>
          {isNewSplit ? 'Split the Bill' : 'Update Split'}
        </button>
      </div>
    </>
  );
};

export default ReceiptInfoForm;
