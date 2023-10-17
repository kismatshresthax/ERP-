// import React ,{useState} from "react";
// import Controls from "../../controls/Controls";
// import { Tooltip } from "@material-ui/core";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import EditIcon from "@mui/icons-material/Edit";

// const ReadOnlyRow = ({  handleEditClick, handleDeleteClick,productList }) => {
//   const [product, setProduct] = useState(productList);
//   console.log(product)
//   return (
//     <div>
   
//     {product&&product.map((row, idx) => {
    
//         return (
//           <tr key={row.idx}>
//             <td>{idx + 1}</td>
//             <td>{row.productName}</td>
//             <td>{row.productQTY}</td>
//             <td>{row.unitName}</td>
//             <td>{row.productCost}</td>
//             <td>{row.productTotal}</td>
//             <td>{row.productDiscount}</td>
//             <td>{row.productTax}</td>

//             <td>{row.productSubtotal}</td>
        
            
     
//       <td>
//         <Controls.ActionButton type="button" size="small" variant="contained" color="warning" onClick={(event) => handleEditClick(event, productList)}>
//           <Tooltip title="Edit" placement="top" arrow>
//             <EditIcon style={{ fontSize: "17px" }} />
//           </Tooltip>
//         </Controls.ActionButton>
//         <Controls.ActionButton type="button" size="small" variant="contained" color="danger"  onClick={() => handleDeleteClick(productList.productId)}>
//           <Tooltip title="Delete" placement="top" arrow>
//             <RemoveCircleIcon style={{ fontSize: "20px" }} />
//           </Tooltip>
//         </Controls.ActionButton>
//       </td>
      
//     </tr>
//        );
//         })
        
//         }
//     </div>
//   );
// };

// export default ReadOnlyRow;
