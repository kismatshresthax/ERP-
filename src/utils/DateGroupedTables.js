
import React from 'react';
import { format } from "date-fns";



function DateGroupedTables({ records, table1, table2 }) {


    var adbs = require("ad-bs-converter");

   
    const mergedData = [].concat(...table2);

  // Group the merged data by date
  const groupedData = mergedData.reduce((acc, item) => {
    const date = item.B; // Replace with the actual date property name
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

    return (
        <>
           {Object.keys(groupedData).map(date => {


                return (<>
                    <table>

                        <thead>

                            {table1.map((table1) => (


                                <tr>
                                    <th>{table1.B}</th>
                                    <th>{table1.C}</th>
                                    <th>{table1.D}</th>
                                    <th>{table1.E}</th>
                                    <th>{table1.F}</th>
                                    <th>{table1.G}</th>
                                    {table1.Z==""?"":<> 
                                    <th>{table1.H}</th>
                                    <th>{table1.I}</th>
                                    <th>{table1.J}</th>
                                    <th>{table1.K}</th>
                                    <th>{table1.L}</th>
                                    <th>{table1.M}</th>
                                    <th>{table1.N}</th>
                                    <th>{table1.O}</th>
                                    <th>{table1.P}</th>
                                    <th>{table1.Q}</th>
                                    <th>{table1.R}</th></>}
                                   

                                </tr>
                            ))}
                        </thead>

                       
                            <tbody >

                            
                               {groupedData[date].map(i => (

                                    <tr key={i.id}>
                                        <td>
                                            {i.B}
                                        </td>
                                        <td>
                                            {i.C}
                                        </td>
                                        <td>{i.D}</td>
                                        <td>{i.E || ""}</td>
                                        <td>{i.F}</td>
                                        <td>{i.G}</td>
                                        {i.Z==""?"":<>
                                        <td>{i.H}</td>
                                         <td>{i.I}</td>
                                        <td>{i.J}</td>
                                        <td>{i.K}</td>
                                        <td>{i.L}</td>
                                        <td>{i.M}</td>
                                        <td>{i.N}</td>
                                        <td>{i.O || ""}</td>
                                        <td>{i.P || ""}</td>
                                        <td>{i.Q || ""}</td>
                                        <td>{i.R || ""}</td></>}
                                       
                                    </tr>


                                ))}
                               
                            </tbody>
                        
                    </table>
                    <hr /> 
                </>)
})}




            
        </>
    )
}

export default DateGroupedTables;


