import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Steps } from 'antd';
import './StepForm.css'; // Importa el archivo CSS

const { Option } = Select;
const { Step } = Steps;

const labels = {
  emp_length: "Employment length in years",
  home_ownership: "Homeownership type",
  annual_inc: "Annual income in USD",
  delinq_2yrs: "Number of delinquencies in the last 2 years",
  open_acc: "Number of open accounts",
  total_acc: "Total number of accounts",
  tot_cur_bal: "Total current balance",
};

const StepForm = ({ features, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [score, setScore] = useState(null);

  const steps = [
    { title: 'Personal Information', fields: features.slice(0, 2) },
    { title: 'Income Information', fields: features.slice(2, 3) },
    { title: 'Financial History', fields: features.slice(3, 6) },
    { title: 'Balance information', fields: features.slice(6) }
  ];

  const handleChange = (name, value, feature) => {
    setFormData({
      ...formData,
      [name]: feature.type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  }

  return (
    <div className="step-form-container">
      <Steps current={currentStep}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div className="step-form-fields">
        <Form layout="vertical" onFinish={currentStep === steps.length - 1 ? handleSubmit : handleNext}>
          <Row gutter={16}>
            {steps[currentStep].fields.map((feature, idx) => (
              <Col span={12} key={idx}>
                <Form.Item
                  label={<span className="form-label">{labels[feature.name] || feature.name}</span>}
                  name={feature.name}
                  rules={[{ required: true, message: `Please input ${labels[feature.name] || feature.name}` }]}
                >
                  {feature.type === 'dropdown' ? (
                    <Select onChange={(value) => handleChange(feature.name, value, feature)}>
                      {feature.options.split(',').map((option, idx) => (
                        <Option key={idx} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      type={feature.type === 'number' ? 'number' : 'text'}
                      step="any" // Permite valores de punto flotante
                      onChange={(e) => handleChange(feature.name, e.target.value, feature)}
                    />
                  )}
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Form.Item>
            {currentStep > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
                Anterior
              </Button>
            )}
            <Button type="primary" htmlType="submit">
              {currentStep === steps.length - 1 ? 'Calculate your Risk' : 'Next'}
            </Button>
          </Form.Item>
        </Form>
        {score !== null && (
          <div className="score-result">
            <h3>Your Risk Score: {score}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepForm;