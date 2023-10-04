import React from 'react';

const InfoInput = (props) => {
  const { billInfoFields, handleInfoChange } = props;

  return (
    <>
      <label>
        Bill Name:
        <input
          name="billName"
          placeholder="Bill Name"
          value={billInfoFields.billName}
          onChange={(event) => handleInfoChange(event)}
        />
      </label>
      <label className="form-group">
        Restaurant Name:
        <input
          name="restaurant"
          placeholder="Restaurant"
          value={billInfoFields.restaurant}
          onChange={(event) => handleInfoChange(event)}
        />
      </label>
      <label className="form-group">
        Date (mm/dd/yyyy):
        <input
          name="date"
          type="date"
          placeholder="Date"
          value={billInfoFields.date}
          onChange={(event) => handleInfoChange(event)}
        />
      </label>
    </>
  );
};

export default InfoInput;
