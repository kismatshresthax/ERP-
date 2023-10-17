import React from 'react'

export const PrintApprove = (props) => {
    const currentDate = new Date().toLocaleDateString(); // Get the current date
    const currentTime = new Date().toLocaleTimeString(); // Get the current time
  return (
    <div>

<div style={{display:'flex', justifyContent: 'space-between', marginTop: '35px', alignContent:'center'}}>
<div style={{width:'200px', textAlign:'center'}}>    
<span>-------------------</span><br />

<span>Prepared By:</span><br />

</div>
<div style={{width:'200px', textAlign:'center'}}>
<span>-------------------</span><br />
<span>Approved By:</span><br />
</div>
</div>
<div style={{width:'300px', textAlign:'left',marginTop: '5px'}}>

<p className="date-time">Printed on {currentDate} at {currentTime} by {localStorage.getItem('user')} </p>
</div>
    </div>
  )
}

export default PrintApprove