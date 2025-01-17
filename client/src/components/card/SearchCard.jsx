import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import 'rc-slider/assets/index.css';
import Slider from "rc-slider";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorSelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([1000, 40000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const handleCategoryCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorSelected];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const handlePriceChange = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        FinnSearch </h1>

      {/* Search by text */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <hr className="mb-6" />

      {/* Search by category */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Category</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((item) => (
            <label key={item.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={item.id}
                onChange={handleCategoryCheck}
                className="w-4 h-4 border-gray-300 rounded focus:ring focus:ring-blue-200"
              />
              <span className="text-gray-700">{item.name}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="mb-6" />

      {/* Search by price */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Price</h2>
        <div className="flex justify-between text-gray-700 mb-4">
          <span>Min: {price[0]}</span>
          <span>Max: {price[1]}</span>
        </div>
        <Slider
          range
          min={1000}
          max={40000}
          defaultValue={[1000, 40000]}
          onChange={handlePriceChange}
        //   trackStyle={[{ backgroundColor: "#2563eb" }]}
          trackStyle={[
            {
              backgroundImage: "linear-gradient(to right, #fbbf24, #b45309)",
            },
          ]}
          handleStyle={[
            { borderColor: "#fbbf24" },
            { borderColor: "#b45309" },
          ]}
          railStyle={{ backgroundColor: "e" }}
        />
      </div>
    </div>
  );
};

export default SearchCard;
