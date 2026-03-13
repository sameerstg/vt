"use client";
import { price1 } from "@/data/project";
import PriceTableCard1 from "../card/PriceTableCard1";
import priceStore from "@/store/priceStore";
import { usePathname } from "next/navigation";

export default function PriceTable1() {
  const togglePlan = priceStore((state) => state.togglePlan);

  const path = usePathname();

  // monthly & yearly price handler
  const checkboxHandler = (e) => {
    if (e.target.checked) {
      togglePlan("1y");
    } else {
      togglePlan("1m");
    }
  };

  return (
    <>
      <section
        className={`our-pricing ${
          path === "/home-2" ? "pb90" : path === "/about-1" ? "pt0 pb0" : ""
        }`}
      >
        
      </section>
    </>
  );
}
