import Select from "react-select";
export const SelectFilter=({options,onChange,placeholder,className})=>{

return (

<Select

className={className}
style={{ width: "100%" }}
options={options}
isClearable
isSearchable
styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
menuPortalTarget={document.body}
placeholder={placeholder}
onChange={onChange}

/>
)
}