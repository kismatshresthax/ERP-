import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import Controls from "../../controls/Controls";
import { Tooltip } from "@material-ui/core";
import Select from "react-select";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    // <tr>
    //   <td>
    //     <input
    //       type="text"
    //       required="required"
    //       placeholder="Enter a name..."
    //       name="fullName"
    //       value={editFormData.fullName}
    //       onChange={handleEditFormChange}
    //     ></input>
    //   </td>
    //   <td>
    //     <input
    //       type="text"
    //       required="required"
    //       placeholder="Enter an address..."
    //       name="address"
    //       value={editFormData.address}
    //       onChange={handleEditFormChange}
    //     ></input>
    //   </td>
    //   <td>
    //     <input
    //       type="text"
    //       required="required"
    //       placeholder="Enter a phone number..."
    //       name="phoneNumber"
    //       value={editFormData.phoneNumber}
    //       onChange={handleEditFormChange}
    //     ></input>
    //   </td>
    //   <td>
    //     <input
    //       type="email"
    //       required="required"
    //       placeholder="Enter an email..."
    //       name="email"
    //       value={editFormData.email}
    //       onChange={handleEditFormChange}
    //     ></input>
    //   </td>
    //   <td>
    //     <button type="submit">Save</button>
    //     <button type="button" onClick={handleCancelClick}>
    //       Cancel
    //     </button>
    //   </td>
    // </tr>
    <tr>
      <td></td>
      <td>
        <Select
          type="text"
          placeholder={"Add Product"}
          options={editFormData.allProducts}
          value={editFormData.productId}
          onChange={(e) => {
            editFormData.setProductId(e);
            editFormData.loadUnitById(e.value);
          }}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          menuPortalTarget={document.body}
        />
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Qty"
          name="qty"
          value={editFormData.productQty}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Select
          label="Unit"
          name="units"
          options={editFormData.units}
          value={editFormData.unit}
          onChange={(e) => {
            editFormData.setUnit(e);
          }}
          required={true}
        />
      </td>
      <td>
        <input
          disabled
          type="number"
          required="required"
          placeholder="Rate"
          name="productCost"
          value={editFormData.productCost}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          disabled
          type="number"
          required="required"
          placeholder="Total"
          name="productTotal"
          value={editFormData.productTotal}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Dis.(%)"
          name="productDiscount"
          value={editFormData.productDiscount}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Select
          label="Tax"
          name="taxPercent"
          // value={editFormData.taxPercent.label}
          // onChange={handleInputChange}
          options={editFormData.taxRates}
          onClick={(e) => {
            editFormData.setTaxPercent(e.target.value);
          }}
        />
      </td>
      <td>
        <input
          disabled
          type="number"
          required="required"
          placeholder="Subtotal"
          name="productSubtotal"
          value={editFormData.productSubtotal}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Controls.ActionButton
          type="submit"
          size="small"
          variant="contained"
          color="warning"
        >
          <Tooltip title="Save" placement="top" arrow>
            <SaveIcon style={{ fontSize: "17px" }} />
          </Tooltip>
        </Controls.ActionButton>
        <Controls.ActionButton
          type="button"
          size="small"
          variant="contained"
          color="danger"
          onClick={handleCancelClick}
        >
          <Tooltip title="Cancel" placement="top" arrow>
            <CancelIcon style={{ fontSize: "20px" }} />
          </Tooltip>
        </Controls.ActionButton>
      </td>
    </tr>
  );
};

export default EditableRow;
