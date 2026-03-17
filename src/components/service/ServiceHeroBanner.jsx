import Image from "next/image";

export default function ServiceHeroBanner({
  title,
  description,
  imageSrc,
  eyebrow,
}) {
  return (
    <section className="breadcumb-section pt-0">
      <div className="cta-banner mx-auto maxw1700 pt120 pb120 bdrs16 position-relative overflow-hidden d-flex align-items-center px30-lg cta-service-v1 mx20-lg">
        <Image
          height={226}
          width={198}
          className="left-top-img wow zoomIn"
          src="/images/vector-img/left-top.png"
          alt="vector decoration"
        />
        <Image
          height={181}
          width={255}
          className="right-bottom-img wow zoomIn"
          src="/images/vector-img/right-bottom.png"
          alt="vector decoration"
        />
        <Image
          height={300}
          width={532}
          className="service-v1-vector d-none d-lg-block"
          src={imageSrc}
          alt={title}
          style={{ objectFit: "cover", borderRadius: "0 0 0 16px" }}
        />

        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-xl-5">
              <div className="position-relative">
                {eyebrow ? (
                  <span
                    className="d-inline-block mb15"
                    style={{ color: "var(--primary-color)", fontWeight: 600 }}
                  >
                    {eyebrow}
                  </span>
                ) : null}
                <h2>{title}</h2>
                <p className="text mb0">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
