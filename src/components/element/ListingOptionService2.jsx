"use client";

import toggleStore from "@/store/toggleStore";
import Image from "next/image";
import PriceDropdown1 from "../dropdown/PriceDropdown1";
import LocationDropdown1 from "../dropdown/LocationDropdown1";
import LevelDropdown1 from "../dropdown/LevelDropdown1";
import DeliveryTimeDropdown1 from "../dropdown/DeliveryTimeDropdown1";

export default function ListingOptionService2() {
  const listingToggle = toggleStore((state) => state.listingToggleHandler);
  const filterBtnStyle = {
    minWidth: "110px",
    height: "50px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 18px",
    lineHeight: 1,
  };

  return (
    <div className="row align-items-center mb30">
      <div className="col-12">
        <div className="text-start">
          <div className="dropdown-lists">
            <ul
              className="list-unstyled p-0 mb-0 d-flex flex-wrap align-items-center justify-content-start"
              style={{ gap: "10px" }}
            >
              <li className="m-0">
                <button
                  onClick={listingToggle}
                  type="button"
                  className="open-btn filter-btn-left"
                  style={{ ...filterBtnStyle, minWidth: "118px" }}
                >
                  <Image
                    height={18}
                    width={18}
                    className="me-2"
                    src="/images/icon/all-filter-icon.svg"
                    alt="icon"
                  />
                  All Filter
                </button>
              </li>
              <li className="position-relative m-0">
                <button
                  className="open-btn dropdown-toggle"
                  style={{ ...filterBtnStyle, minWidth: "142px" }}
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Delivery Time
                  <i className="fa fa-angle-down ms-2" />
                </button>
                <div className="dropdown-menu dd4 pb20">
                  <DeliveryTimeDropdown1 />
                </div>
              </li>
              <li className="position-relative m-0">
                <button
                  className="open-btn dropdown-toggle"
                  style={filterBtnStyle}
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Budget
                  <i className="fa fa-angle-down ms-2" />
                </button>
                <div className="dropdown-menu dd3">
                  <PriceDropdown1 />
                </div>
              </li>
              <li className="position-relative m-0">
                <button
                  className="open-btn dropdown-toggle"
                  style={filterBtnStyle}
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Level
                  <i className="fa fa-angle-down ms-2" />
                </button>
                <div className="dropdown-menu">
                  <LevelDropdown1 />
                </div>
              </li>
              <li className="position-relative m-0">
                <button
                  className="open-btn dropdown-toggle"
                  style={{ ...filterBtnStyle, minWidth: "122px" }}
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Location
                  <i className="fa fa-angle-down ms-2" />
                </button>
                <div className="dropdown-menu dd4 pb20">
                  <LocationDropdown1 />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
