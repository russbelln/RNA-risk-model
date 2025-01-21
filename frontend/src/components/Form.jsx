import React, { useState } from 'react';

const Form = ({ features, onSubmit }) => {
  console.log('Features recibidas', features)
  const [formValues, setFormValues] = useState({});

  const handleChange = (e, feature) => {
    const { value } = e.target;
    setFormValues({
      ...formValues,
      [feature.name]: feature.type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {features.map((feature) => (
        <div key={feature.id}>
          <label>{feature.name}</label>
          {feature.type === 'dropdown' ? (
            <select onChange={(e) => handleChange(e, feature)}>
              {feature.options.split(',').map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={feature.type}
              onChange={(e) => handleChange(e, feature)}
            />
          )}
        </div>
      ))}
      <button type="submit">Calcular Score</button>
    </form>
  );
};

export default Form;
