import React, { useContext, useState } from 'react'

import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import { SiMicrosoftexcel } from "react-icons/si"



const ExcelSheet = (props) => {

  const data = props.data
  console.log(data)
  // const { values } = useForm();
  // const userSessionContext = useContext(UserSessionContext);
  // const companyContext = useContext(CompanyContext);

  const createDownLoadData = () => {
    return handleExport().then(url => {
   
   
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href",url);
      downloadAnchorNode.setAttribute("download","Trial_Report.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };
 
 


  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);


    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {

    const buf = new ArrayBuffer(s.length);


    const view = new Uint8Array(buf);

    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {


    // const name = [{ A: companyContext.company.name }];
    // const address = [{ A: companyContext.company.address }];
    // const panNo = [{ A: "Pan No:" + companyContext.company.panNo }];
    // const title = [{ A: "Trial Balance Report" }];

    let table1 = [
      {
        A: "Ledger Name",
        B: "Debit",
        c: "Credit"
      }
    ]

    console.log("data", data)
    data.forEach((items) => {
      table1.push({
        A: items.ledgerName,
        B: parseFloat(items.dr_cr === "dr" ? items.amount : 0).toFixed(2),
        C: parseFloat(items.dr_cr === "cr" ? items.amount : 0).toFixed(2),
      })
    })
    console.log("table1", table1)
    const finalData = [...table1];

    // Creating WorkBook
    const wb = XLSX.utils.book_new();

    // Creating WorkSheet
    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "Trialbalance_report");

    const workbookBlob = workbook2blob(wb);

    // let headerIndexes = [];

    // finalData.forEach((data, index) =>
    //     data["A"] === "legder" ? headerIndexes.push(index) : null
    // );

    // const dataInfo = {

    //   nameCell: "A1",
    //   nameRange: "A1:C1",
    //   addressCell: "A2",
    //   addressRange: "A2:C2",
    //   panNoCell: "A3",
    //   panNoRange: "A3:C3",
    //   titleCell: "A4",
    //   titleRange: "A4:C4",

    //   // dateToCell: "A6",
    //   // dateToRange: "A6:C6",
    //   tbodyRange: `A5:C${finalData.length}`,
    //   theadRange:
    //     headerIndexes?.length >= 1
    //       ? `A${headerIndexes[0] + 1}:C${headerIndexes[0] + 1}`
    //       : null,

    // };
    return addStyles(workbookBlob);
  };

  const addStyles = (workbookBlob) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then(workbook => {
      workbook.sheets().forEach(sheet => {
        // sheet.usedRange.style({
        //   fontFamily: 'Arial',
        //   verticalAlignment: 'center'
        // })
      })
      return workbook.outputAsync().then(workbookBlob => URL.createObjectURL(workbookBlob))
    })
  }
  // const addStyle = (workbookBlob, dataInfo) => {
  //   return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
  //     workbook.sheets().forEach((sheet) => {
  //       // sheet.usedRange().style({
  //       //   fontFamily: "Arial",
  //       //   verticalAlignment: "center",
  //       // });

  //       sheet.column("A").width(35);
  //       sheet.column("B").width(25);
  //       sheet.column("C").width(15);

  //       sheet.range(dataInfo.titleRange).merged(true).style({
  //         bold: true,
  //         horizontalAlignment: "center",
  //         verticalAlignment: "center",
  //       });
  //       sheet.range(dataInfo.nameRange).merged(true).style({
  //         bold: true,
  //         horizontalAlignment: "center",
  //         verticalAlignment: "center",
  //       });

  //       sheet.range(dataInfo.addressRange).merged(true).style({
  //         bold: true,
  //         horizontalAlignment: "center",
  //         verticalAlignment: "center",
  //       });
  //       sheet.range(dataInfo.panNoRange).merged(true).style({
  //         bold: true,
  //         horizontalAlignment: "center",
  //         verticalAlignment: "center",
  //       });


  //       if (dataInfo.tbodyRange) {
  //         sheet.range(dataInfo.tbodyRange).style({
  //           horizontalAlignment: "left",
  //         });
  //       }

  //       sheet.range(dataInfo.theadRange).style({
  //         bold: true,
  //         horizontalAlignment: "center",
  //       });


  //     });

  //     return workbook
  //       .outputAsync()
  //       .then((workbookBlob) => URL.createObjectURL(workbookBlob));
  //   });
  // };

  return (
    <button
      className="btn btn-primary btn-sm text-white fw-bold fs-4 d-flex mx-auto my-auto shadow rounded "
  
      onClick={
        createDownLoadData
      }
    >
      <SiMicrosoftexcel />
    </button>
  )
}

export default ExcelSheet
