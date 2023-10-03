import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import AddPeople from './AddPeople.jsx';
import AddItem from './AddItem.jsx';
import InfoInput from './InfoInput.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const CreateBill = () => {
  const [peopleInputFields, setPeopleInputFields] = useState([{ name: '' }]);
  const [foodInputFields, setFoodInputFields] = useState([
    { itemName: '', price: '', quantity: '', people: '' },
  ]);

  const [billInfoFields, setBillInfoFields] = useState({
    billName: '',
    restaurant: '',
    date: '',
    tax: '',
    tip: '',
  });

  const handleInfoChange = (event) => {
    let data = JSON.parse(JSON.stringify(billInfoFields));
    data[event.target.name] = event.target.value;
    setBillInfoFields(data);
  };

  const handlePersonChange = (index, event) => {
    let data = JSON.parse(JSON.stringify(peopleInputFields));
    data[index][event.target.name] = event.target.value;
    setPeopleInputFields(data);
  };

  const handleFoodChange = (index, event) => {
    let data = JSON.parse(JSON.stringify(foodInputFields));
    data[index][event.target.name] = event.target.value;
    setFoodInputFields(data);
  };

  const addPerson = () => {
    let newPerson = { name: '' };
    setPeopleInputFields([...peopleInputFields, newPerson]);
  };

  const removePerson = (index) => {
    let data = JSON.parse(JSON.stringify(peopleInputFields));
    data.splice(index, 1);
    setPeopleInputFields(data);
  };

  const addFoodItem = () => {
    let newItem = { itemName: '', price: '', quantity: '', people: '' };
    setFoodInputFields([...foodInputFields, newItem]);
  };

  const removeFoodItem = (index) => {
    let data = JSON.parse(JSON.stringify(foodInputFields));
    data.splice(index, 1);
    setFoodInputFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    // return <div>Hello</div>;
    console.log('peopleInputFields', peopleInputFields);
    console.log('foodInputFields', foodInputFields);
    console.log('billInfoFields', billInfoFields);
  };

  return (
    <>
      <h2>Split New Bill</h2>
      <div className="splitForm">
        <InfoInput
          handleInfoChange={handleInfoChange}
          billInfoFields={billInfoFields}
        />
        <AddPeople
          peopleInputFields={peopleInputFields}
          handlePersonChange={handlePersonChange}
          removePerson={removePerson}
        />
        <button onClick={addPerson}>Add person</button>
        <AddItem
          peopleInputFields={peopleInputFields}
          handleFoodChange={handleFoodChange}
          foodInputFields={foodInputFields}
          removeFoodItem={removeFoodItem}
        />
        <button onClick={addFoodItem}>Add item</button>
        <label className="form-group">
          Tax ($):
          <input
            name="tax"
            placeholder="Tax"
            value={billInfoFields.tax}
            onChange={(event) => handleInfoChange(event)}
          />
        </label>
        <label className="form-group">
          Tip ($):
          <input
            name="tip"
            placeholder="Tip"
            value={billInfoFields.tip}
            onChange={(event) => handleInfoChange(event)}
          />
        </label>
        <button className="submit" onClick={submit}>
          Split the Bill
        </button>
      </div>
    </>
  );
};

export default CreateBill;
