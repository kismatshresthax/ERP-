import React, {useState} from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import "./tree.css";
export default function Tree({node, depth})  {
    const [expanded, setExpanded] = useState(false);
    if (depth >= 10 || node.processing) {

        return null;
    }


    const toggleExpandWithProcessing = () => {
        if (!node.processing) {
            node.processing = true;
            toggleExpand();
            node.processing = false;
        }
    };


    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    // const formatNumber = (number) => { // Format number with commas and exactly two decimal places
    //     return number.toLocaleString("en-US", {
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2
    //     });
    // };
    const parentTdClass = node.children.length > 1 ? "parent-node" : "";


    return (
        <>
            <tr>
                <td className={parentTdClass}
                    style={
                        {paddingLeft: "20px"}
                }>
                    {
                    node.children.length > 0 && (
                        <button className="icon"
                            onClick={toggleExpandWithProcessing}>
                            {
                            expanded ? <FaChevronDown/>: <FaChevronRight/>
                        } </button>
                    )
                }
                    {
                    node.name
                } </td>
                <td className={parentTdClass}>
                    {
                    (node.dr)
                }</td>
                <td className={parentTdClass}>
                    {
                    (node.cr)
                }</td>
            </tr>
            {
            expanded && node.children.map((child) => (
                <Tree key={
                        child.id
                    }
                    node={child}
                    depth={
                        depth + 1
                    }/>
            ))
        } </>
    );
};


