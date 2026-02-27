"use client";
import listingStore from "@/store/listingStore";
import ListingOption3 from "../element/ListingOption3";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import Pagination1 from "./Pagination1";
import priceStore from "@/store/priceStore";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";
import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import { product1 } from "@/data/product";
import ListingMap1 from "../element/ListingMap1";

const resolveServiceMode = (item) =>
  item?.serviceMode || (Number(item?.id) % 2 === 0 ? "physical" : "virtual");

export default function Listing7() {
  const getPriceRange = priceStore((state) => state.priceRange);
  const getLocation = listingStore((state) => state.getLocation);
  const getCategory = listingStore((state) => state.getCategory);
  const getServiceMode = listingStore((state) => state.getServiceMode);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getSearch = listingStore((state) => state.getSearch);

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

  const content = product1
    .slice(0, 4)
    .filter(priceFilter)
    .filter(locationFilter)
    .filter(categoryFilter)
    .filter(serviceModeFilter)
    .filter(searchFilter)
    .filter(sortByFilter)
    .map((item, i) => (
      <div key={i} className="col-sm-6">
        {item?.gallery ? (
          <PopularServiceSlideCard1 data={item} />
        ) : (
          <TrendingServiceCard1 data={item} />
        )}
      </div>
    ));

  return (
    <>
      <section className="p-0">
        <div className="container-fluid">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-xl-5">
              <div className="half_map_area_content mt30">
                <div className="text-center text-sm-start">
                  <h4 className="fw700 mb20">Design &amp; Creative</h4>
                </div>
                <ListingOption3 />
                <div className="row">{content}</div>
                <Pagination1 />
              </div>
            </div>
            <div className="col-xl-7 overflow-hidden position-relative">
              <ListingMap1 />
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
