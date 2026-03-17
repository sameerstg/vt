"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper/modules";
import HeroSearch1 from "../element/HeroSearch1";
import { useRouter } from "next/navigation";
import {
  findServiceBrowseMatch,
  getServiceBrowseHrefByTitle,
  serviceCategories,
} from "@/data/serviceCatalog";

const roleOptions = serviceCategories.map((category) => category.title);

const popular = [
  "Designer",
  "Developer",
  "Web",
  "IOS",
  "PHP",
  "Senior",
  "Engineer",
];

const hero = [
  "/images/home/slide-5.jpg",
  "/images/home/slide-2.jpg",
  "/images/home/slide-4.png",
];

export default function Hero1() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const roleDropdownRef = useRef(null);

  const heroSuggestions = useMemo(
    () =>
      serviceCategories
        .flatMap((category) => category.subcategories)
        .slice(0, 6)
        .map((item) => item.title),
    [],
  );

  const buildSearchHref = (rawQuery = searchValue) => {
    const trimmedQuery = rawQuery.trim();
    const selectedCategory = serviceCategories.find(
      (category) => category.title === selectedRole,
    );

    let href = selectedRole
      ? getServiceBrowseHrefByTitle(selectedRole, { preferSubcategory: false })
      : "/services";

    if (trimmedQuery) {
      const matchedRoute = findServiceBrowseMatch(trimmedQuery, {
        preferredCategorySlug: selectedCategory?.slug,
      });

      href = matchedRoute?.href || href;
    }

    if (!trimmedQuery) {
      return href;
    }

    const params = new URLSearchParams({ search: trimmedQuery });
    return `${href}?${params.toString()}`;
  };

  const searchHandler = (rawQuery = searchValue) => {
    router.push(buildSearchHref(rawQuery));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!roleDropdownRef.current?.contains(event.target)) {
        setIsRoleMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <section className="home-one p-0 space-maintain-1">
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-banner-wrapper home1_style">
                <div className="ui-hero-slide">
                  <Swiper
                    className="mySwiper"
                    loop={true}
                    effect={"fade"}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[EffectFade, Navigation]}
                    navigation={{
                      nextEl: ".right-btn",
                      prevEl: ".left-btn",
                    }}
                  >
                    {hero.map((item, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          height={4000}
                          width={4000}
                          src={item}
                          className="ui-hero-slide__img"
                          alt="Hero Banner"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="carousel-btn-block banner-carousel-btn">
                    <span className="carousel-btn left-btn">
                      <i className="fas fa-chevron-left left" />
                    </span>
                    <span className="carousel-btn right-btn">
                      <i className="fas fa-chevron-right right" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home1-banner-content">
          <div className="container">
            <div className="row">
              <div className="col-xl-10 col-xxl-7">
                <div className="position-relative">
                  <h3 className="banner-title animate-up-2 text-white">
                    Hire the best freelancers for{" "}
                    <br className="d-none d-lg-block" />
                    any job, online.
                  </h3>
                  <p className="banner-text text-white ff-heading mb30 animate-up-3">
                    Millions of people use freeio.com to turn their ideas into
                    reality.
                  </p>
                  <div className="advance-search-tab bgc-white bgct-sm p10 p0-md bdrs4 banner-btn position-relative zi9 animate-up-4">
                    <div className="row">
                      <div className="col-md-5 col-lg-6 col-xl-6">
                        <div className="advance-search-field mb10-sm bdrr1 bdrn-sm">
                          <HeroSearch1
                            value={searchValue}
                            onChange={setSearchValue}
                            onSubmit={searchHandler}
                            suggestions={heroSuggestions}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4 col-xl-4 d-none d-md-block">
                        <div className="bselect-style1" ref={roleDropdownRef}>
                          <div className={`dropdown bootstrap-select ${isRoleMenuOpen ? "show" : ""}`}>
                            <button
                              type="button"
                              className="btn dropdown-toggle btn-light"
                              aria-expanded={isRoleMenuOpen}
                              onClick={() => setIsRoleMenuOpen((prev) => !prev)}
                            >
                              <div className="filter-option">
                                <div className="filter-option-inner">
                                  <div className="filter-option-inner-inner">
                                    {selectedRole || "Select Role"}
                                  </div>
                                </div>
                              </div>
                            </button>
                            <div className={`dropdown-menu${isRoleMenuOpen ? " show" : ""}`}>
                              <div className={`inner${isRoleMenuOpen ? " show" : ""}`}>
                                <ul className={`dropdown-menu inner${isRoleMenuOpen ? " show" : ""}`}>
                                  <li>
                                    <button
                                      type="button"
                                      className={`dropdown-item${selectedRole === "" ? " active" : ""}`}
                                      onClick={() => {
                                        setSelectedRole("");
                                        setIsRoleMenuOpen(false);
                                      }}
                                    >
                                      <span className="text">Select Role</span>
                                    </button>
                                  </li>
                                  {roleOptions.map((item) => (
                                    <li key={item}>
                                      <button
                                        type="button"
                                        className={`dropdown-item${selectedRole === item ? " active" : ""}`}
                                        onClick={() => {
                                          setSelectedRole(item);
                                          setIsRoleMenuOpen(false);
                                        }}
                                      >
                                        <span className="text">{item}</span>
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 ps-md-0">
                        <div className="text-center text-xl-end">
                          <button
                            onClick={() => searchHandler()}
                            className="ud-btn btn-thm w-100 px-4"
                            type="button"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-md-flex mt30 banner-text animate-up-5">
                    <p className="hero-text fz15 me-2 text-white mb-0">
                      Popular Searches
                    </p>
                    {popular.map((elm, i) => (
                      <button
                        key={elm}
                        type="button"
                        className="text-white bg-transparent border-0 p-0"
                        style={{ marginRight: "5px" }}
                        onClick={() => {
                          setSearchValue(elm);
                          searchHandler(elm);
                        }}
                      >
                        {`${elm}${i !== popular.length - 1 ? "," : " "}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
