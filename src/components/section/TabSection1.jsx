"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { serviceCategories } from "@/data/serviceCatalog";

const categories = [
  { title: "All Categories", href: "/services" },
  ...serviceCategories.map((category) => ({
    title: category.title,
    href: `/services/${category.slug}`,
  })),
];

// categories_list_section overflow-hidden

export default function TabSection1() {
  const path = usePathname();
  const normalizedPath = path === "/service-1" ? "/services" : path;
  const activeHref =
    categories.find(
      (item) =>
        item.href !== "/services" &&
        (normalizedPath === item.href ||
          normalizedPath.startsWith(`${item.href}/`)),
    )?.href || "/services";

  return (
    <>
      <section
        className={`categories_list_section overflow-hidden ${
          path === "/home-3" ? "bgc-thm5" : ""
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="listings_category_nav_list_menu">
                <ul className="mb0 d-flex ps-0">
                  {categories.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={activeHref === item.href ? "active" : ""}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
