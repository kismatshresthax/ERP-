import React from 'react';

const PageHeaderTitle = props =>{
    return <span
        style={{
            fontSize:"17px",
            fontWeight:"500",
            display: "flex",
          justifyContent:"flex-start",
          marginTop:"0px",
          color: "   #122c53",
        }}
    >
        {props.title || ""}
    </span>
}

export default PageHeaderTitle;