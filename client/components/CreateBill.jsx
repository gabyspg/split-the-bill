import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-router-dom';
import AddPeople from './AddPeople.jsx';
import AddItem from './AddItem.jsx';
import InfoInput from './InfoInput.jsx';
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

  // useEffect(() => {}, [totals]);

  // const calculateTotals = () => {
  //   try {
  //     const subtotal = 0;
  //     for (let item in foodInputFields) {
  //       subtotal += Number(item.quantity) * Number(item.price);
  //     }
  //     const total = subtotal;
  //     // const total =
  //     //   subtotal + Number(billInfoFields.tax) + Number(billInfoFields.tip);
  //     setTotals([subtotal, total]);
  //   } catch {
  //     return;
  //   }
  // };

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

  const submit = () => {
    dispatch(updateBill({ billInfo, people, foodItems }));
    navigate('/summary');
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
            placeholder="Tax"
            value={billInfo.tax}
            onChange={(event) => handleInfoChange(event)}
          />
        </label>
        <label className="form-group">
          Tip ($):
          <input
            name="tip"
            placeholder="Tip"
            value={billInfo.tip}
            onChange={(event) => handleInfoChange(event)}
          />
        </label>
        {/* <label className="form-group">Total ($): {totals[1]}</label> */}
        <button className="submit" onClick={submit}>
          Split the Bill
        </button>
      </div>
    </>
  );
};

export default CreateBill;
