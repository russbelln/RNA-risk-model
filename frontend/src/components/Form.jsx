import React, { useState } from 'react';

const Form = ({ features, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, feature) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: feature.type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {features.map((feature, idx) => (
        <div key={idx}>
          <label>{feature.name}</label>
          {feature.type === 'dropdown' ? (
            <select name={feature.name} onChange={(e) => handleChange(e, feature)}>
              <option value="">Select an option</option>
              {feature.options.split(',').map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={feature.type === 'number' ? 'number' : 'text'}
              name={feature.name}
              step="any" // Permite valores de punto flotante
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