import React from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import {Link} from 'react-router-dom';

const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label: <Link to="/page2">Página 2</Link>,
  },
  {
    key: '3',
    icon: <ContainerOutlined />,
    label: <Link to="/score">Score</Link>,
  },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: '5',
        label: 'Option 5',
      },
      {
        key: '6',
        label: 'Option 6',
      },
      {
        key: '7',
        label: 'Option 7',
      },
      {
        key: '8',
        label: 'Option 8',
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '9',
        label: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
      },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          {
            key: '11',
            label: 'Option 11',
          },
          {
            key: '12',
            label: 'Option 12',
          },
        ],
      },
    ],
  },
];

const Sidebar = ({ collapsed, onToggle }) => {
  return (
    <div
      style={{
        width: collapsed ? 80 : 256, // Cambia el ancho según el estado de colapso
        height: '100%',
        background: '#001529',
        transition: 'width 0.3s', // Suaviza la transición
        zIndex: 2
      }}
    >
      <Button
        type="primary"
        onClick={onToggle}
        style={{
          marginBottom: 16,
          marginLeft: collapsed ? 8 : 16,
          transition: 'margin-left 0.3s', // Suaviza la transición del botón
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default Sidebar;
