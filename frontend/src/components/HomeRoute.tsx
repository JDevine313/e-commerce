import { useContext, useState } from "react";
import "./HomeRoute.css";

import ProductList from "./ProductList";
import ProductContext from "../context/productContext";

const HomeRoute = () => {
  const { products, setSearchTerm } = useContext(ProductContext);
  const [query, setQuery] = useState<string>("");
  return (
    <div className="HomeRoute">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchTerm(query);
        }}
        id="search-form"
      >
        <input
          type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="Search By Name Here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button id="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      {products && <ProductList products={products} />}
    </div>
  );
};

export default HomeRoute;
