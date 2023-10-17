
import React from 'react';



function PurchasedetailTable({ table1, table2, table3, TData, table4, table5, voidtable }) {

  console.log(voidtable)






  return (
    <>
  
      <table >

      <thead>
        {table1.map((table1, index) => (



          <tr key={index} style={{
            position: 'sticky',
            top: "0",
            backgroundColor: '#fff'
          }}>
            <th>{table1.B}</th>
            <th>{table1.C}</th>
            <th>{table1.D}</th>
            <th>{table1.E}</th>
            <th>{table1.F}</th>
            <th>{table1.G}</th>
            {table1.Z == '' ? "" : <>

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
              <th>{table1.R}</th>
            </>}


          </tr>
        ))}
</thead>

        <tbody>

          {table2.map((i) => (
            i.map((i, index) =>
              <tr key={i.A} >
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
                {i.Z == "" ? "" : <> 

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
            )


          ))}


          {table3 ? table3.map((i) =>
            <tr>
              <td colSpan={3}><b>{i.A}</b></td>
              <td>{i.B}</td>
              <td>{i.C}</td>
              <td>{i.D}</td>
              <td>{i.E}</td>
              <td>{i.F}</td>
              <td>{i.G}</td>
              {table1.Z == '' ? "" : <>

              <td>{i.H}</td>
                <td>{i.I}</td>
                <td>{i.J}</td>
                <td>{i.K}</td>
                <td>{i.L}</td>
                <td>{i.M}</td>
                <td>{i.N}</td>
                <td>{i.O}</td>
                
               
              </>}
            </tr>
          ) : ""}




          {TData ? <>


            <tr >
              <td colSpan={15}><h5>Return Data</h5></td>
            </tr>
            {TData.map((item) =>

              item.map((item, index) =>
                <tr key={item}>
                  <td>

                    {item.B}
                  </td><td>

                    {item.C}
                  </td>
                  <td>
                    {item.D}
                  </td>
                  <td>{item.E}</td>

                  <td>{item.F}</td>
                  <td></td>
                  <td>{item.H}</td>
                  <td>{item.I}</td>
                  <td>{item.J}</td>
                  <td>{item.K}</td>
                  <td>{item.L}</td>
                  <td>{item.M}</td>
                  <td>{item.N}</td>
                  <td>{item.O}</td>
                  <td>{item.P}</td>

                  <td>{item.Q}</td>
                  <td></td>



                </tr>

              )
            )}

            {table4.map((i) =>
              <tr>
                <td colSpan={9}><b> Total</b></td>
                <td >{i.K}</td>
                <td>{i.L}</td>
                <td>{i.M}</td>
                <td>{i.N}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>


              </tr>





            )}

            {table5.map((i) =>
              <tr>
                <td colSpan={9}><b>Grand Total</b> </td>
                <td>{i.K}</td>
                <td>{i.L}</td>
                <td>{i.M}</td>
                <td>{i.N}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>


              </tr>





            )}
          </>
            : ""}



        </tbody>


      </table>
      {voidtable ?
        <>
          <h5 style={{ textAlign: 'center' }} >Void Data</h5>
          <table>
            {voidtable.map((item) =>
              <tr>
                <td>

                  {item.B}
                </td>
                <td>

                  {item.C}
                </td>
                <td>
                  {item.D}
                </td>
                <td>{item.E}</td>

                <td>{item.F}</td>
                <td>{item.G}</td>
                <td>{item.H}</td>
                <td>{item.I}</td>
                <td>{item.J}</td>
                <td>{item.K}</td>
                <td>{item.L}</td>
                <td>{item.M}</td>
                <td>{item.N}</td>



              </tr>
            )}
          </table>
        </>
        : ""}

    </>
  )
}

export default PurchasedetailTable;
