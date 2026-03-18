"use client";
import { product1 } from "@/data/product";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListingOption1 from "../element/ListingOption1";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import Pagination1 from "./Pagination1";
import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";

const resolveServiceMode = (item) =>
  item?.serviceMode || (Number(item?.id) % 2 === 0 ? "physical" : "virtual");

const ITEMS_PER_PAGE = 8;
const TOTAL_DUMMY_SERVICES = 72;

const buildDummyServices = (items, totalCount) =>
  Array.from({ length: totalCount }, (_, index) => {
    const source = items[index % items.length];
    const cycleIndex = Math.floor(index / items.length);
    const isCloned = cycleIndex > 0;

    return {
      ...source,
      id: index + 1,
      title: isCloned ? `${source.title} #${index + 1}` : source.title,
      price: source.price + cycleIndex * 15,
      review: source.review + cycleIndex,
    };
  });

export default function Listing1({
  items,
  initialSelectedCategories = [],
  resetStateKey = "default",
}) {
  const searchParams = useSearchParams();
  const getPriceRange = priceStore((state) => state.priceRange);
  const getLocation = listingStore((state) => state.getLocation);
  const getCategory = listingStore((state) => state.getCategory);
  const getServiceMode = listingStore((state) => state.getServiceMode);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getSearch = listingStore((state) => state.getSearch);
  const urlSearch = searchParams.get("search")?.trim().toLowerCase() || "";

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

  const searchFilter = (item) => {
    if (getSearch === "") return item;

    const searchableContent = [
      item.title,
      item.tag,
      item.category,
      item.parentCategory,
      item.author?.name,
      item.location?.split("-").join(" "),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return getSearch
      .split(/\s+/)
      .filter(Boolean)
      .every((term) => searchableContent.includes(term));
  };

  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? item : item.sort === getBestSeller;

  const allServices = useMemo(() => {
    if (items?.length) {
      return items;
    }

    return buildDummyServices(product1, TOTAL_DUMMY_SERVICES);
  }, [items]);

  const filteredServices = allServices
    .filter(priceFilter)
    .filter(locationFilter)
    .filter(categoryFilter)
    .filter(serviceModeFilter)
    .filter(searchFilter)
    .filter(sortByFilter);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredServices.length / ITEMS_PER_PAGE),
  );

  useEffect(() => {
    setCurrentPage((prevPage) => Math.min(prevPage, totalPages));
  }, [totalPages]);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentServices = filteredServices.slice(start, start + ITEMS_PER_PAGE);
  const initialCategorySignature = initialSelectedCategories.join("|");

  useEffect(() => {
    listingStore.setState({
      getDeliveryTime: "",
      getLevel: [],
      getLocation: [],
      getBestSeller: "best-seller",
      getDesginTool: [],
      getSpeak: [],
      getSearch: urlSearch,
      getCategory: initialSelectedCategories,
      getServiceMode: [],
      getProjectType: [],
      getEnglishLevel: [],
      getJobType: [],
      getNoOfEmployee: [],
    });
    priceStore.setState({
      priceRange: {
        min: 0,
        max: 100000,
      },
    });
    setCurrentPage(1);
  }, [initialCategorySignature, initialSelectedCategories, resetStateKey, urlSearch]);

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <ListingOption1 categoryItems={allServices} />
          <div className="row">
            {currentServices.length ? (
              currentServices.map((item) => (
                <div key={item.id} className="col-sm-6 col-xl-3">
                  {item?.gallery ? (
                    <PopularServiceSlideCard1 data={item} />
                  ) : (
                    <TrendingServiceCard1 data={item} />
                  )}
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="text-center py-5 bdrs12 border">
                  <h4 className="mb10">No services match the current filters</h4>
                  <p className="text mb-0">
                    Clear the filters or switch to another subcategory.
                  </p>
                </div>
              </div>
            )}
          </div>
          <Pagination1
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredServices.length}
            pageSize={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
            countLabel="services available"
          />
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
