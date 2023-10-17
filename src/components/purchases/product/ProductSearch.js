import React, { useState } from "react";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

//import "./search.css";
const ProductSearch = (props) => {
  const {

    products,
    updateProducts,
    setUpdateProducts,
    customProducts,
  } = props;
  const [searchString, setSearchString] = useState("");
 console.log(products)
  const filterProducts = products.map((item) => ({
    name: item.productName,
    code: item.code,
    unitName:item.unitName,
    id: item.productId,
    cost:item.cost,
  }));
console.log(filterProducts)
  const onProductSearch = (code) => {
    setSearchString(code);
    const newId = products
      .filter((item) => item.code === code || item.code === code.code)
      .map((item) => item.productId);
      console.log(newId);
    console.log(customProducts);
    const finalIdArrays = customProducts.map((id) => id.product_id);
    const finalId = finalIdArrays.filter(
      (finalIdArray) => finalIdArray === newId[0]
    );
    if (finalId[0] !== undefined) {
      if (updateProducts.find((exitId) => exitId.product_id === finalId[0])) {
        alert("product-already-added");
      } else {
      
        const pushArray = [...customProducts];
        if (
          updateProducts.filter(
            (product) => product.code === code || product.code === code.code
          ).length > 0
        ) {
          setUpdateProducts((updateProducts) =>
            updateProducts.map((item) => {
              return item;
            })
          );
        } else {
          const newProduct = pushArray.find(
            (element) => element.product_id === finalId[0]
          );
          setUpdateProducts([...updateProducts, newProduct]);
        }
      }
      removeSearchClass();
      setSearchString("");
    }
  };

  const handleOnSearch = (string) => {
    onProductSearch(string);
  };

  const handleOnSelect = (result) => {
    onProductSearch(result);
  };

  const formatResult = (item) => {
    return (
      <span onClick={(e) => e.stopPropagation()}>
        {item.code} ({item.name})
      </span>
    );
  };

  const removeSearchClass = () => {
    const html =
      document.getElementsByClassName(`custom-search`)[0].firstChild.firstChild
        .lastChild;
    html.style.display = "none";
  };

  return (
    <div className="position-relative custom-search">
      <ReactSearchAutocomplete
        items={filterProducts}
        onSearch={handleOnSearch}
        inputSearchString={searchString}
        fuseOptions={{ keys: ["code", "name"] }}
        resultStringKeyName="code"
     placeholder="search Product"
        onSelect={handleOnSelect}
        formatResult={formatResult}
        showIcon={false}
        showClear={false}
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="d-flex align-items-center top-1 bottom-0 react-search-icon my-auto text-gray-600 position-absolute"
      />
    </div>
  );
};

export default ProductSearch;