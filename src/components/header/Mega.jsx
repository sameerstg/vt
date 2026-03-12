import Link from "next/link";

const legacyCategorySections = [
  {
    title: "Web & App Design",
    items: [
      "Website Design",
      "App Design / UX Design",
      "Landing Page Design",
      "Icon Design",
    ],
  },
  {
    title: "Marketing Design",
    items: [
      "Social Media Design",
      "Email Design",
      "Web Banners",
      "Signage Design",
    ],
  },
  {
    title: "Art & Illustration",
    items: [
      "Illustration",
      "NFT Art",
      "Pattern Design",
      "Portraits & Caricatures",
      "Cartoons & Comics",
      "Tattoo Design",
      "Storyboards",
    ],
  },
  {
    title: "Gaming",
    items: ["Game Art", "Graphics for Streamers", "Twitch Store"],
  },
  {
    title: "Visual Design",
    items: [
      "Image Editing",
      "Presentation Design",
      "Infographic Design",
      "Vector Tracing",
      "Resume Design",
    ],
  },
  {
    title: "Print Design",
    items: [
      "T-Shirts & Merchandise",
      "Flyer Design",
      "Brochure Design",
      "Poster Design",
      "Catalog Design",
    ],
  },
];

const megaCategories = [
  {
    title: "Development & IT",
    icon: "flaticon-developer",
    sections: legacyCategorySections,
  },
  {
    title: "Design & Creative",
    icon: "flaticon-web-design-1",
    sections: legacyCategorySections,
  },
  {
    title: "Digital Marketing",
    icon: "flaticon-digital-marketing",
    sections: legacyCategorySections,
  },
  {
    title: "Writing & Translation",
    icon: "flaticon-translator",
    sections: legacyCategorySections,
  },
  {
    title: "Music & Audio",
    icon: "flaticon-microphone",
    sections: legacyCategorySections,
  },
  {
    title: "Video & Animation",
    icon: "flaticon-video-file",
    sections: legacyCategorySections,
  },
  {
    title: "Engineering & Architecture",
    icon: "flaticon-ruler",
    sections: legacyCategorySections,
  },
  {
    title: "Finance & Accounting",
    icon: "flaticon-goal",
    sections: legacyCategorySections,
  },
  {
    title: "Home Cleaning",
    icon: "flaticon-developer",
    sections: [
      {
        title: "Standard Cleaning",
        items: [
          "General house cleaning",
          "Apartment cleaning",
          "Room cleaning",
        ],
      },
      {
        title: "Deep Cleaning",
        items: [
          "Deep home cleaning",
          "Move-in / Move-out cleaning",
          "Post-renovation cleaning",
        ],
      },
      {
        title: "Specialized Cleaning",
        items: [
          "Carpet cleaning",
          "Window cleaning",
          "Sofa / upholstery cleaning",
          "Garage cleaning",
          "Basement cleaning",
        ],
      },
    ],
  },
  {
    title: "Outdoor & Yard Work",
    icon: "flaticon-web-design-1",
    sections: [
      {
        title: "Lawn & Grass",
        items: [
          "Grass cutting / mowing",
          "Lawn maintenance",
          "Weed removal",
        ],
      },
      {
        title: "Garden Services",
        items: [
          "Garden cleanup",
          "Tree trimming",
          "Hedge trimming",
          "Planting",
        ],
      },
      {
        title: "Outdoor Maintenance",
        items: ["Leaf removal", "Snow removal", "Pressure washing"],
      },
    ],
  },
  {
    title: "Home Repair & Handyman",
    icon: "flaticon-digital-marketing",
    sections: [
      {
        title: "General Repairs",
        items: [
          "Minor home repairs",
          "Fixture replacement",
          "Door / lock repair",
          "Wall patching",
        ],
      },
      {
        title: "Assembly & Installation",
        items: [
          "Furniture assembly",
          "TV mounting",
          "Shelf installation",
          "Curtain installation",
        ],
      },
      {
        title: "Small Projects",
        items: ["Drywall repair", "Caulking & sealing", "Minor carpentry"],
      },
    ],
  },
  {
    title: "Plumbing",
    icon: "flaticon-translator",
    sections: [
      {
        title: "Basic Plumbing",
        items: [
          "Faucet repair",
          "Leak repair",
          "Drain unclogging",
          "Toilet repair",
        ],
      },
      {
        title: "Installations",
        items: [
          "Sink installation",
          "Toilet installation",
          "Water heater installation",
        ],
      },
      {
        title: "Advanced Plumbing",
        items: ["Pipe replacement", "Sewer line repair"],
      },
    ],
  },
  {
    title: "Electrical",
    icon: "flaticon-microphone",
    sections: [
      {
        title: "Minor Electrical",
        items: [
          "Light fixture installation",
          "Switch / outlet replacement",
          "Ceiling fan installation",
        ],
      },
      {
        title: "Advanced Electrical",
        items: ["Panel upgrades", "Wiring repair", "Generator installation"],
      },
    ],
  },
  {
    title: "Roofing",
    icon: "flaticon-video-file",
    sections: [
      {
        title: "Roof Repair",
        items: ["Leak repair", "Shingle replacement"],
      },
      {
        title: "Roof Installation",
        items: ["New roof installation", "Roof replacement"],
      },
      {
        title: "Roof Maintenance",
        items: ["Roof inspection", "Gutter cleaning", "Gutter repair"],
      },
    ],
  },
  {
    title: "Automotive Services (On-site)",
    icon: "flaticon-ruler",
    sections: [
      {
        title: "Cleaning & Detailing",
        items: ["Exterior wash", "Interior cleaning", "Full car detailing"],
      },
      {
        title: "Basic Maintenance",
        items: ["Oil change", "Battery replacement", "Tire change"],
      },
      {
        title: "Diagnostics & Repair",
        items: ["Brake repair", "Minor mechanical repair"],
      },
    ],
  },
  {
    title: "Moving & Hauling",
    icon: "flaticon-goal",
    sections: [
      {
        title: "Moving Help",
        items: ["Home moving", "Apartment moving", "Furniture moving"],
      },
      {
        title: "Pickup & Delivery",
        items: ["Appliance pickup", "Store pickup", "Large item delivery"],
      },
      {
        title: "Junk Removal",
        items: [
          "Trash removal",
          "Construction debris removal",
          "Furniture disposal",
        ],
      },
    ],
  },
  {
    title: "Painting",
    icon: "flaticon-developer",
    sections: [
      {
        title: "Interior Painting",
        items: ["Room painting", "Wall repainting", "Trim painting"],
      },
      {
        title: "Exterior Painting",
        items: ["Exterior house painting", "Fence painting"],
      },
    ],
  },
  {
    title: "Home Improvement",
    icon: "flaticon-web-design-1",
    sections: [
      {
        title: "Remodeling",
        items: ["Bathroom renovation", "Kitchen renovation"],
      },
      {
        title: "Flooring",
        items: [
          "Tile installation",
          "Laminate installation",
          "Hardwood flooring",
        ],
      },
    ],
  },
  {
    title: "Appliance Services",
    icon: "flaticon-digital-marketing",
    sections: [
      {
        title: "Installation",
        items: [
          "Dishwasher installation",
          "Washing machine installation",
          "Refrigerator installation",
        ],
      },
      {
        title: "Repair",
        items: ["Appliance repair", "Troubleshooting"],
      },
    ],
  },
  {
    title: "Personal Assistance (Physical Errands)",
    icon: "flaticon-translator",
    sections: [
      {
        title: "Errands",
        items: ["Grocery pickup", "Prescription pickup", "Package drop-off"],
      },
      {
        title: "In-Person Help",
        items: [
          "Waiting in line",
          "Event assistance",
          "Personal helper for a day",
        ],
      },
    ],
  },
  {
    title: "Security & Smart Home",
    icon: "flaticon-microphone",
    sections: [
      {
        title: "Installation",
        items: [
          "CCTV installation",
          "Smart lock installation",
          "Alarm system setup",
        ],
      },
      {
        title: "Maintenance",
        items: ["Camera repair", "System troubleshooting"],
      },
    ],
  },
  {
    title: "Pest Control",
    icon: "flaticon-video-file",
    sections: [
      {
        title: "Pest Control Services",
        items: ["Termite treatment", "Rodent removal", "General pest control"],
      },
    ],
  },
  {
    title: "HVAC",
    icon: "flaticon-ruler",
    sections: [
      {
        title: "Maintenance",
        items: ["AC servicing", "Furnace inspection"],
      },
      {
        title: "Installation",
        items: ["AC installation", "Heating system installation"],
      },
    ],
  },
];

const splitInHalf = (items) => {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
};

const serviceHref = "/service-1";

export default function Mega({ staticMenuClass }) {
  const [leftCategories, rightCategories] = splitInHalf(megaCategories);

  const renderCategoryItem = (category) => {
    const [leftSections, rightSections] = splitInHalf(category.sections);
    const sectionColumns = [leftSections, rightSections].filter(
      (column) => column.length > 0
    );

    return (
      <li key={category.title}>
        <a className="dropdown">
          <span className={`menu-icn ${category.icon}`} />
          <span className="menu-title">{category.title}</span>
        </a>

        <div
          className="drop-menu d-flex justify-content-between"
          style={{
            left: "calc(100% - 14px)",
            width: "min(720px, 82vw)",
            maxHeight: "560px",
            overflowY: "auto",
          }}
        >
          {sectionColumns.map((columnSections, columnIndex) => (
            <div
              key={`${category.title}-column-${columnIndex}`}
              className="mega-drop-column"
              style={{ width: `${100 / sectionColumns.length - 2}%` }}
            >
              {columnSections.map((section, sectionIndex) => (
                <div key={`${category.title}-${section.title}`}>
                  <div className="h6 cat-title">{section.title}</div>
                  <ul
                    className={`ps-0 ${
                      sectionIndex === columnSections.length - 1 ? "mb-0" : "mb40"
                    }`}
                  >
                    {section.items.map((item) => (
                      <li key={`${section.title}-${item}`}>
                        <Link href={serviceHref}>{item}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </li>
    );
  };

  return (
    <>
      <div id="mega-menu">
        <a
          className={`btn-mega fw500 ${
            staticMenuClass ? staticMenuClass : ""
          } `}
        >
          <span
            className={`pl30 pl10-xl pr5 fz15 vam flaticon-menu ${
              staticMenuClass ? staticMenuClass : ""
            } `}
          />
          Categories
        </a>

        <div
          className="menu ps-0 mega-two-column-menu"
          style={{
            width: "min(660px, 78vw)",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            columnGap: 0,
            alignItems: "start",
          }}
        >
          <ul className="ps-0 mb-0" style={{ listStyle: "none" }}>
            {leftCategories.map((category) => renderCategoryItem(category))}
          </ul>
          <ul className="ps-0 mb-0" style={{ listStyle: "none" }}>
            {rightCategories.map((category) => renderCategoryItem(category))}
          </ul>
        </div>
      </div>
    </>
  );
}
