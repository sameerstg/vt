"use client";
import { useState } from "react";

const searchResult = [
  "mobile app development",
  "mobile app builder",
  "mobile legends",
  "mobile app ui ux design",
  "mobile game app development",
  "mobile app design",
];

export default function HeroSearch1({
  value,
  onChange,
  onSubmit,
  suggestions = searchResult,
}) {
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const inputValue = value ?? internalValue;

  // search dropdown
  const focusDropdown = () => {
    setSearchDropdownOpen(true);
  };
  const blurDropdown = () => {
    setSearchDropdownOpen(false);
  };

  const selectSearch = (select) => {
    if (value === undefined) {
      setInternalValue(select);
    }
    onChange?.(select);
    setSearchDropdownOpen(false);
  };

  const handleChange = (nextValue) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(inputValue);
    setSearchDropdownOpen(false);
  };

  return (
    <>
      <form className="form-search position-relative" onSubmit={handleSubmit}>
        <div className="box-search">
          <span className="icon far fa-magnifying-glass" />
          <input
            className="form-control"
            type="text"
            name="search"
            placeholder="What are you looking for?"
            onFocus={focusDropdown}
            onBlur={blurDropdown}
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
          />
          <div
            className="search-suggestions"
            style={
              isSearchDropdownOpen
                ? {
                    visibility: "visible",
                    opacity: "1",
                    top: "70px",
                  }
                : {
                    visibility: "hidden",
                    opacity: "0",
                    top: "100px",
                  }
            }
          >
            <h6 className="fz14 ml30 mt25 mb-3">Popular Search</h6>
            <div className="box-suggestions">
              <ul className="px-0 m-0 pb-4">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className={inputValue === item ? "ui-list-active" : ""}
                  >
                    <div
                      onMouseDown={(event) => {
                        event.preventDefault();
                        selectSearch(item);
                      }}
                      className="info-product"
                    >
                      <div className="item_title">{item}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
