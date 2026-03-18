"use client";
import { getServiceBrowseHrefByTitle } from "@/data/serviceCatalog";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BrowserCategoryCard1({ data }) {
  const path = usePathname();
  const href = getServiceBrowseHrefByTitle(data?.title);

  return (
    <>
      <Link href={href} className="d-block">
        <div
          className={`iconbox-style1 ${
            path === "/home-8" || path === "/help" ? "bdr1" : ""
          }`}
        >
          <div className="icon">
            <span className={data.icon} />
          </div>
          <div className="details mt20">
            <p className="text mb5">{data.skill} skills</p>
            <h4 className="title">{data.title}</h4>
            <p className="mb-0">{data.brif} </p>
          </div>
        </div>
      </Link>
    </>
  );
}
