"use client";

import { product1 } from "@/data/product";
import listingStore from "@/store/listingStore";
import { useMemo } from "react";

export default function ServiceCategoryOption1() {
  const getCategory = listingStore((state) => state.getCategory);
  const setCategory = listingStore((state) => state.setCategory);

  const serviceCategories = useMemo(() => {
    const categoryMap = new Map();

    product1.forEach((item) => {
      const tag = item?.tag?.trim();
      if (!tag) return;
      categoryMap.set(tag, (categoryMap.get(tag) || 0) + 1);
    });

    return Array.from(categoryMap, ([title, total]) => ({ title, total }));
  }, []);

  return (
    <>
      <div className="checkbox-style1 mb15">
        {serviceCategories.map((item, i) => (
          <label key={i} className="custom_checkbox">
            {item.title}
            <input
              type="checkbox"
              onChange={() => setCategory(item.title)}
              checked={getCategory.includes(item.title)}
            />
            <span className="checkmark" />
            <span className="right-tags">({item.total})</span>
          </label>
        ))}
      </div>
    </>
  );
}
