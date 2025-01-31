import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';

const { Option } = Select;

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

const CustomForm = ({ features, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value, feature) => {
    setFormData({
      ...formData,
      [name]: feature.type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        {features.map((feature, idx) => (
          <Col span={12} key={idx}>
            <Form.Item
              label={labels[feature.name] || feature.name}
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
        <Button type="primary" htmlType="submit">
          Calculate tour Risk
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;