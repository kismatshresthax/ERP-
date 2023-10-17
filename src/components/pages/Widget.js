
import React from "react";

import LocalAtmSharpIcon from '@mui/icons-material/LocalAtmSharp';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import MoneyOffSharpIcon from '@mui/icons-material/MoneyOffSharp';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import './dashboard.css'


export default function Widget(props){


const { type } = props;

  let value;

  switch (type) {
    case 'purchase':
      value = {
        title: 'PURCHASE',
        //link: 'View Purchase Details',
        amount: (props.purchase),
        icon: (
          <MonetizationOnOutlinedIcon className='icon'
          // style={{
          // color: 'crimson', 
          //  backgroundColor: 'rgba(255, 0, 0, 0.2)'}} 
          />
        ),
      }
      break;

    case 'sales':
      value = {
        title: 'SALES',
        //link: 'See Details',
        amount: props.sale,
        icon: (
          <AccountBalanceWalletOutlinedIcon className='icon'
          // style={{
          //     color: 'purple', 
          //     backgroundColor: 'rgba(128, 0, 128, 0.2)'}} 
          />
        ),
      }
      break;

    case 'income':
      value = {
        title: 'INCOME',
        //link: 'View Income Details',
        amount: props.income,
        icon: (
          <LocalAtmSharpIcon className='icon'
          // style= {{
          //     color: 'goldenrod', 
          //     backgroundColor: 'rgba(218, 65, 32, 0.2)'}} 
          />
        ),
      }
      break;

    case 'expenses':
      value = {
        title: 'EXPENSES',
        //link: 'View Total Expenses',
        amount: props.expense,
        icon: (
          <MoneyOffSharpIcon className='icon'
          // style=
          // {{
          //     color: 'green', 
          //     backgroundColor: 'rgba(0, 128, 0, 0.2)'}} 
          />
        ),
      }
      break;

    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{value.title}</span>
        <span className='counter'>{'RS'} {value.amount}</span>
        <span className='link'>{value.link}</span>
      </div>
      <div className='right'>
        <div className="percentage positive">
          {/* {/* <KeyboardArrowUpIcon /> 
                {diff}% */}
        </div>
        {value.icon}
      </div>
    </div>
  )
}

