// import { Card, CardContent, Typography } from "@mui/material";
// import jsonData from "./PaymentData.json";

// import { MdOutlinePayment } from "react-icons/md";

// const PaymentMethodCard = () => {
//   const product = {};
//   for (let i = 0; i < jsonData.length; i++) {
//     const item = jsonData[i];
//     const { Amount, Card } = item;
//     if (!product[Card]) {
//       product[Card] = { total: 0, items: [] };
//     }
//     product[Card].total += Amount;
//   }
//   const productArray = Object.keys(product).map((Card) => ({
//     Card,
//     total: product[Card].total
//   }));

//   return (
//     <div className="w-50 mx-auto d-flex flex-row justify-content-around gap-2 mb-2">
//       {productArray.map((items) => {
//         return (
//           <div
//             className="border px-3 py-3 rounded shadow align-middle justify-content-center my-auto"
//             style={{ background: "#be4d25" }}
//           >
//             <span className="fw-bold d-flex mx-auto flex-row align-items-center justify-content-center text-white gap-2">
//               <MdOutlinePayment />
//               {items.Card}
//             </span>
//             <span className="d-flex flex-row mt-3 fw-bold  gap-2 fs-5 text-white">
//               <p>Total</p>
//               <p> {items.total} </p>
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default PaymentMethodCard;
