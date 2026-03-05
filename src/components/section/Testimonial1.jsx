"use client";
import { testimonial } from "@/data/project";
import Image from "next/image";
import { useEffect, useState } from "react";

const REVIEW_PAUSE_MS = 3000;

export default function Testimonial1() {
  const [currentIndex, setCurrentIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonial.length);
    }, REVIEW_PAUSE_MS);

    return () => clearInterval(interval);
  }, []);

  const testimonialHandler = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonial[currentIndex];

  return (
    <>
      <section className="our-testimonial">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 mx-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <h2>Testimonials</h2>
                <p className="paragraph">
                  Interdum et malesuada fames ac ante ipsum
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-8 m-auto wow fadeInUp"
              data-wow-delay="500ms"
            >
              <div className="testimonial-style2">
                {currentTestimonial && (
                  <>
                    <div
                      key={currentTestimonial.id}
                      className="testi-content text-md-center testimonial-slide"
                    >
                      <span className="icon fas fa-quote-left" />
                      <h4 className="testi-text">{currentTestimonial.title}</h4>
                      <h6 className="name">{currentTestimonial.name}</h6>
                      <p className="design">{currentTestimonial.company}</p>
                    </div>
                    <div className="tab-list position-relative">
                      <ul className="nav nav-pills justify-content-md-center">
                        {testimonial.map((item, index) => (
                          <li key={item.id} className="nav-item">
                            <button
                              onClick={() => testimonialHandler(index)}
                              className={`nav-link ${
                                index === currentIndex ? "active" : ""
                              }`}
                            >
                              <Image
                                height={70}
                                width={70}
                                src={item.image}
                                alt="user"
                                className="h-auto w-100 rounded-circle"
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .testimonial-slide {
            animation: testimonialSlideIn 0.65s ease;
          }

          @keyframes testimonialSlideIn {
            0% {
              opacity: 0;
              transform: translateX(28px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </section>
    </>
  );
}
