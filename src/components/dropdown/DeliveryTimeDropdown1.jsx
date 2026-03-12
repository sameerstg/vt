"use client";

import { deliveryTime } from "@/data/listing";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";

export default function DeliveryTimeDropdown1() {
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState("");
  const getDeliveryTime = listingStore((state) => state.getDeliveryTime);
  const setDeliveryTime = listingStore((state) => state.setDeliveryTime);

  useEffect(() => {
    setSelectedDeliveryTime(getDeliveryTime);
  }, [getDeliveryTime]);

  return (
    <>
      <div className="widget-wrapper pb20 mb0 pr20">
        <div className="radio-element">
          {deliveryTime.map((item, i) => (
            <div key={i} className="form-check d-flex align-items-center mb10">
              <input
                className="form-check-input"
                type="radio"
                checked={item.value === selectedDeliveryTime}
                onChange={() => setSelectedDeliveryTime(item.value)}
                id={`delivery-time-dropdown-${item.id}`}
              />
              <label
                className="form-check-label"
                htmlFor={`delivery-time-dropdown-${item.id}`}
              >
                {item.title}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setDeliveryTime(selectedDeliveryTime)}
        className="done-btn ud-btn btn-thm drop_btn3"
      >
        Apply
        <i className="fal fa-arrow-right-long" />
      </button>
    </>
  );
}
