import Image from "next/image";

const aboutImages = [
  "/images/about/about-41.jpg",
  "/images/about/about-38.jpg",
  "/images/about/about-40.jpg",
  "/images/about/about-39.jpg",
];

export default function About2() {
  return (
    <>
      <section className="our-about pb90">
        <div className="container">
          <div className="row align-items-center">
            {aboutImages.map((item, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="position-relative mb30">
                  <Image
                    height={284}
                    width={334}
                    className="w100 w-100 h-100 object-fit-contain"
                    src={item}
                    alt="about img"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
