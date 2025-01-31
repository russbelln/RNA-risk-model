import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Steps } from 'antd';
import './StepForm.css'; // Importa el archivo CSS

const { Option } = Select;
const { Step } = Steps;

const labels = {
  term: "Loan term",
  int_rate: "Interest rate",
  installment: "Monthly installment",
  sub_grade: "Loan sub-grade",
  emp_length: "Employment length in years",
  home_ownership: "Homeownership type",
  annual_inc: "Annual income in USD",
  verification_status: "Income verification status",
  purpose: "Loan purpose",
  dti: "Debt-to-income ratio",
  delinq_2yrs: "Number of delinquencies in the last 2 years",
  inq_last_6mths: "Number of credit inquiries in the last 6 months",
  open_acc: "Number of open accounts",
  pub_rec: "Number of public records",
  revol_bal: "Revolving balance",
  revol_util: "Revolving credit utilization",
  total_acc: "Total number of accounts",
  initial_list_status: "Initial listing status",
  out_prncp: "Outstanding principal",
  total_rec_prncp: "Total principal received",
  total_rec_int: "Total interest received",
  total_rec_late_fee: "Total late fees received",
  last_pymnt_amnt: "Last payment amount",
  collections_12_mths_ex_med: "Collections in the last 12 months excluding medical",
  application_type: "Application type",
  acc_now_delinq: "Number of accounts currently delinquent",
  tot_coll_amt: "Total collections amount",
  tot_cur_bal: "Total current balance",
  total_rev_hi_lim: "Total revolving credit limit"
};

const StepForm = ({ features, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    { title: 'Loan Information', fields: features.slice(0, 4) },
    { title: 'Personal Information', fields: features.slice(4, 10) },
    { title: 'Financial History', fields: features.slice(10, 15) },
    { title: 'Financial information', fields: features.slice(15, 20) },
    { title: 'Financial information 2', fields: features.slice(20) }
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
  };

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
            {currentStep === steps.length - 1 ? 'Calculte your Risk' : 'Next'}
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default StepForm;