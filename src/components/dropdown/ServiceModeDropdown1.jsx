"use client";

import { product1 } from "@/data/product";
import listingStore from "@/store/listingStore";
import { useEffect, useMemo, useState } from "react";

const resolveServiceMode = (item) =>
  item?.serviceMode || (Number(item?.id) % 2 === 0 ? "physical" : "virtual");

export default function ServiceModeDropdown1() {
  const [selectedModes, setSelectedModes] = useState([]);
  const setServiceMode = listingStore((state) => state.setServiceMode);
  const getServiceMode = listingStore((state) => state.getServiceMode);

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

  const modeHandler = (modeValue) => {
    if (!selectedModes.includes(modeValue)) {
      return setSelectedModes((prev) => [...prev, modeValue]);
    }
    const deleted = selectedModes.filter((item) => item !== modeValue);
    setSelectedModes(deleted);
  };

  const modeSubmitHandler = () => {
    setServiceMode([]);
    selectedModes.forEach((item) => {
      setServiceMode(item);
    });
  };

  useEffect(() => {
    setSelectedModes(getServiceMode);
  }, [getServiceMode]);

  return (
    <>
      <div className="widget-wrapper pb25 mb0">
        <div className="checkbox-style1">
          {serviceModes.map((item) => (
            <label key={item.id} className="custom_checkbox">
              {item.title}
              <input
                type="checkbox"
                onChange={() => modeHandler(item.value)}
                checked={selectedModes.includes(item.value)}
              />
              <span className="checkmark" />
              <span className="right-tags">({item.total})</span>
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={modeSubmitHandler}
        className="done-btn ud-btn btn-thm dropdown-toggle"
      >
        Apply
        <i className="fal fa-arrow-right-long" />
      </button>
    </>
  );
}
