import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddPeople from './form components/AddPeople.jsx';
import AddItem from './form components/AddItem.jsx';
import InfoInput from './form components/InfoInput.jsx';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useNavigate,
} from 'react-router-dom';
import { updateBill } from '../slices/billSlice.js';

const CreateBill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [totals, setTotals] = useState([0, 0]);
  const [people, setPeople] = useState([{ name: '' }]);
  const [foodItems, setFoodItems] = useState([
    { itemName: '', price: '', quantity: '', people: '' },
  ]);
  const [billInfo, setBillInfo] = useState({
    billName: '',
    restaurant: '',
    date: '',
    tax: '',
    tip: '',
  });

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

  const handleItemChange = (index, event) => {
    let data = JSON.parse(JSON.stringify(foodItems));
    data[index][event.target.name] = event.target.value;
    setFoodItems(data);
    // calculateTotals();
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
    let newItem = { itemName: '', price: '', quantity: '', people: '' };
    setFoodItems([...foodItems, newItem]);
  };

  const removeItem = (index) => {
    let data = JSON.parse(JSON.stringify(foodItems));
    data.splice(index, 1);
    setFoodItems(data);
  };

  const checkFields = () => {
    if (people.length === 0 || foodItems.length === 0) {
      return false;
    }
    for (let i = 0; i < people.length; i++) {
      if (people[i].name === '') {
        return false;
      }
    }
    for (let i = 0; i < foodItems.length; i++) {
      for (let key in foodItems[i]) {
        if (foodItems[i][key] === '') {
          return false;
        }
      }
    }
    for (let key in billInfo) {
      if (billInfo[key] === '') {
        return false;
      }
    }
    return true;
  };

  const submit = (event) => {
    event.preventDefault();
    const ready = checkFields();
    if (ready === true) {
      dispatch(updateBill({ billInfo, people, foodItems }));
      navigate('/summary');
    } else {
      alert('Please fill out the form completely');
    }
  };

  return (
    <>
      <h2>Split New Bill</h2>
      <div className="splitForm">
        <InfoInput
          handleInfoChange={handleInfoChange}
          billInfoFields={billInfo}
        />
        <AddPeople
          peopleInputFields={people}
          handlePersonChange={handlePersonChange}
          removePerson={removePerson}
        />
        <button onClick={addPerson}>Add person</button>
        <AddItem
          peopleInputFields={people}
          handleFoodChange={handleItemChange}
          foodInputFields={foodItems}
          removeFoodItem={removeItem}
        />
        <button onClick={addItem}>Add item</button>
        {/* <label className="form-group">Subtotal ($): {totals[0]}</label> */}
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
        {/* <label className="form-group">Total ($): {totals[1]}</label> */}
        <button className="submit" onClick={(event) => submit(event)}>
          Split the Bill
        </button>
      </div>
    </>
  );
};

export default CreateBill;
