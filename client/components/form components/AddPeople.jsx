import React from 'react';

const AddPeople = (props) => {
  const { peopleInputFields, handlePersonChange, removePerson } = props;

  return (
    <>
      <label className="form-group">People:</label>
      {peopleInputFields.map((person, index) => {
        return (
          <li>
            <label key={index}>
              Person {index + 1}:
              <input
                name="name"
                placeholder="Name"
                value={person.name}
                onChange={(event) => handlePersonChange(index, event)}
              />
              <button
                className="removeEntry"
                onClick={() => removePerson(index)}
              >
                Remove
              </button>
            </label>
          </li>
        );
      })}
    </>
  );
};

export default AddPeople;
