"use client";

import { product1 } from "@/data/product";
import listingStore from "@/store/listingStore";
import { useMemo } from "react";

const resolveServiceMode = (item) =>
  item?.serviceMode || (Number(item?.id) % 2 === 0 ? "physical" : "virtual");

export default function ServiceModeOption1() {
  const getServiceMode = listingStore((state) => state.getServiceMode);
  const setServiceMode = listingStore((state) => state.setServiceMode);

  const serviceModes = useMemo(() => {
    const totals = { physical: 0, virtual: 0 };

    product1.forEach((item) => {
      const mode = resolveServiceMode(item);
      totals[mode] = (totals[mode] || 0) + 1;
    });

    return [
      { id: 1, title: "Physical", value: "physical", total: totals.physical || 0 },
      { id: 2, title: "Virtual", value: "virtual", total: totals.virtual || 0 },
    ];
  }, []);

  return (
    <>
      <div className="checkbox-style1 mb15">
        {serviceModes.map((item) => (
          <label key={item.id} className="custom_checkbox">
            {item.title}
            <input
              type="checkbox"
              onChange={() => setServiceMode(item.value)}
              checked={getServiceMode.includes(item.value)}
            />
            <span className="checkmark" />
            <span className="right-tags">({item.total})</span>
          </label>
        ))}
      </div>
    </>
  );
}
