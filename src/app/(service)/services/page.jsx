import ServiceBrowsePage from "@/components/service/ServiceBrowsePage";
import {
  getAllServices,
  serviceOverview,
} from "@/data/serviceCatalog";

export const metadata = {
  title: "Freeio | Services",
};

export default function ServicesPage() {
  return (
    <ServiceBrowsePage
      breadcrumb={["Home", "Services", serviceOverview.title]}
      hero={{
        title: serviceOverview.title,
        description: serviceOverview.description,
        imageSrc: serviceOverview.heroImage,
      }}
      services={getAllServices()}
      resetStateKey="services-overview"
    />
  );
}
