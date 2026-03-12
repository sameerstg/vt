"use client";
import { product1 } from "@/data/product";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import ListingSidebar1 from "../sidebar/ListingSidebar1";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import PopularServiceCard2 from "../card/PopularServiceCard2";
import PopularServiceSlideCard2 from "../card/PopularServiceSlideCard2";

const resolveServiceMode = (item) =>
  item?.serviceMode || (Number(item?.id) % 2 === 0 ? "physical" : "virtual");

export default function Listing4() {
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
    .slice(0, 7)
    .filter(priceFilter)
    .filter(locationFilter)
    .filter(categoryFilter)
    .filter(serviceModeFilter)
    .filter(searchFilter)
    .filter(sortByFilter)
    .map((item, i) => (
      <div key={i} className="col-lg-12">
        {item?.gallery ? (
          <PopularServiceSlideCard2 data={item} />
        ) : (
          <PopularServiceCard2 data={item} />
        )}
      </div>
    ));

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar1 />
            </div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={content?.length} />
              <div className="row">{content}</div>
              <Pagination1 />
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
