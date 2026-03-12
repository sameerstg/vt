"use client";
import { product1 } from "@/data/product";
import ListingOptionService2 from "../element/ListingOptionService2";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";

const resolveServiceMode = (item) =>
  item?.serviceMode || (Number(item?.id) % 2 === 0 ? "physical" : "virtual");

export default function Listing2() {
  const getPriceRange = priceStore((state) => state.priceRange);
  const getLocation = listingStore((state) => state.getLocation);
  const getCategory = listingStore((state) => state.getCategory);
  const getServiceMode = listingStore((state) => state.getServiceMode);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getSearch = listingStore((state) => state.getSearch);
  const getDeliveryTime = listingStore((state) => state.getDeliveryTime);

  const priceFilter = (item) =>
    getPriceRange.min <= item.price && getPriceRange.max >= item.price;

  const locationFilter = (item) =>
    getLocation?.length !== 0 ? getLocation.includes(item.location) : item;

  const categoryFilter = (item) =>
    getCategory?.length !== 0 ? getCategory.includes(item.tag) : item;

  const serviceModeFilter = (item) =>
    getServiceMode?.length !== 0
      ? getServiceMode.includes(resolveServiceMode(item))
      : item;

  const searchFilter = (item) =>
    getSearch !== ""
      ? item.location.split("-").join(" ").includes(getSearch.toLowerCase())
      : item;

  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? item : item.sort === getBestSeller;

  const deliveryTimeFilter = (item) =>
    getDeliveryTime !== "" && getDeliveryTime !== "anytime"
      ? item.deliveryTime === getDeliveryTime
      : item;

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <ListingOptionService2 />
          <div className="row">
            {product1
              .slice(0, 12)
              .filter(priceFilter)
              .filter(locationFilter)
              .filter(categoryFilter)
              .filter(serviceModeFilter)
              .filter(deliveryTimeFilter)
              .filter(searchFilter)
              .filter(sortByFilter)
              .map((item, i) => (
                <div key={i} className="col-sm-6 col-xl-3">
                  {item?.gallery ? (
                    <PopularServiceSlideCard1 data={item} />
                  ) : (
                    <TrendingServiceCard1 data={item} />
                  )}
                </div>
              ))}
          </div>
          <Pagination1 />
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
