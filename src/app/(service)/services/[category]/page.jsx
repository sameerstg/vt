import ServiceBrowsePage from "@/components/service/ServiceBrowsePage";
import {
  getAllServiceCategoryParams,
  getCategoryServices,
  getServiceCategoryBySlug,
} from "@/data/serviceCatalog";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllServiceCategoryParams();
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = getServiceCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Freeio | Services",
    };
  }

  return {
    title: `Freeio | ${category.title}`,
  };
}

export default async function ServiceCategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = getServiceCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const activeSubcategory = category.subcategories[0];

  return (
    <ServiceBrowsePage
      breadcrumb={["Home", "Services", category.title]}
      hero={{
        title: category.title,
        description: category.description,
        imageSrc: category.heroImage,
      }}
      category={category}
      activeSubcategory={activeSubcategory}
      services={getCategoryServices(category)}
      resetStateKey={`category-${category.slug}`}
    />
  );
}
