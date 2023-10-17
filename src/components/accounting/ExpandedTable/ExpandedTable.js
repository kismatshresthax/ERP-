// // import React, { useState } from "react";
// // import "./tree.css";
// // import ExpandableTable from "react-exp-table";
// // import styled from 'styled-components'
// // export default function Tree(props) {
// //     const data = props.data.slice(0, 5)
// //     // console.log("data", data)
// //     // const depth = props.depth
// //     // console.log(depth)

// //     const Styles = styled.div`
// //     .row-background-first, .row-background-middle, .row-background-last{
// //         min-height: 20px !important;
// //     }
// //     .visHidden {
// //         visibility: visible;
// //     }
// //     .icon-button {
// //         padding: 0 !important;
// //         margin: 0 !important;
// //     }
// //   padding: 1rem;
// //     .row-underline{
// //         padding: 0 !important;
// //         margin: 0 !important;
// //         border-bottom: none !important;
// //     }
// //   table {
// //     border-spacing: 0;
// //     border: 1px solid black;
// //     tbody{
// //         margin: 0!important;
// //         padding: 0!important;
// //         max-height: 20px!important;
// //         tr{
// //          margin: 0!important;
// //         padding: 0!important;
// //         max-height: 20px!important;
// //         td{
// //             padding:0px!important;
// //         }
// //         }
// //     }
// //   }
// // `


// //     // const data = [
// //     //     {
//                   // id:1
// //     //         ledgerName: "Assets",
// //     //         dr_cr: "dr",
// //     //         amount: 5000,
// //     //         children: [
// //     //             {
//                           // parentId:1
//                           // id:2
// //     //                 ledgerName: "cash",
// //     //                 dr_cr: "dr",
// //     //                 amount: 4000,
// //     //                 children: [
// //     //                     {
//                                   // parent:2
// //     //                         ledgerName: "Inventory",
// //     //                         dr_cr: "cr",
// //     //                         amount: 1000
// //     //                     },
// //     //                     {
// //     //                         ledgerName: "cash balance",
// //     //                         dr_cr: "dr",
// //     //                         amount: 2000

// //     //                     }
// //     //                 ]
// //     //             },
// //     //         ]
// //     //     }
// //     // ]


// //     const columns = [
// //         {
// //             title: "ledgerName",
// //             key: ["ledgerName"],
// //             class: ["ledgerName"]
// //         },
// //         {
// //             title: "Debit",
// //             key: "dr",
// //             class: "dr"
// //         },
// //         {
// //             title: "Credit",
// //             key: "cr",
// //             class: "cr"
// //         },
// //     ];

// //     // item.children ? item.children.map((item) => {
// //     //     return {
// //     //         ledgerName: item.ledgerName,
// //     //         dr: parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2),
// //     //         cr: parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2),
// //     //         children: item.children
// //     //     }
// //     // }) : null

// //     const newArray = data.map((item) => {
     
// //         return {
// //             ledgerName: item.ledgerName,
// //             dr: parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2),
// //             cr: parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2),
// //             children:  item.children ? item.children.map((item) => {
// //                     return {
// //                         ledgerName: item.ledgerName,
// //                         dr: parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2),
// //                         cr: parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2),
// //                         children: item.children
// //                     }
// //                 }) : null}
// //         });
// //     console.log(newArray)
// //     return (
// //         <Styles>
// //             <ExpandableTable
// //                 columns={columns}
// //                 data={newArray}
// //                 childDataKey="children"
// //                 rowKey={"ledgerName"}

// //             >
// //             </ExpandableTable>
// //         </Styles>

// //     );
// // }

// import React, { useState } from "react";
// import {
//   createTable,
//   useTableInstance,
//   getCoreRowModel,
//   getExpandedRowModel,
// } from "@tanstack/react-table";
// import STUDENTS from "./Student.json";
// import {AiOutlineDown,AiOutlineRight} from "react-icons/ai"
// const table = createTable();

// const defaultColumns = [
//   table.createGroup({
//     header: "Account",
//     columns: [
//       table.createDataColumn("ledgerName", {
//         id: "ledgerName",
//         header: (props) => (
//           <div className="d-flex flex-row  justify-content-start  align-items-center">
//             <button onClick={props.instance.getToggleAllRowsExpandedHandler()} className="border-0 bg-transparent">
//               {props.instance.getIsAllRowsExpanded() ? <AiOutlineDown/> : <AiOutlineRight/>}
//             </button>
//             Trial Balance
//           </div>
//         ),

//         cell: ({ row, getValue }) => (
//           <div
//             style={{
//               // Since rows are flattened by default,
//               // we can use the row.depth property
//               // and paddingLeft to visually indicate the depth
//               // of the row
//               // backgroundColor: COLORS[row.depth],
//               paddingLeft: `${row.depth * 2}rem`,
//             }}
//             className="ms-2"
//           >
//             {row.getCanExpand() && (
//               <button
//                 {...{
//                   onClick: row.getToggleExpandedHandler(),
//                   style: { cursor: "pointer" },
//                 }}
//                 className="border-0 bg-transparent"
//               >
//                 {row.getIsExpanded() ? <AiOutlineDown/> : <AiOutlineRight/>}
//               </button>
//             ) }{" "}
//             {getValue()}
//           </div>
//         ),
//       }),
//     ],
//   }),

//   table.createGroup({
//     header: "Amount",
//     columns: [
//       table.createDataColumn((row) => row.dr, {
//         id: "Debit",
//       }),
//       table.createDataColumn((row) => row.cr, {
//         id: "Credit",
//       }),
//     ],
//   }),
// ];
// const Tree = (props) => {
//     const finalData = props.data

//     // const finalData =[
//     //   {
//     //   "dr_cr": "dr",
//     //   "id": 1,
//     //   "ledgerName": "Assets",
//     //   "parentId": null,
//     //   "amount": 0,
//     //     "children": [
//     //       {
//     //         "amount": 3200,
//     //         "children": [
//     //           {
//     //             "amount": 51693.110122680664,
//     //             "children": [],
//     //             "dr_cr": "dr",
//     //             "id": 105,
//     //             "ledgerName": "Cash",
//     //             "parentId": 19
//     //           }
//     //         ],
//     //         "dr_cr": "dr",
//     //         "id": 19,
//     //         "ledgerName": "Cash Balance",
//     //         "parentId": 1
//     //       },
//     //       {
//     //         "amount": 30,
//     //         "children": [
//     //           {
//     //             "amount": 5852,
//     //             "children": [],
//     //             "dr_cr": "dr",
//     //             "id": 106,
//     //             "ledgerName": "Nmb Bank",
//     //             "parentId": 20
//     //           }
//     //         ],
//     //         "dr_cr": "cr",
//     //         "id": 20,
//     //         "ledgerName": "Bank Balance",
//     //         "parentId": 1
//     //       }
//     //     ],
//     //   },
//     //   {
//     //     "amount": 51693.110122680664,
//     //     "children": [],
//     //     "dr_cr": "dr",
//     //     "id": 105,
//     //     "ledgerName": "Cash",
//     //     "parentId": 19
//     //   }
//     // ]
//     function transformToRecursiveArray(oldArray) {
//         return oldArray.map((item) => ({
//             id:item.id,
//             ledgerName: item.ledgerName,
//             dr: parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2),
//             cr: parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2),
//             children:transformToRecursiveArray(item.children)
//         }));
//       }

//     const newArray = finalData.map((item) => {
  

//                 return {
//                     id:item.id,
//                     ledgerName: item.ledgerName,
//                     dr: parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2),
//                     cr: parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2),
//                     // children:  item.children ? item.children.map((item) => {
//                     //         return {
//                     //             ledgerName: item.ledgerName,
//                     //             dr: parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2),
//                     //             cr: parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2),
//                     //             children: item.children
//                     //         }
//                     //     }) : null}
//                     children:  transformToRecursiveArray(item.children) 
//                 }
//                 });
//             console.log("newArray",newArray)
           
//  const defaultData = [...newArray];



//   const [data, setData] = useState([...defaultData]);
//   const [columns, setColumns] = useState([...defaultColumns]);
//   const [expanded, setExpanded] = useState({});

//   const instance = useTableInstance(table, {
//     data,
//     columns,
//     state: {
//       expanded: expanded,
//     },
//     onExpandedChange: setExpanded,
//     getSubRows: (row) => row.children,
//     getCoreRowModel: getCoreRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//   });
//   console.log(instance.getRowModel());
  
//   return (
//     <div>
//       <table border={1}>
//         <thead>
//           {instance.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder ? null : header.renderHeader()}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody className="ps-2">
//           {instance.getRowModel().rows.map((row) => (
//             <tr key={row.id} className={`depth-${row.depth} ps-2`}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>{cell.renderCell()}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//         {/* <tfoot>
//           {instance.getFooterGroups().map((footerGroup) => (
//             <tr key={footerGroup.id}>
//               {footerGroup.headers.map((header) => (
//                 <th key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder ? null : header.renderFooter()}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </tfoot> */}
//       </table>
//     </div>
//   );
// };

// export default Tree;