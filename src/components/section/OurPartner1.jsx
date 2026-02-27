"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const partners = [
  "/images/partners/1.png",
  "/images/partners/2.png",
  "/images/partners/3.png",
  "/images/partners/4.png",
  "/images/partners/5.png",
  "/images/partners/6.png",
];

export default function OurPartner1() {
  const path = usePathname();
  const marqueePartners = [...partners, ...partners];

  return (
    <>
      <section
        className={`our-partners ${
          path === "/" ||
          path === "/home-3" ||
          path === "/about-2" ||
          path === "/home-15" ||
          path === "/home-6"
            ? "pt0"
            : ""
        } ${path === "/home-8" ? "pt0 pb0" : ""} ${
          path === "/home-14" ? "bdrt1 pt55 pb55" : ""
        }
        ${path === "/home-16" ? "pt55 pb55" : ""}
        ${path === "/home-13" ? "pt55 pb55" : ""}
        `}
      >
        <div className="container">
          <div className="row">
            {path === "/home-14" ? (
              ""
            ) : (
              <div className="col-lg-12 wow fadeInUp">
                <div className="main-title text-center">
                  <h6>Trusted by the world's best</h6>
                </div>
              </div>
            )}
          </div>

          <div className="partner-marquee wow fadeInUp" data-wow-delay="200ms">
            <div className="partner-marquee-track">
              {marqueePartners.map((item, index) => (
                <div key={`${item}-${index}`} className="partner-marquee-item">
                  <div className="partner_item text-center">
                    <Image
                      height={26}
                      width={84}
                      className="wa m-auto w-100 h-100 object-fit-contain"
                      src={item}
                      alt={`Partner ${index + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .partner-marquee {
            overflow: hidden;
            width: 100%;
          }

          .partner-marquee-track {
            display: flex;
            align-items: center;
            gap: 40px;
            width: max-content;
            animation: partners-scroll 22s linear infinite;
          }

          .partner-marquee-item {
            flex: 0 0 140px;
          }

          .partner-marquee:hover .partner-marquee-track {
            animation-play-state: paused;
          }

          @media (max-width: 991px) {
            .partner-marquee-item {
              flex-basis: 120px;
            }
          }

          @keyframes partners-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-50% - 20px));
            }
          }
        `}</style>
      </section>
    </>
  );
}
