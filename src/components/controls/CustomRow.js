// import React, { useState } from 'react'
// import { Grid, IconButton } from '@material-ui/core'
// import { MTableBodyRow } from 'material-table'
// import AddIcon from '@material-ui/icons/Add';

// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from'@material-ui/icons/Edit';
// const CustomRow = (props) => {
//  const [show,setShow]=useState(false)
//     const overlayStyle = { width: "100%", position: "absolute" }
    
//     return <Grid style={{ display: "contents" }} 
//     onMouseOver={()=>setShow(true)}
//     onMouseLeave={()=>setShow(false)}
//     >
//         {show&&<Grid align="right" style={overlayStyle}>

//             <Grid sm={2} align="center" style={{ background: "#ffffff" }}>
//                  <IconButton title="Edit" onClick={()=>props.onRowUpdate()}>
//                     <EditIcon />
//                  </IconButton> 
//                 <IconButton title="Delete" onClick={()=>props.onRowDelete(props.index)}>
//                     <DeleteIcon />
//                 </IconButton>
//             </Grid>
//         </Grid>}
//         <MTableBodyRow {...props} />
//     </Grid>

// }

// export default CustomRow