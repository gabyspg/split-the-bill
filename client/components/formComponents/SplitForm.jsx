import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PeopleInputs from './PeopleInputs.jsx';
import ItemInputs from './ItemInputs.jsx';
import InfoInput from './InfoInput.jsx';
import TaxTipInput from './TaxTipInput.jsx';
import { useNavigate } from 'react-router-dom';
import { resetReceipt, updateReceipt } from '../../slices/receiptSlice.js';
import { updateSplitHistory } from '../../slices/historySlice.js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

const SplitForm = () => {
  const currentBill = useSelector((state) => state.receipt);
  const { isNewSplit } = useSelector((state) => state.history);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [people, setPeople] = useState(currentBill.people);
  const [items, setItems] = useState(currentBill.items);
  const [billInfo, setBillInfo] = useState(currentBill.billInfo);

  const handleInfoChange = (event) => {
    let data = JSON.parse(JSON.stringify(billInfo));
    data[event.target.name] = event.target.value;
    setBillInfo(data);
  };

  const handleDateChange = (newDate) => {
    let data = JSON.parse(JSON.stringify(billInfo));
    data.date = new Date(newDate);
    setBillInfo(data);
  };

  const handlePersonChange = (index, event) => {
    let peopleData = JSON.parse(JSON.stringify(people));
    let itemsData = JSON.parse(JSON.stringify(items));

    const previousPerson = peopleData[index][event.target.name];
    const newPerson = event.target.value;

    const updatedItemsPeopleData = itemsData.map((item) => {
      const selectedSet = new Set(item.people);
      if (selectedSet.has(previousPerson)) {
        selectedSet.delete(previousPerson);
        selectedSet.add(newPerson);
      }
      item.people = [...selectedSet];
      return item;
    });

    peopleData[index][event.target.name] = event.target.value;
    setPeople(peopleData);
    setItems(updatedItemsPeopleData);
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    let data = JSON.parse(JSON.stringify(items));

    if (name === 'people') {
      const valueArray = typeof value === 'string' ? value.split(',') : value;
      data[index][name] = valueArray;
    } else {
      data[index][name] = value;
    }
    setItems(data);
  };

  const addPerson = () => {
    let newPerson = { name: '' };
    setPeople([...people, newPerson]);
  };

  const removePerson = (index) => {
    let peopleData = JSON.parse(JSON.stringify(people));
    let itemsData = JSON.parse(JSON.stringify(items));

    const removedPerson = peopleData[index].name;
    const updatedItemsPeopleData = itemsData.map((item) => {
      const updateSelectedPeople = item.people.filter((person) => {
        return person !== removedPerson;
      });
      item.people = updateSelectedPeople;
      return item;
    });

    peopleData.splice(index, 1);
    setPeople(peopleData);
    setItems(updatedItemsPeopleData);
  };

  const addItem = () => {
    let newItem = { itemName: '', price: '', quantity: '', people: [] };
    setItems([...items, newItem]);
  };

  const removeItem = (index) => {
    let data = JSON.parse(JSON.stringify(items));
    data.splice(index, 1);
    setItems(data);
  };

  const checkFields = () => {
    if (
      people.length === 0 ||
      items.length === 0 ||
      people.some((person) => person.name === '') ||
      items.some((item) =>
        Object.values(item).some((value) => value.length === 0)
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
      if (!isNewSplit) {
        dispatch(updateSplitHistory({ isNewSplit, isEdited: true }));
      }
      dispatch(updateReceipt({ billInfo, people, items }));
      navigate('/splitSummary');
    } else {
      toast.error('Please fill out the form completely');
    }
  };

  const discardChanges = () => {
    dispatch(resetReceipt());
    dispatch(updateSplitHistory({ isNewSplit: false, isEdited: false }));
    toast.info('Discarded Edits');
    navigate('/splitSummary');
  };

  return (
    <>
      <h2>Split Bill</h2>
      <div className="splitForm">
        <InfoInput
          handleInfoChange={handleInfoChange}
          handleDateChange={handleDateChange}
          billInfo={billInfo}
        />
        <PeopleInputs
          people={people}
          handlePersonChange={handlePersonChange}
          removePerson={removePerson}
          addPerson={addPerson}
        />
        <ItemInputs
          people={people}
          handleItemChange={handleItemChange}
          items={items}
          removeItem={removeItem}
          addItem={addItem}
        />
        <TaxTipInput handleInfoChange={handleInfoChange} billInfo={billInfo} />
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <Button
            onClick={(event) => submit(event)}
            variant="contained"
            size="small"
            className="submit"
          >
            Split
          </Button>
          {isNewSplit ? null : (
            <Button
              onClick={discardChanges}
              variant="contained"
              size="small"
              className="submit"
            >
              Cancel
            </Button>
          )}
        </Box>
      </div>
    </>
  );
};

export default SplitForm;
