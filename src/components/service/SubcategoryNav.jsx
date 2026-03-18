import Link from "next/link";

export default function SubcategoryNav({ category, activeSubcategorySlug }) {
  if (!category?.subcategories?.length) return null;

  return (
    <section className="pb30">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex flex-wrap align-items-center">
              <span className="fz15 fw500 dark-color me-2 mb10">
                Browse Subcategories:
              </span>
              {category.subcategories.map((subcategory) => {
                const isActive = activeSubcategorySlug === subcategory.slug;

                return (
                  <Link
                    key={subcategory.slug}
                    href={`/services/${category.slug}/${subcategory.slug}`}
                    className={`ud-btn bdrs90 me10 mb10 ${
                      isActive ? "btn-thm" : "btn-light-thm"
                    }`}
                  >
                    {subcategory.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
