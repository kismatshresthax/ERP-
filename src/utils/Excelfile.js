
import * as XLSX from "xlsx";
import {SiMicrosoftexcel} from 'react-icons/si';
const Excelfile = (props) => {
  const trans = props.data;

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(trans);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button
      className="btn btn-primary btn-sm text-white fw-bold fs-4 d-flex mx-auto my-auto shadow rounded "
      onClick={(e) => exportToCSV(e)}
      style={{ }}
    >
      <SiMicrosoftexcel/>
    </button>
  );
};
export default Excelfile;
