// import React, { useState } from "react";
// import { AiOutlinePieChart } from "react-icons/ai";
// import { BsTable } from "react-icons/bs";



// import { ResponsivePie } from "@nivo/pie";
// import { Box } from "@mui/material";
// import { styled } from "@mui/material/styles";

// import {
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
//   TableBody,
//   Paper,
//   Table,
//   tableCellClasses
// } from "@mui/material";
// function CategorySale() {
//     const [pie, setPie] = useState(false);
//  const jsonData=[
//     {
//         "id": 1,
//         "Category": "Overhead Doors",
//         "Quantity": 54,
//         "Color": "Crimson"
//       },
//       {
//         "id": 2,
//         "Category": "Hard Tile & Stone",
//         "Quantity": 40,
//         "Color": "Pink"
//       },
//       {
//         "id": 3,
//         "Category": "Soft Flooring and Base",
//         "Quantity": 26,
//         "Color": "Blue"
//       },
//       {
//         "id": 4,
//         "Category": "Hard Tile & Stone",
//         "Quantity": 76,
//         "Color": "Yellow"
//       },
//       {
//         "id": 5,
//         "Category": "Drywall & Acoustical (MOB)",
//         "Quantity": 25,
//         "Color": "Green"
//       },
//       {
//         "id": 6,
//         "Category": "Sitework & Site Utilities",
//         "Quantity": 94,
//         "Color": "Teal"
//       },
//       {
//         "id": 7,
//         "Category": "Framing (Steel)",
//         "Quantity": 13,
//         "Color": "Maroon"
//       },
//       {
//         "id": 8,
//         "Category": "Electrical",
//         "Quantity": 94,
//         "Color": "Khaki"
//       },
//       {
//         "id": 9,
//         "Category": "Masonry",
//         "Quantity": 97,
//         "Color": "Aquamarine"
//       },
//       {
//         "id": 10,
//         "Category": "Doors, Frames & Hardware",
//         "Quantity": 20,
//         "Color": "Crimson"
//       },
//       {
//         "id": 11,
//         "Category": "Fire Protection",
//         "Quantity": 76,
//         "Color": "Fuscia"
//       },
//       {
//         "id": 12,
//         "Category": "Framing (Wood)",
//         "Quantity": 4,
//         "Color": "Maroon"
//       },
//       {
//         "id": 13,
//         "Category": "Doors, Frames & Hardware",
//         "Quantity": 44,
//         "Color": "Green"
//       },
//       {
//         "id": 14,
//         "Category": "Exterior Signage",
//         "Quantity": 39,
//         "Color": "Khaki"
//       },
//       {
//         "id": 15,
//         "Category": "Retaining Wall and Brick Pavers",
//         "Quantity": 59,
//         "Color": "Puce"
//       },
//       {
//         "id": 16,
//         "Category": "Fire Protection",
//         "Quantity": 18,
//         "Color": "Blue"
//       },
//       {
//         "id": 17,
//         "Category": "Wall Protection",
//         "Quantity": 92,
//         "Color": "Aquamarine"
//       },
//  ]

//     const data = [
//       {
//         id: "haskell",
//         label: "haskell",
//         value: 36,
//         color: "hsl(249, 70%, 50%)"
//       },
//       {
//         id: "python",
//         label: "python",
//         value: 161,
//         color: "hsl(62, 70%, 50%)"
//       },
//       {
//         id: "java",
//         label: "java",
//         value: 485,
//         color: "hsl(198, 70%, 50%)"
//       },
//       {
//         id: "c",
//         label: "c",
//         value: 457,
//         color: "hsl(258, 70%, 50%)"
//       },
//       {
//         id: "go",
//         label: "go",
//         value: 56,
//         color: "hsl(61, 70%, 50%)"
//       }
//     ];
  
//     const pieHandler = (e) => {
//       e.preventDefault();
//       setPie(true);
//     };
//     const tableHandler = (e) => {
//       e.preventDefault();
//       setPie(false);
//     };
//     const CategoryTable = () => {
//         const sortedData = jsonData
//           .slice()
//           .sort((a, b) => b.Quantity - a.Quantity)
//           .slice(0, 10);
//         const StyledTableCell = styled(TableCell)(({ theme }) => ({
//           [`&.${tableCellClasses.head}`]: {
//             backgroundColor: "#F3F6F9",
//             fontSize: 15,
//             fontWeight: "bold"
//           }
//         }));
//         return (
//           <TableContainer component={Paper}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell>Category</StyledTableCell>
//                   <StyledTableCell>Quantity</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {sortedData.map((product, index) => {
//                   return (
//                     <TableRow key={index}>
//                       <TableCell className="text-truncate">
//                         {product.Category}
//                       </TableCell>
//                       <TableCell>{product.Quantity}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         );
//       };
//   return (
//     <div className="container-fluid d-flex flex-column  ">
//     <div className="d-flex flex-row  justify-content-between">
//       <span className="d-flex flex-column  ">
//         <h3 style={{ color: "#1D3557" }}>Top Category</h3>
//         <span
//           className="d-flex flex-row gap-2"
//           style={{ color: "#457B9D", marginTop: "-.25rem" }}
//         >
//           {/* <p>Total Category:</p>
//           <p>{jsonData.length}</p> */}
//         </span>
//       </span>

//       <span
//         className="d-flex flex-row gap-2 fs-3 pe-auto my-auto"
//         style={{ cursor: "pointer" }}
//       >
//         <AiOutlinePieChart
//           data-bs-toggle="tooltip"
//           data-bs-placement="bottom"
//           title="Pie Chart"
//           onClick={(e) => pieHandler(e)}
//           className={pie === true ? "text-info" : "text-info opacity-50"}
//         />

//         <BsTable
//           data-bs-toggle="tooltip"
//           data-bs-placement="bottom"
//           title="Table"
//           onClick={(e) => tableHandler(e)}
//           className={pie === false ? "text-info" : "text-info opacity-50"}
//         />
//       </span>
//     </div>
//     <div className={pie === true ? "d-none" : "d-flex "}>
//       <CategoryTable />
//     </div>

//     <Box
//       backgroundColor="#ffff"
//       className={pie === false ? "d-none" : "d-inline "}
//     >
//       <Box height="350px" width="auto">
//         <ResponsivePie
//           data={data}
//           margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
//           innerRadius={0.5}
//           padAngle={0.7}
//           cornerRadius={3}
//           activeOuterRadiusOffset={8}
//           borderColor={{
//             from: "color",
//             modifiers: [["darker", 0.5]]
//           }}
//           arcLinkLabelsSkipAngle={10}
//           arcLinkLabelsTextColor="#e0e0e0"
//           arcLinkLabelsThickness={2}
//           arcLinkLabelsColor={{ from: "color" }}
//           enableArcLabels={false}
//           arcLabelsRadiusOffset={0.4}
//           arcLabelsSkipAngle={7}
//           arcLabelsTextColor={{
//             from: "color",
//             modifiers: [["darker", 2]]
//           }}
//           defs={[
//             {
//               id: "dots",
//               type: "patternDots",
//               background: "inherit",
//               color: "rgba(255, 255, 255, 0.3)",
//               size: 4,
//               padding: 1,
//               stagger: true
//             },
//             {
//               id: "lines",
//               type: "patternLines",
//               background: "inherit",
//               color: "rgba(255, 255, 255, 0.3)",
//               rotation: -45,
//               lineWidth: 6,
//               spacing: 10
//             }
//           ]}
//           legends={[
//             {
//               anchor: "bottom",
//               direction: "row",
//               justify: false,
//               translateX: 0,
//               translateY: 56,
//               itemsSpacing: 0,
//               itemWidth: 100,
//               itemHeight: 18,
//               itemTextColor: "#999",
//               itemDirection: "left-to-right",
//               itemOpacity: 1,
//               symbolSize: 18,
//               symbolShape: "circle",
//               effects: [
//                 {
//                   on: "hover",
//                   style: {
//                     itemTextColor: "#000"
//                   }
//                 }
//               ]
//             }
//           ]}
//         />
//       </Box>
//     </Box>
//   </div>
//   )
// }

// export default CategorySale