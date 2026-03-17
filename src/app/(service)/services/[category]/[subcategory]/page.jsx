import ServiceBrowsePage from "@/components/service/ServiceBrowsePage";
import {
  getAllServiceSubcategoryParams,
  getCategoryServices,
  getServiceCategoryBySlug,
  getServiceSubcategoryBySlug,
} from "@/data/serviceCatalog";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllServiceSubcategoryParams();
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = getServiceCategoryBySlug(categorySlug);
  const activeSubcategory = getServiceSubcategoryBySlug(
    category,
    subcategorySlug,
  );

  if (!category || !activeSubcategory) {
    return {
      title: "Freeio | Services",
    };
  }

  return {
    title: `Freeio | ${activeSubcategory.title}`,
  };
}

export default async function ServiceSubcategoryPage({ params }) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = getServiceCategoryBySlug(categorySlug);
  const activeSubcategory = getServiceSubcategoryBySlug(
    category,
    subcategorySlug,
  );

  if (!category || !activeSubcategory) {
    notFound();
  }

  return (
    <ServiceBrowsePage
      breadcrumb={[
        "Home",
        "Services",
        category.title,
        activeSubcategory.title,
      ]}
      hero={{
        title: category.title,
        description: category.description,
        imageSrc: category.heroImage,
      }}
      category={category}
      activeSubcategory={activeSubcategory}
      services={getCategoryServices(category)}
      resetStateKey={`subcategory-${category.slug}-${activeSubcategory.slug}`}
    />
  );
}
