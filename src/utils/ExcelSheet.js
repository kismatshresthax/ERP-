import React, { useContext, useState } from 'react'

import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import { SiMicrosoftexcel } from "react-icons/si"
import CompanyContext from '../contexts/CompanyContext';



const ExcelSheet = (props) => {
  const title = props.title
  const data = props.data
  console.log(data)

  console.log("data", data)

  // console.log(title)
  const companyContext = useContext(CompanyContext);





  const createDownLoadData = () => {
    return handleExport().then(url => {

      console.log("url", url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", props.title);
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



    const name = [{ A: companyContext.company.name }];
    const address = [{ A: companyContext.company.address }];
    const panNo = [{ A: "Pan No:" + companyContext.company.panNo }];
    const title = [{ A: props.title }];

    let table1 = data[0]


    console.log("table1", table1)
    const finalData = [...name, ...address, ...panNo, ...title, ...table1];
    console.log("finalData", finalData)
    // Creating WorkBook
    const wb = XLSX.utils.book_new();

    // Creating WorkSheet
    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, props.title);

    const workbookBlob = workbook2blob(wb);

    const obj = table1[0]
    const key=Object.keys(obj)

    const dataInfo = {

      nameCell: "A1",
      nameRange: `A1:${key[key.length-1]}1`,
      addressCell: "A2",
      addressRange: `A2:${key[key.length-1]}2`,
      panNoCell: "A3",
      panNoRange: `A3:${key[key.length-1]}3`,
      titleCell: "A4",
      titleRange: `A4:${key[key.length-1]}4`,
      // theadRange: `A5:C${finalData.length}`,
      // tbodyCell:`A6:C${finalData.length}`

    };
    return addStyles(workbookBlob, dataInfo);
  };

  const addStyles = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then(workbook => {
      workbook.sheets().forEach(sheet => {
        // sheet.usedRange.style({
        //   fontFamily: 'Arial',
        //   verticalAlignment: 'center'
        // })

        sheet.column('A').width(30)
        sheet.column('B').width(20)
        sheet.column('C').width(20)
        sheet.column('D').width(20)
        sheet.column('E').width(20)
        sheet.column('F').width(20)
        sheet.column('H').width(20)
        sheet.column('G').width(20)
        sheet.column('I').width(20)
        sheet.column('J').width(20)
        sheet.column('K').width(20)
        sheet.column('L').width(20)

        sheet.row(5).style({bold:true})
        




        sheet.range(dataInfo.nameRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.addressRange).merged(true).style({

          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.panNoRange).merged(true).style({

          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        // sheet.range(dataInfo.theadRange).style({
        //   border:true,
        //   horizontalAlignment: "left",
        //   verticalAlignment: "center",
        // });
      })
      return workbook.outputAsync().then(workbookBlob => URL.createObjectURL(workbookBlob))
    })
  }

  return (
    <button
      className="btn  btn-sm  fw-medium fs-4 d-flex mx-auto my-auto   d-flex align-items-center gap-2 px-3"

      onClick={
        createDownLoadData
      }
    >
      <SiMicrosoftexcel className='h-100 w-100' /><p className='my-0 fs-5'> Excel</p>
    </button>
  )
}

export default ExcelSheet
