import React, { useState, useEffect } from 'react';
import { Select, Input, Table, Progress } from 'antd';
import './Dashboard.css';

import { IoAddSharp } from 'react-icons/io5';
import customersData from './customer.json';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
const { Option } = Select;
const { Search } = Input;

export default function Dashboard() {
    
    const [customers, setCustomers] = useState(customersData.customers);
    const [sortKey, setSortKey] = useState(null);
    const [searchText, setSearchText] = useState("");

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Country',
          dataIndex: 'country',
          key: 'country',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
    ];

    useEffect(() => {
      let updatedCustomers = [...customersData.customers];

      if (sortKey) {
        updatedCustomers.sort((a, b) => 
          a[sortKey].toString().localeCompare(b[sortKey].toString())
        );
      }

      if (searchText) {
        updatedCustomers = updatedCustomers.filter(customer => 
          customer.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      setCustomers(updatedCustomers);

    }, [sortKey, searchText]);

    const handleChange = value => {
      setSortKey(value);
    };
    const activeCustomers = customers.filter(customer => customer.status === 'active').length;
    const inactiveCustomers = customers.filter(customer => customer.status === 'inactive').length;
    const activeCustomersPercent = Math.round((activeCustomers / customers.length) * 100);
    const inactiveCustomersPercent = Math.round((inactiveCustomers / customers.length) * 100);
  return (
    <div className='background'>
      <div className='header'>
        <div style={{ fontSize: '1.5rem' }}>Order</div>
        <button className='addorder'>
          <IoAddSharp /> Add Order
        </button>
      </div>
      <div className='graph'>
        <div className='box1'>
          <p style={{fontSize:'1.5rem'}}>All customers</p>
    <div className='circulargraph'>
    <div className='progress-bar-container'>
  <CircularProgressbar
    value={85}
    text={`${85}%`}
    styles={buildStyles({
      pathColor: `purple`,
      textColor: '#000',
      trailColor: '#d6d6d6',
      textSize: '16px',
    })}
  />
  <p>current Customers</p>
</div>

<div className='progress-bar-container'>
  <CircularProgressbar
    value={66}
    text={`${66}%`}
    styles={buildStyles({
      pathColor: `lightgreen`,
      textColor: '#000',
      trailColor: '#d6d6d6',
    })}
  />
  <p>New Customers</p>
</div>

<div className='progress-bar-container'>
  <CircularProgressbar
    value={90}
    text={`${90}%`}
    styles={buildStyles({
      pathColor: `red`,
      textColor: '#000',
      trailColor: '#d6d6d6',
    })}
  />
  <p>Target Customers</p>
</div>

<div className='progress-bar-container'>
  <CircularProgressbar
    value={30}
    text={`${30}%`}
    styles={buildStyles({
      pathColor: `lightcoral`,
      textColor: '#000',
      trailColor: '#d6d6d6',
    })}
  />
  <p>Retarget Customers</p>
</div>
      </div>  
        </div>
        <div className='box2'>
          <p>Stats Overview</p>
          <div className='bargraph'>
              <div className='fstbar'>
                <p>active</p>
                <Progress percent={activeCustomersPercent} status="active" strokeColor="#16C098" />
              </div>
              <div>
                <p>inactive</p>
                <Progress percent={inactiveCustomersPercent} status="inactive" strokeColor="red" />
              </div>
          </div>
        </div>
      </div>
      <div className='box3'>
        <p style={{color:'#16C098',marginLeft:'20px'}}>Active Members</p>
        <Select className='sort' defaultValue="Sort by" style={{ width: 120}} onChange={handleChange}>
          <Option value="name">Name</Option>
          <Option value="company">Company</Option>
          <Option value="phone">Phone</Option>
          <Option value="email">Email</Option>
          <Option value="country">Country</Option>
          <Option value="status">Status</Option>
        </Select>
        <Search
        className='search'
          placeholder="Search by name"
          onSearch={value => setSearchText(value)}
          style={{ width: 200 }}
        />
        <Table pagination={{pageSize:'6'}} dataSource={customers} columns={columns} />
      </div>
    </div>
  )
}
