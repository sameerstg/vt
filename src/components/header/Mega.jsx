import Link from "next/link";

const originalSubcategoryColumns = [
  [
    {
      title: "Web & App Design",
      items: [
        "Website Design",
        "App DesignUX Design",
        "Landing Page Design",
        "Icon Design",
      ],
    },
    {
      title: "Marketing Design",
      items: ["Social Media Design", "Email Design", "Web Banners", "Signage Design"],
    },
  ],
  [
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
  ],
  [
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
  ],
];

const categoryMenu = [
  { title: "Development & IT", icon: "flaticon-developer", columns: originalSubcategoryColumns },
  { title: "Design & Creative", icon: "flaticon-web-design-1", columns: originalSubcategoryColumns },
  { title: "Digital Marketing", icon: "flaticon-digital-marketing", columns: originalSubcategoryColumns },
  { title: "Writing & Translation", icon: "flaticon-translator", columns: originalSubcategoryColumns },
  { title: "Music & Audio", icon: "flaticon-microphone", columns: originalSubcategoryColumns },
  { title: "Video & Animation", icon: "flaticon-video-file", columns: originalSubcategoryColumns },
  { title: "Engineering & Architecture", icon: "flaticon-ruler", columns: originalSubcategoryColumns },
  { title: "Finance & Accounting", icon: "flaticon-goal", columns: originalSubcategoryColumns },
  {
    title: "Home Cleaning",
    icon: "flaticon-developer",
    columns: [
      [
        {
          title: "Standard Cleaning",
          items: ["General house cleaning", "Apartment cleaning", "Room cleaning"],
        },
      ],
      [
        {
          title: "Deep Cleaning",
          items: [
            "Deep home cleaning",
            "Move-in / Move-out cleaning",
            "Post-renovation cleaning",
          ],
        },
      ],
      [
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
    ],
  },
  {
    title: "Outdoor & Yard Work",
    icon: "flaticon-ruler",
    columns: [
      [
        {
          title: "Lawn & Grass",
          items: ["Grass cutting / mowing", "Lawn maintenance", "Weed removal"],
        },
      ],
      [
        {
          title: "Garden Services",
          items: ["Garden cleanup", "Tree trimming", "Hedge trimming", "Planting"],
        },
      ],
      [
        {
          title: "Outdoor Maintenance",
          items: ["Leaf removal", "Snow removal", "Pressure washing"],
        },
      ],
    ],
  },
  {
    title: "Home Repair & Handyman",
    icon: "flaticon-ruler",
    columns: [
      [
        {
          title: "General Repairs",
          items: [
            "Minor home repairs",
            "Fixture replacement",
            "Door / lock repair",
            "Wall patching",
          ],
        },
      ],
      [
        {
          title: "Assembly & Installation",
          items: [
            "Furniture assembly",
            "TV mounting",
            "Shelf installation",
            "Curtain installation",
          ],
        },
      ],
      [
        {
          title: "Small Projects",
          items: ["Drywall repair", "Caulking & sealing", "Minor carpentry"],
        },
      ],
    ],
  },
  {
    title: "Plumbing",
    icon: "flaticon-goal",
    columns: [
      [
        {
          title: "Basic Plumbing",
          items: ["Faucet repair", "Leak repair", "Drain unclogging", "Toilet repair"],
        },
      ],
      [
        {
          title: "Installations",
          items: ["Sink installation", "Toilet installation", "Water heater installation"],
        },
      ],
      [
        {
          title: "Advanced Plumbing",
          items: ["Pipe replacement", "Sewer line repair"],
        },
      ],
    ],
  },
  {
    title: "Electrical",
    icon: "flaticon-digital-marketing",
    columns: [
      [
        {
          title: "Minor Electrical",
          items: [
            "Light fixture installation",
            "Switch / outlet replacement",
            "Ceiling fan installation",
          ],
        },
      ],
      [
        {
          title: "Advanced Electrical",
          items: ["Panel upgrades", "Wiring repair", "Generator installation"],
        },
      ],
    ],
  },
  {
    title: "Roofing",
    icon: "flaticon-video-file",
    columns: [
      [{ title: "Roof Repair", items: ["Leak repair", "Shingle replacement"] }],
      [{ title: "Roof Installation", items: ["New roof installation", "Roof replacement"] }],
      [
        {
          title: "Roof Maintenance",
          items: ["Roof inspection", "Gutter cleaning", "Gutter repair"],
        },
      ],
    ],
  },
  {
    title: "Automotive Services (On-site)",
    icon: "flaticon-microphone",
    columns: [
      [
        {
          title: "Cleaning & Detailing",
          items: ["Exterior wash", "Interior cleaning", "Full car detailing"],
        },
      ],
      [
        {
          title: "Basic Maintenance",
          items: ["Oil change", "Battery replacement", "Tire change"],
        },
      ],
      [
        {
          title: "Diagnostics & Repair",
          items: ["Brake repair", "Minor mechanical repair"],
        },
      ],
    ],
  },
  {
    title: "Moving & Hauling",
    icon: "flaticon-translator",
    columns: [
      [{ title: "Moving Help", items: ["Home moving", "Apartment moving", "Furniture moving"] }],
      [
        {
          title: "Pickup & Delivery",
          items: ["Appliance pickup", "Store pickup", "Large item delivery"],
        },
      ],
      [
        {
          title: "Junk Removal",
          items: ["Trash removal", "Construction debris removal", "Furniture disposal"],
        },
      ],
    ],
  },
  {
    title: "Painting",
    icon: "flaticon-web-design-1",
    columns: [
      [
        {
          title: "Interior Painting",
          items: ["Room painting", "Wall repainting", "Trim painting"],
        },
      ],
      [{ title: "Exterior Painting", items: ["Exterior house painting", "Fence painting"] }],
    ],
  },
  {
    title: "Home Improvement",
    icon: "flaticon-developer",
    columns: [
      [{ title: "Remodeling", items: ["Bathroom renovation", "Kitchen renovation"] }],
      [
        {
          title: "Flooring",
          items: ["Tile installation", "Laminate installation", "Hardwood flooring"],
        },
      ],
    ],
  },
  {
    title: "Appliance Services",
    icon: "flaticon-video-file",
    columns: [
      [
        {
          title: "Installation",
          items: [
            "Dishwasher installation",
            "Washing machine installation",
            "Refrigerator installation",
          ],
        },
      ],
      [{ title: "Repair", items: ["Appliance repair", "Troubleshooting"] }],
    ],
  },
  {
    title: "Personal Assistance (Physical Errands)",
    icon: "flaticon-account",
    columns: [
      [
        {
          title: "Errands",
          items: ["Grocery pickup", "Prescription pickup", "Package drop-off"],
        },
      ],
      [
        {
          title: "In-Person Help",
          items: ["Waiting in line", "Event assistance", "Personal helper for a day"],
        },
      ],
    ],
  },
  {
    title: "Security & Smart Home",
    icon: "flaticon-digital-marketing",
    columns: [
      [
        {
          title: "Installation",
          items: ["CCTV installation", "Smart lock installation", "Alarm system setup"],
        },
      ],
      [{ title: "Maintenance", items: ["Camera repair", "System troubleshooting"] }],
    ],
  },
  {
    title: "Pest Control",
    icon: "flaticon-ruler",
    columns: [
      [
        {
          title: "Pest Control Services",
          items: ["Termite treatment", "Rodent removal", "General pest control"],
        },
      ],
    ],
  },
  {
    title: "HVAC",
    icon: "flaticon-web-design-1",
    columns: [
      [{ title: "Maintenance", items: ["AC servicing", "Furnace inspection"] }],
      [{ title: "Installation", items: ["AC installation", "Heating system installation"] }],
    ],
  },
];

export default function Mega({ staticMenuClass }) {
  return (
    <>
      <div id="mega-menu">
        <a className={`btn-mega fw500 ${staticMenuClass ? staticMenuClass : ""} `}>
          <span
            className={`pl30 pl10-xl pr5 fz15 vam flaticon-menu ${
              staticMenuClass ? staticMenuClass : ""
            } `}
          />
          Categories
        </a>
        <ul className="menu ps-0 mega-menu-category-grid">
          {categoryMenu.map((category) => {
            const menuColumns = [...category.columns];
            while (menuColumns.length < 3) {
              menuColumns.push([]);
            }

            return (
              <li key={category.title}>
                <a className="dropdown">
                  <span className={`menu-icn ${category.icon}`} />
                  <span className="menu-title">{category.title}</span>
                </a>
                <div className="drop-menu d-flex justify-content-between">
                  {menuColumns.map((column, columnIndex) => (
                    <div className="one-third" key={`${category.title}-col-${columnIndex}`}>
                      {column.map((group, groupIndex) => (
                        <div key={`${group.title}-${groupIndex}`}>
                          <div className="h6 cat-title">{group.title}</div>
                          <ul className={`ps-0 ${groupIndex === column.length - 1 ? "mb-0" : "mb40"}`}>
                            {group.items.map((item) => (
                              <li key={item}>
                                <Link href="/">{item}</Link>
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
          })}
        </ul>
      </div>
    </>
  );
}
