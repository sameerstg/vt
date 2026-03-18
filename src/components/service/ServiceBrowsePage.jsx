import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import Listing1 from "@/components/section/Listing1";
import TabSection1 from "@/components/section/TabSection1";
import ServiceHeroBanner from "./ServiceHeroBanner";
import SubcategoryNav from "./SubcategoryNav";

export default function ServiceBrowsePage({
  breadcrumb,
  hero,
  category,
  activeSubcategory,
  services,
  resetStateKey,
}) {
  return (
    <>
      <Header20 />
      <TabSection1 />
      <Breadcumb3 path={breadcrumb} />
      <ServiceHeroBanner
        title={hero.title}
        description={hero.description}
        imageSrc={hero.imageSrc}
        eyebrow={
          activeSubcategory
            ? `Showing ${activeSubcategory.title}`
            : "Featured service categories"
        }
      />
      <SubcategoryNav
        category={category}
        activeSubcategorySlug={activeSubcategory?.slug}
      />
      <Listing1
        items={services}
        initialSelectedCategories={
          activeSubcategory ? [activeSubcategory.title] : []
        }
        resetStateKey={resetStateKey}
      />
      <Footer />
    </>
  );
}
