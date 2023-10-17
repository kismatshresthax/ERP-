import React, { useContext } from 'react'
import { BsFilePdf } from 'react-icons/bs'
import {jsPDF} from 'jspdf'
 import autoTable from 'jspdf-autotable'
import CompanyContext from '../../../contexts/CompanyContext'


const PDF = (props) => {
    const data = props.data
    const title = props.title
  

    const createDownLoadData =() =>{
        const doc = new jsPDF()
  

        const body = data.slice(1,data.length)

        // doc.autoTable({
        //     head : [data[0]],
        //     body : body
        // })
        doc.save("hello");
    }
    return (
        <button className="btn  btn-sm  fw-medium fs-4 d-flex mx-auto my-auto   d-flex align-items-center gap-2 px-3"
            onClick={createDownLoadData}>
                <BsFilePdf />
                <p className='my-0 fs-5'> PDF</p>
        </button>
    )
}

export default PDF