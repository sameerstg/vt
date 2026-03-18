"use client";

import { product1 } from "@/data/product";
import listingStore from "@/store/listingStore";
import { useEffect, useMemo, useState } from "react";

export default function ServiceCategoryDropdown1({ items }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const setCategoryState = listingStore((state) => state.setCategory);
  const getCategoryState = listingStore((state) => state.getCategory);

  const serviceCategories = useMemo(() => {
    const categoryMap = new Map();

    (items?.length ? items : product1).forEach((item) => {
      const tag = item?.tag?.trim();
      if (!tag) return;
      categoryMap.set(tag, (categoryMap.get(tag) || 0) + 1);
    });

    return Array.from(categoryMap, ([title, total]) => ({ title, total }));
  }, [items]);

  const categoryHandler = (categoryValue) => {
    if (!selectedCategories.includes(categoryValue)) {
      return setSelectedCategories((prev) => [...prev, categoryValue]);
    }
    const deleted = selectedCategories.filter((item) => item !== categoryValue);
    setSelectedCategories(deleted);
  };

  const categorySubmitHandler = () => {
    setCategoryState([]);
    selectedCategories.forEach((item) => {
      setCategoryState(item);
    });
  };

  useEffect(() => {
    setSelectedCategories(getCategoryState);
  }, [getCategoryState]);

  return (
    <>
      <div className="widget-wrapper pr20">
        <div className="checkbox-style1">
          {serviceCategories.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item.title}
              <input
                type="checkbox"
                onChange={() => categoryHandler(item.title)}
                checked={selectedCategories.includes(item.title)}
              />
              <span className="checkmark" />
              <span className="right-tags">({item.total})</span>
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={categorySubmitHandler}
        className="done-btn ud-btn btn-thm drop_btn4"
      >
        Apply
        <i className="fal fa-arrow-right-long" />
      </button>
    </>
  );
}
