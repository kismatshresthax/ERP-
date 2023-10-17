// // import React from "react";
// // // import ReactDOM from "react-dom";
// // import Pdf from "react-to-pdf";

// // import "./styles.css";
// // const ref = React.createRef();

// // function mypdf() {
// //   return (
// //     <div className="App">
// //       <Pdf targetRef={ref} filename="invoice.pdf">
// //         {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
// //       </Pdf>
// //       <div ref={ref}>
  
// //     <div className="myinvoice">
// //     <div className="row">
// //       <div className="col-sm-12">
// //         <div className="panel panel-default invoice" id="invoice">
// //           <div className="panel-body">
// //             <div className="invoice-ribbon">
// //               {/* <div className="ribbon-inner">PAID</div> */}
// //             </div>
// //             <div className="row">
// //               <div className="col-sm-6 top-left">
// //                 <i className="fa fa-rocket"></i>
// //               </div>

// //               <div className="col-sm-6 top-right">
// //                 <h3 className="marginright">INVOICE-1234578</h3>
// //                 <span className="marginright">14 April 2014</span>
// //               </div>
// //             </div>
// //             <hr />
// //             <div className="row">
// //               <div className="col-4 from">
// //                 <p className="lead marginbottom">
// //                   <h5>From : Dynofy </h5>
// //                 </p>
// //                 <p>350 Rhode Island Street</p>
// //                 <p>Suite 240, San Francisco</p>
// //                 <p>California, 94103</p>
// //                 <p>Phone: 415-767-3600</p>
// //                 <p>Email: contact@dynofy.com</p>
// //               </div>

// //               <div className="col-4 to">
// //                 <p className="lead marginbottom">
// //                   <h5>To : John Doe </h5>
// //                 </p>
// //                 <p>425 Market Street</p>
// //                 <p>Suite 2200, San Francisco</p>
// //                 <p>California, 94105</p>
// //                 <p>Phone: 415-676-3600</p>
// //                 <p>Email: john@doe.com</p>
// //               </div>

// //               <div className="col-4 text-right payment-details">
// //                 <p className="lead marginbottom payment-info">
// //                   Payment details
// //                 </p>
// //                 <p>Date: 14 April 2014</p>
// //                 <p>VAT: DK888-777 </p>
// //                 <p>Total Amount: $1019</p>
// //                 <p>Account Name: Flatter</p>
// //               </div>
// //             </div>

// //             <div className="row table-row">
// //               <table className="table table-striped">
// //                 <thead>
// //                   <tr>
// //                     <th className="text-center" styles="width:5%">
// //                       #
// //                     </th>
// //                     <th styles="width:50%">Item</th>
// //                     <th className="text-right" styles="width:15%">
// //                       Quantity
// //                     </th>
// //                     <th className="text-right" styles="width:15%">
// //                       Unit Price
// //                     </th>
// //                     <th className="text-right" styles="width:15%">
// //                       Total Price
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   <tr>
// //                     <td className="text-center">1</td>
// //                     <td>Flatter Theme</td>
// //                     <td className="text-right">10</td>
// //                     <td className="text-right">$18</td>
// //                     <td className="text-right">$180</td>
// //                   </tr>
// //                   <tr>
// //                     <td className="text-center">2</td>
// //                     <td>Flat Icons</td>
// //                     <td className="text-right">6</td>
// //                     <td className="text-right">$59</td>
// //                     <td className="text-right">$254</td>
// //                   </tr>
// //                   <tr>
// //                     <td className="text-center">3</td>
// //                     <td>Wordpress version</td>
// //                     <td className="text-right">4</td>
// //                     <td className="text-right">$95</td>
// //                     <td className="text-right">$285</td>
// //                   </tr>
// //                   <tr className="last-row">
// //                     <td className="text-center">4</td>
// //                     <td>Server Deployment</td>
// //                     <td className="text-right">1</td>
// //                     <td className="text-right">$300</td>
// //                     <td className="text-right">$300</td>
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             </div>

// //             <div className="row">
// //               <div className="col-6 margintop">
// //                 <p className="lead marginbottom">THANK YOU!</p>

// //                 {/* <button className="btn btn-success" id="invoice-print">
// //                   <i className="fa fa-print"></i> Print Invoice
// //                 </button> */}
// //                 <button className="btn btn-danger">
// //                   <i className="fa fa-envelope-o"></i> Mail Invoice
// //                 </button>
// //               </div>
// //               <div className="col-6 text-right pull-right invoice-total">
// //                 <p>Subtotal : $1019</p>
// //                 <p>Discount (10%) : $101 </p>
// //                 <p>VAT (8%) : $73 </p>
// //                 <p>Total : $991 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   </div>
// //   </div>
// //   );
// // }

// // export default mypdf;


// import React from 'react'
// // const data=[{"Date":"4/6/2022","invoice_no":1,"Buyers_name":"Gay","Buyers_pan":"6862239171","item_name":"Glyn","iq":47,"ts":5,"discount":1,"TA":1,"Vat":1,"expsales":1,"country":"Zimbabwe","num":92,"pragmiti":"11/12/2021"},
// // {"Date":"7/19/2021","invoice_no":2,"Buyers_name":"Fayth","Buyers_pan":"9727582834","item_name":"Scarlett","iq":66,"ts":22,"discount":2,"TA":2,"Vat":2,"expsales":2,"country":"Barbados","num":65,"pragmiti":"3/10/2022"},
// // {"Date":"9/14/2021","invoice_no":3,"Buyers_name":"Cecilius","Buyers_pan":"0459675451","item_name":"Vitia","iq":11,"ts":27,"discount":3,"TA":3,"Vat":3,"expsales":3,"country":"Mozambique","num":45,"pragmiti":"4/25/2022"},
// // {"Date":"2/26/2022","invoice_no":4,"Buyers_name":"Ashil","Buyers_pan":"4118940140","item_name":"Ermentrude","iq":11,"ts":85,"discount":4,"TA":4,"Vat":4,"expsales":4,"country":"Lithuania","num":36,"pragmiti":"4/20/2022"},
// // {"Date":"10/4/2021","invoice_no":5,"Buyers_name":"Ermina","Buyers_pan":"1939527813","item_name":"Gert","iq":30,"ts":72,"discount":5,"TA":5,"Vat":5,"expsales":5,"country":"Palestinian Territory","num":28,"pragmiti":"4/15/2022"},
// // {"Date":"7/30/2021","invoice_no":6,"Buyers_name":"James","Buyers_pan":"9560428020","item_name":"Perl","iq":91,"ts":80,"discount":6,"TA":6,"Vat":6,"expsales":6,"country":"Tunisia","num":82,"pragmiti":"5/16/2022"},
// // {"Date":"9/24/2021","invoice_no":7,"Buyers_name":"Mayor","Buyers_pan":"2216248274","item_name":"Caprice","iq":40,"ts":17,"discount":7,"TA":7,"Vat":7,"expsales":7,"country":"China","num":62,"pragmiti":"8/4/2021"},
// // {"Date":"12/17/2021","invoice_no":8,"Buyers_name":"Ikey","Buyers_pan":"7236689599","item_name":"Allissa","iq":68,"ts":92,"discount":8,"TA":8,"Vat":8,"expsales":8,"country":"Colombia","num":74,"pragmiti":"9/5/2021"},
// // {"Date":"11/8/2021","invoice_no":9,"Buyers_name":"Sibel","Buyers_pan":"8246585851","item_name":"Sophie","iq":7,"ts":5,"discount":9,"TA":9,"Vat":9,"expsales":9,"country":"France","num":86,"pragmiti":"9/23/2021"},
// // {"Date":"5/20/2022","invoice_no":10,"Buyers_name":"Geno","Buyers_pan":"5513384574","item_name":"Claude","iq":26,"ts":97,"discount":10,"TA":10,"Vat":10,"expsales":10,"country":"Philippines","num":64,"pragmiti":"5/17/2022"},
// // {"Date":"9/5/2021","invoice_no":11,"Buyers_name":"Agnola","Buyers_pan":"3638757463","item_name":"Aloisia","iq":86,"ts":35,"discount":11,"TA":11,"Vat":11,"expsales":11,"country":"Portugal","num":50,"pragmiti":"2/16/2022"},
// // {"Date":"8/17/2021","invoice_no":12,"Buyers_name":"Artemas","Buyers_pan":"9705032009","item_name":"Anabelle","iq":30,"ts":41,"discount":12,"TA":12,"Vat":12,"expsales":12,"country":"Indonesia","num":18,"pragmiti":"6/29/2021"},
// // {"Date":"4/9/2022","invoice_no":13,"Buyers_name":"Corby","Buyers_pan":"5203906866","item_name":"Devi","iq":26,"ts":67,"discount":13,"TA":13,"Vat":13,"expsales":13,"country":"Brazil","num":80,"pragmiti":"3/15/2022"},
// // {"Date":"9/5/2021","invoice_no":14,"Buyers_name":"Hester","Buyers_pan":"3369391201","item_name":"Tilda","iq":78,"ts":24,"discount":14,"TA":14,"Vat":14,"expsales":14,"country":"Argentina","num":79,"pragmiti":"7/12/2021"},
// // {"Date":"3/17/2022","invoice_no":15,"Buyers_name":"Sonni","Buyers_pan":"3684011630","item_name":"Randie","iq":84,"ts":60,"discount":15,"TA":15,"Vat":15,"expsales":15,"country":"France","num":13,"pragmiti":"5/27/2022"},
// // {"Date":"6/18/2021","invoice_no":16,"Buyers_name":"Darin","Buyers_pan":"3650221829","item_name":"Audrey","iq":95,"ts":67,"discount":16,"TA":16,"Vat":16,"expsales":16,"country":"Luxembourg","num":75,"pragmiti":"11/20/2021"},
// // {"Date":"12/4/2021","invoice_no":17,"Buyers_name":"Hobie","Buyers_pan":"6768716409","item_name":"Gleda","iq":13,"ts":93,"discount":17,"TA":17,"Vat":17,"expsales":17,"country":"Indonesia","num":70,"pragmiti":"6/24/2021"},
// // {"Date":"4/6/2022","invoice_no":18,"Buyers_name":"Helen","Buyers_pan":"5269792370","item_name":"Kissee","iq":39,"ts":45,"discount":18,"TA":18,"Vat":18,"expsales":18,"country":"Russia","num":53,"pragmiti":"4/17/2022"},
// // {"Date":"7/19/2021","invoice_no":19,"Buyers_name":"Sheridan","Buyers_pan":"0860428699","item_name":"Kania","iq":2,"ts":31,"discount":19,"TA":19,"Vat":19,"expsales":19,"country":"China","num":81,"pragmiti":"11/26/2021"},
// // {"Date":"3/30/2022","invoice_no":20,"Buyers_name":"Jeannette","Buyers_pan":"4432606576","item_name":"Yoko","iq":29,"ts":30,"discount":20,"TA":20,"Vat":20,"expsales":20,"country":"Uzbekistan","num":52,"pragmiti":"9/26/2021"},
// // {"Date":"11/2/2021","invoice_no":21,"Buyers_name":"Modestine","Buyers_pan":"5105958039","item_name":"Phillis","iq":91,"ts":65,"discount":21,"TA":21,"Vat":21,"expsales":21,"country":"Indonesia","num":66,"pragmiti":"4/11/2022"},
// // {"Date":"4/2/2022","invoice_no":22,"Buyers_name":"Shannan","Buyers_pan":"0153910011","item_name":"Lynett","iq":73,"ts":39,"discount":22,"TA":22,"Vat":22,"expsales":22,"country":"Colombia","num":98,"pragmiti":"6/1/2022"},
// // {"Date":"1/28/2022","invoice_no":23,"Buyers_name":"Jermaine","Buyers_pan":"0092169023","item_name":"Brittaney","iq":25,"ts":94,"discount":23,"TA":23,"Vat":23,"expsales":23,"country":"Peru","num":57,"pragmiti":"10/26/2021"},
// // {"Date":"6/17/2021","invoice_no":24,"Buyers_name":"Malchy","Buyers_pan":"1418974455","item_name":"Jemimah","iq":24,"ts":76,"discount":24,"TA":24,"Vat":24,"expsales":24,"country":"Indonesia","num":9,"pragmiti":"9/29/2021"},
// // {"Date":"5/26/2022","invoice_no":25,"Buyers_name":"Jolene","Buyers_pan":"3134557991","item_name":"Pandora","iq":17,"ts":16,"discount":25,"TA":25,"Vat":25,"expsales":25,"country":"Indonesia","num":59,"pragmiti":"2/1/2022"},
// // {"Date":"8/15/2021","invoice_no":26,"Buyers_name":"Freda","Buyers_pan":"3313521665","item_name":"Darell","iq":65,"ts":89,"discount":26,"TA":26,"Vat":26,"expsales":26,"country":"Kosovo","num":50,"pragmiti":"7/27/2021"},
// // {"Date":"10/9/2021","invoice_no":27,"Buyers_name":"Sherill","Buyers_pan":"2053204540","item_name":"Esmaria","iq":32,"ts":33,"discount":27,"TA":27,"Vat":27,"expsales":27,"country":"Serbia","num":59,"pragmiti":"5/27/2022"},
// // {"Date":"3/1/2022","invoice_no":28,"Buyers_name":"Billy","Buyers_pan":"2681033896","item_name":"Virgie","iq":82,"ts":46,"discount":28,"TA":28,"Vat":28,"expsales":28,"country":"Indonesia","num":37,"pragmiti":"2/15/2022"},
// // {"Date":"8/6/2021","invoice_no":29,"Buyers_name":"Marrilee","Buyers_pan":"9509005789","item_name":"Lyndsie","iq":54,"ts":23,"discount":29,"TA":29,"Vat":29,"expsales":29,"country":"Russia","num":52,"pragmiti":"1/18/2022"},
// // {"Date":"12/8/2021","invoice_no":30,"Buyers_name":"Isac","Buyers_pan":"1879827263","item_name":"Cherice","iq":48,"ts":41,"discount":30,"TA":30,"Vat":30,"expsales":30,"country":"China","num":95,"pragmiti":"9/19/2021"},
// // {"Date":"8/25/2021","invoice_no":31,"Buyers_name":"Rowen","Buyers_pan":"0715354213","item_name":"Melloney","iq":80,"ts":11,"discount":31,"TA":31,"Vat":31,"expsales":31,"country":"Norway","num":6,"pragmiti":"10/11/2021"},
// // {"Date":"6/13/2022","invoice_no":32,"Buyers_name":"Merrielle","Buyers_pan":"7563663851","item_name":"Nerita","iq":50,"ts":96,"discount":32,"TA":32,"Vat":32,"expsales":32,"country":"Morocco","num":58,"pragmiti":"3/3/2022"},
// // {"Date":"3/17/2022","invoice_no":33,"Buyers_name":"Herschel","Buyers_pan":"3091190811","item_name":"Collen","iq":26,"ts":92,"discount":33,"TA":33,"Vat":33,"expsales":33,"country":"Estonia","num":11,"pragmiti":"4/20/2022"},
// // {"Date":"7/26/2021","invoice_no":34,"Buyers_name":"Fonz","Buyers_pan":"4306179990","item_name":"Abbey","iq":4,"ts":41,"discount":34,"TA":34,"Vat":34,"expsales":34,"country":"Bangladesh","num":52,"pragmiti":"2/18/2022"},
// // {"Date":"4/29/2022","invoice_no":35,"Buyers_name":"Timotheus","Buyers_pan":"5100436492","item_name":"Harmonia","iq":58,"ts":80,"discount":35,"TA":35,"Vat":35,"expsales":35,"country":"Kyrgyzstan","num":60,"pragmiti":"5/10/2022"},
// // {"Date":"1/18/2022","invoice_no":36,"Buyers_name":"Sonnie","Buyers_pan":"3180977868","item_name":"Gaylene","iq":43,"ts":7,"discount":36,"TA":36,"Vat":36,"expsales":36,"country":"Palestinian Territory","num":3,"pragmiti":"3/19/2022"},
// // {"Date":"10/12/2021","invoice_no":37,"Buyers_name":"Terra","Buyers_pan":"1740882008","item_name":"Norrie","iq":66,"ts":22,"discount":37,"TA":37,"Vat":37,"expsales":37,"country":"Portugal","num":13,"pragmiti":"6/23/2021"},
// // {"Date":"9/20/2021","invoice_no":38,"Buyers_name":"Elnora","Buyers_pan":"5619254089","item_name":"Nonie","iq":99,"ts":26,"discount":38,"TA":38,"Vat":38,"expsales":38,"country":"Bolivia","num":80,"pragmiti":"1/12/2022"},
// // {"Date":"4/19/2022","invoice_no":39,"Buyers_name":"Prinz","Buyers_pan":"9073866618","item_name":"Fidela","iq":47,"ts":32,"discount":39,"TA":39,"Vat":39,"expsales":39,"country":"China","num":39,"pragmiti":"10/28/2021"},
// // {"Date":"5/25/2022","invoice_no":40,"Buyers_name":"Ardyce","Buyers_pan":"5599104273","item_name":"Terri-jo","iq":60,"ts":61,"discount":40,"TA":40,"Vat":40,"expsales":40,"country":"Bosnia and Herzegovina","num":51,"pragmiti":"1/21/2022"},
// // {"Date":"3/18/2022","invoice_no":41,"Buyers_name":"Reade","Buyers_pan":"1932483039","item_name":"Lucienne","iq":6,"ts":60,"discount":41,"TA":41,"Vat":41,"expsales":41,"country":"Poland","num":65,"pragmiti":"9/22/2021"},
// // {"Date":"5/7/2022","invoice_no":42,"Buyers_name":"Elsey","Buyers_pan":"8586695432","item_name":"Merline","iq":15,"ts":28,"discount":42,"TA":42,"Vat":42,"expsales":42,"country":"Ukraine","num":70,"pragmiti":"5/28/2022"},
// // {"Date":"1/21/2022","invoice_no":43,"Buyers_name":"Derrik","Buyers_pan":"8747624396","item_name":"Glad","iq":39,"ts":89,"discount":43,"TA":43,"Vat":43,"expsales":43,"country":"Brazil","num":18,"pragmiti":"4/4/2022"},
// // {"Date":"5/27/2022","invoice_no":44,"Buyers_name":"Marje","Buyers_pan":"5600750021","item_name":"Quinn","iq":20,"ts":31,"discount":44,"TA":44,"Vat":44,"expsales":44,"country":"China","num":92,"pragmiti":"6/8/2022"},
// // {"Date":"5/12/2022","invoice_no":45,"Buyers_name":"Grace","Buyers_pan":"5383466304","item_name":"Phyllida","iq":1,"ts":80,"discount":45,"TA":45,"Vat":45,"expsales":45,"country":"Japan","num":17,"pragmiti":"12/8/2021"},
// // {"Date":"9/9/2021","invoice_no":46,"Buyers_name":"Almire","Buyers_pan":"2201012814","item_name":"Marcela","iq":29,"ts":72,"discount":46,"TA":46,"Vat":46,"expsales":46,"country":"China","num":93,"pragmiti":"12/4/2021"},
// // {"Date":"8/22/2021","invoice_no":47,"Buyers_name":"Zared","Buyers_pan":"0626199255","item_name":"Lola","iq":88,"ts":89,"discount":47,"TA":47,"Vat":47,"expsales":47,"country":"Brazil","num":96,"pragmiti":"10/16/2021"},
// // {"Date":"4/23/2022","invoice_no":48,"Buyers_name":"Glynn","Buyers_pan":"7002126695","item_name":"Vikki","iq":64,"ts":43,"discount":48,"TA":48,"Vat":48,"expsales":48,"country":"Ukraine","num":6,"pragmiti":"10/10/2021"},
// // {"Date":"12/9/2021","invoice_no":49,"Buyers_name":"Baryram","Buyers_pan":"4050014416","item_name":"Sondra","iq":3,"ts":65,"discount":49,"TA":49,"Vat":49,"expsales":49,"country":"Iran","num":85,"pragmiti":"2/2/2022"},
// // {"Date":"9/29/2021","invoice_no":50,"Buyers_name":"Ronna","Buyers_pan":"6489300117","item_name":"Teri","iq":57,"ts":64,"discount":50,"TA":50,"Vat":50,"expsales":50,"country":"United Kingdom","num":40,"pragmiti":"10/7/2021"},
// // {"Date":"7/27/2021","invoice_no":51,"Buyers_name":"Waylon","Buyers_pan":"1736413341","item_name":"Charissa","iq":88,"ts":48,"discount":51,"TA":51,"Vat":51,"expsales":51,"country":"China","num":9,"pragmiti":"6/14/2022"},
// // {"Date":"5/3/2022","invoice_no":52,"Buyers_name":"Quintana","Buyers_pan":"4242186576","item_name":"Stepha","iq":50,"ts":16,"discount":52,"TA":52,"Vat":52,"expsales":52,"country":"Portugal","num":75,"pragmiti":"2/10/2022"},
// // {"Date":"3/1/2022","invoice_no":53,"Buyers_name":"Gaspar","Buyers_pan":"7875063159","item_name":"Missy","iq":81,"ts":92,"discount":53,"TA":53,"Vat":53,"expsales":53,"country":"Philippines","num":51,"pragmiti":"10/4/2021"},
// // {"Date":"8/22/2021","invoice_no":54,"Buyers_name":"Brew","Buyers_pan":"8220906421","item_name":"Hinda","iq":61,"ts":30,"discount":54,"TA":54,"Vat":54,"expsales":54,"country":"China","num":9,"pragmiti":"9/25/2021"},
// // {"Date":"8/3/2021","invoice_no":55,"Buyers_name":"Tricia","Buyers_pan":"5471017455","item_name":"Melisenda","iq":8,"ts":87,"discount":55,"TA":55,"Vat":55,"expsales":55,"country":"Spain","num":62,"pragmiti":"5/27/2022"},
// // {"Date":"7/25/2021","invoice_no":56,"Buyers_name":"Francisco","Buyers_pan":"3817329822","item_name":"Tiphany","iq":28,"ts":76,"discount":56,"TA":56,"Vat":56,"expsales":56,"country":"Indonesia","num":52,"pragmiti":"11/5/2021"},
// // {"Date":"10/11/2021","invoice_no":57,"Buyers_name":"Timothy","Buyers_pan":"2838836943","item_name":"Paulina","iq":23,"ts":8,"discount":57,"TA":57,"Vat":57,"expsales":57,"country":"Russia","num":27,"pragmiti":"12/21/2021"},
// // {"Date":"5/21/2022","invoice_no":58,"Buyers_name":"Wittie","Buyers_pan":"1612390315","item_name":"Gertrud","iq":56,"ts":98,"discount":58,"TA":58,"Vat":58,"expsales":58,"country":"Brazil","num":83,"pragmiti":"5/1/2022"},
// // {"Date":"11/24/2021","invoice_no":59,"Buyers_name":"Paulette","Buyers_pan":"4071148683","item_name":"Mandi","iq":86,"ts":67,"discount":59,"TA":59,"Vat":59,"expsales":59,"country":"Peru","num":65,"pragmiti":"4/18/2022"},
// // {"Date":"11/14/2021","invoice_no":60,"Buyers_name":"Rahal","Buyers_pan":"3389095209","item_name":"Josee","iq":48,"ts":23,"discount":60,"TA":60,"Vat":60,"expsales":60,"country":"Philippines","num":34,"pragmiti":"2/18/2022"},
// // {"Date":"1/22/2022","invoice_no":61,"Buyers_name":"Edlin","Buyers_pan":"4166259644","item_name":"Adrian","iq":61,"ts":74,"discount":61,"TA":61,"Vat":61,"expsales":61,"country":"Venezuela","num":49,"pragmiti":"2/12/2022"},
// // {"Date":"9/18/2021","invoice_no":62,"Buyers_name":"Erhart","Buyers_pan":"9218677829","item_name":"Renee","iq":19,"ts":49,"discount":62,"TA":62,"Vat":62,"expsales":62,"country":"Russia","num":84,"pragmiti":"3/25/2022"},
// // {"Date":"12/7/2021","invoice_no":63,"Buyers_name":"Adeline","Buyers_pan":"2506159193","item_name":"Aidan","iq":31,"ts":36,"discount":63,"TA":63,"Vat":63,"expsales":63,"country":"Japan","num":63,"pragmiti":"5/12/2022"},
// // {"Date":"7/12/2021","invoice_no":64,"Buyers_name":"Veronique","Buyers_pan":"7514644725","item_name":"Blair","iq":84,"ts":86,"discount":64,"TA":64,"Vat":64,"expsales":64,"country":"Sweden","num":77,"pragmiti":"1/8/2022"},
// // {"Date":"1/6/2022","invoice_no":65,"Buyers_name":"Sharlene","Buyers_pan":"7154309946","item_name":"Deborah","iq":7,"ts":37,"discount":65,"TA":65,"Vat":65,"expsales":65,"country":"China","num":56,"pragmiti":"3/21/2022"},
// // {"Date":"12/2/2021","invoice_no":66,"Buyers_name":"Olympie","Buyers_pan":"6155176817","item_name":"Daisi","iq":45,"ts":20,"discount":66,"TA":66,"Vat":66,"expsales":66,"country":"China","num":16,"pragmiti":"9/8/2021"},
// // {"Date":"6/13/2022","invoice_no":67,"Buyers_name":"Caril","Buyers_pan":"2319418520","item_name":"Vicky","iq":5,"ts":7,"discount":67,"TA":67,"Vat":67,"expsales":67,"country":"Russia","num":9,"pragmiti":"8/10/2021"},
// // {"Date":"1/3/2022","invoice_no":68,"Buyers_name":"Gerta","Buyers_pan":"2510979671","item_name":"Krissie","iq":5,"ts":59,"discount":68,"TA":68,"Vat":68,"expsales":68,"country":"Hungary","num":34,"pragmiti":"6/22/2021"},
// // {"Date":"4/7/2022","invoice_no":69,"Buyers_name":"Torey","Buyers_pan":"1367786843","item_name":"Hedvige","iq":79,"ts":91,"discount":69,"TA":69,"Vat":69,"expsales":69,"country":"China","num":11,"pragmiti":"3/25/2022"},
// // {"Date":"12/4/2021","invoice_no":70,"Buyers_name":"Waldon","Buyers_pan":"1524688576","item_name":"Wilhelmina","iq":48,"ts":34,"discount":70,"TA":70,"Vat":70,"expsales":70,"country":"China","num":32,"pragmiti":"11/5/2021"},
// // {"Date":"11/8/2021","invoice_no":71,"Buyers_name":"Birch","Buyers_pan":"5202180152","item_name":"Maye","iq":83,"ts":31,"discount":71,"TA":71,"Vat":71,"expsales":71,"country":"Philippines","num":70,"pragmiti":"5/14/2022"},
// // {"Date":"7/26/2021","invoice_no":72,"Buyers_name":"Guy","Buyers_pan":"3051393142","item_name":"Farrand","iq":28,"ts":29,"discount":72,"TA":72,"Vat":72,"expsales":72,"country":"Peru","num":68,"pragmiti":"9/7/2021"},
// // {"Date":"12/4/2021","invoice_no":73,"Buyers_name":"Karlens","Buyers_pan":"6946590562","item_name":"Lebbie","iq":64,"ts":51,"discount":73,"TA":73,"Vat":73,"expsales":73,"country":"Mongolia","num":14,"pragmiti":"3/4/2022"},
// // {"Date":"11/6/2021","invoice_no":74,"Buyers_name":"Mordecai","Buyers_pan":"0891401547","item_name":"Adey","iq":75,"ts":72,"discount":74,"TA":74,"Vat":74,"expsales":74,"country":"Ukraine","num":25,"pragmiti":"4/22/2022"},
// // {"Date":"2/16/2022","invoice_no":75,"Buyers_name":"Thomasa","Buyers_pan":"8251161282","item_name":"Michal","iq":33,"ts":13,"discount":75,"TA":75,"Vat":75,"expsales":75,"country":"Indonesia","num":3,"pragmiti":"6/3/2022"},
// // {"Date":"12/6/2021","invoice_no":76,"Buyers_name":"Amberly","Buyers_pan":"8124267758","item_name":"Nalani","iq":82,"ts":73,"discount":76,"TA":76,"Vat":76,"expsales":76,"country":"China","num":70,"pragmiti":"9/3/2021"},
// // {"Date":"5/10/2022","invoice_no":77,"Buyers_name":"Bidget","Buyers_pan":"3900516553","item_name":"Asia","iq":44,"ts":40,"discount":77,"TA":77,"Vat":77,"expsales":77,"country":"Indonesia","num":68,"pragmiti":"4/6/2022"},
// // {"Date":"12/10/2021","invoice_no":78,"Buyers_name":"Phillida","Buyers_pan":"7383519124","item_name":"Charlene","iq":74,"ts":79,"discount":78,"TA":78,"Vat":78,"expsales":78,"country":"Portugal","num":98,"pragmiti":"10/19/2021"},
// // {"Date":"2/7/2022","invoice_no":79,"Buyers_name":"Floyd","Buyers_pan":"9645573963","item_name":"Nettie","iq":91,"ts":62,"discount":79,"TA":79,"Vat":79,"expsales":79,"country":"China","num":86,"pragmiti":"12/6/2021"},
// // {"Date":"11/16/2021","invoice_no":80,"Buyers_name":"Jonell","Buyers_pan":"6000448953","item_name":"Margette","iq":8,"ts":62,"discount":80,"TA":80,"Vat":80,"expsales":80,"country":"Philippines","num":23,"pragmiti":"6/27/2021"},
// // {"Date":"10/27/2021","invoice_no":81,"Buyers_name":"Reine","Buyers_pan":"3954065274","item_name":"Martita","iq":3,"ts":90,"discount":81,"TA":81,"Vat":81,"expsales":81,"country":"Cambodia","num":12,"pragmiti":"4/8/2022"},
// // {"Date":"3/4/2022","invoice_no":82,"Buyers_name":"Say","Buyers_pan":"3496450428","item_name":"Millicent","iq":95,"ts":87,"discount":82,"TA":82,"Vat":82,"expsales":82,"country":"Indonesia","num":61,"pragmiti":"9/8/2021"},
// // {"Date":"5/27/2022","invoice_no":83,"Buyers_name":"Helli","Buyers_pan":"9429892681","item_name":"Fenelia","iq":12,"ts":67,"discount":83,"TA":83,"Vat":83,"expsales":83,"country":"Indonesia","num":11,"pragmiti":"11/3/2021"},
// // {"Date":"2/21/2022","invoice_no":84,"Buyers_name":"Justen","Buyers_pan":"0270254986","item_name":"Helge","iq":35,"ts":78,"discount":84,"TA":84,"Vat":84,"expsales":84,"country":"Indonesia","num":5,"pragmiti":"7/12/2021"},
// // {"Date":"6/18/2021","invoice_no":85,"Buyers_name":"Tanny","Buyers_pan":"8477967504","item_name":"Natty","iq":79,"ts":90,"discount":85,"TA":85,"Vat":85,"expsales":85,"country":"Zambia","num":92,"pragmiti":"6/16/2021"},
// // {"Date":"6/18/2021","invoice_no":86,"Buyers_name":"Georgena","Buyers_pan":"8390093200","item_name":"Annalise","iq":33,"ts":31,"discount":86,"TA":86,"Vat":86,"expsales":86,"country":"China","num":97,"pragmiti":"2/10/2022"},
// // {"Date":"3/8/2022","invoice_no":87,"Buyers_name":"Matty","Buyers_pan":"9072095448","item_name":"Cynde","iq":49,"ts":23,"discount":87,"TA":87,"Vat":87,"expsales":87,"country":"France","num":87,"pragmiti":"11/10/2021"},
// // {"Date":"3/6/2022","invoice_no":88,"Buyers_name":"Silvana","Buyers_pan":"7471809469","item_name":"Eleanore","iq":47,"ts":13,"discount":88,"TA":88,"Vat":88,"expsales":88,"country":"Kenya","num":71,"pragmiti":"12/30/2021"},
// // {"Date":"6/25/2021","invoice_no":89,"Buyers_name":"Waiter","Buyers_pan":"5024727916","item_name":"Shaine","iq":83,"ts":19,"discount":89,"TA":89,"Vat":89,"expsales":89,"country":"China","num":2,"pragmiti":"11/13/2021"},
// // {"Date":"7/19/2021","invoice_no":90,"Buyers_name":"Rafaelia","Buyers_pan":"0086541234","item_name":"Marcela","iq":6,"ts":52,"discount":90,"TA":90,"Vat":90,"expsales":90,"country":"Philippines","num":34,"pragmiti":"8/6/2021"},
// // {"Date":"9/30/2021","invoice_no":91,"Buyers_name":"Agathe","Buyers_pan":"0280907192","item_name":"Dorene","iq":90,"ts":5,"discount":91,"TA":91,"Vat":91,"expsales":91,"country":"Botswana","num":19,"pragmiti":"8/17/2021"},
// // {"Date":"5/9/2022","invoice_no":92,"Buyers_name":"Edouard","Buyers_pan":"5944484829","item_name":"Veda","iq":69,"ts":49,"discount":92,"TA":92,"Vat":92,"expsales":92,"country":"United Kingdom","num":6,"pragmiti":"7/28/2021"},
// // {"Date":"4/27/2022","invoice_no":93,"Buyers_name":"Jessica","Buyers_pan":"9621485967","item_name":"Bonny","iq":11,"ts":46,"discount":93,"TA":93,"Vat":93,"expsales":93,"country":"Croatia","num":77,"pragmiti":"3/17/2022"},
// // {"Date":"1/14/2022","invoice_no":94,"Buyers_name":"Odell","Buyers_pan":"4538011851","item_name":"Jewell","iq":83,"ts":20,"discount":94,"TA":94,"Vat":94,"expsales":94,"country":"Argentina","num":94,"pragmiti":"8/2/2021"},
// // {"Date":"11/14/2021","invoice_no":95,"Buyers_name":"Rubetta","Buyers_pan":"4143279770","item_name":"Winni","iq":5,"ts":39,"discount":95,"TA":95,"Vat":95,"expsales":95,"country":"China","num":18,"pragmiti":"4/5/2022"},
// // {"Date":"4/29/2022","invoice_no":96,"Buyers_name":"Chrisy","Buyers_pan":"4394288118","item_name":"Natalie","iq":39,"ts":99,"discount":96,"TA":96,"Vat":96,"expsales":96,"country":"Indonesia","num":91,"pragmiti":"4/17/2022"},
// // {"Date":"6/23/2021","invoice_no":97,"Buyers_name":"Amalita","Buyers_pan":"1365047199","item_name":"Daisey","iq":10,"ts":53,"discount":97,"TA":97,"Vat":97,"expsales":97,"country":"United States","num":58,"pragmiti":"12/28/2021"},
// // {"Date":"1/4/2022","invoice_no":98,"Buyers_name":"Arney","Buyers_pan":"0293024138","item_name":"Milli","iq":87,"ts":61,"discount":98,"TA":98,"Vat":98,"expsales":98,"country":"China","num":84,"pragmiti":"10/1/2021"},
// // {"Date":"5/31/2022","invoice_no":99,"Buyers_name":"Gasparo","Buyers_pan":"7205664160","item_name":"Gael","iq":88,"ts":16,"discount":99,"TA":99,"Vat":99,"expsales":99,"country":"South Africa","num":26,"pragmiti":"7/10/2021"},
// // {"Date":"3/6/2022","invoice_no":100,"Buyers_name":"Hilary","Buyers_pan":"1448685516","item_name":"Oralla","iq":37,"ts":11,"discount":100,"TA":100,"Vat":100,"expsales":100,"country":"China","num":40,"pragmiti":"4/17/2022"}]
// const Pdf = () => {
//   return (
//     <div className='reportPage'>
//       <div className='reportHeader'>
//         <p className='companyName'>Bounce Zone Pvt. Ltd</p>
//         <p className='companyAddress'>Koteshwor, Kathmandu</p>
//         <p className='companyPan'>Pan No :609647389</p>
//         <p className='companyReport'>Restaurant Sales Report Format</p>
//         <div className='date'>
//           <p>From: Wednesday, June 15, 2022</p>
//           <p>To: Wednesday, June 15, 2022</p>
//         </div>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Invoice Number</th>
//             <th>Buyer Name</th>
//             <th>Buyer PAN</th>
//             <th>Item Name</th>
//             <th>Quantity</th>
//             <th>Unit</th>
//             <th>Total Sales</th>
//             <th>Discount</th>
//             <th>Taxable Amount</th>
//             <th>VAT</th>
//             <th>Export Sales</th>
//             <th>Country</th>
//             <th>Pragyapan Patra No.</th>
//             <th>Pragyapan Patra Miti</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((i)=>
//           <tr>
//             <td>{i.Date}</td>
//             <td>{i.invoice_no}</td>
//             <td>{i.Buyers_name}</td>
//             <td>{i.Buyers_pan}</td>
//             <td>{i.item_name}</td>
//             <td>{i.iq}</td>
//             <td>{i.iq}</td>
//             <td>{i.ts}</td>
//             <td>{i.discount}</td>
//             <td>{i.TA}</td>
//             <td>{i.Vat}</td>
//             <td>{i.expsales}</td>
//             <td>{i.country}</td>
//             <td>{i.num}</td>
//             <td>{i.pragmiti}</td>
//           </tr>         
//           )}
//         </tbody>
//         {/* <tfoot>
//           <tr>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//             <td>-</td>
//           </tr>
//         </tfoot> */}
//       </table>
//     </div>
//   )
// }

// export default Pdf
