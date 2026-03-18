"use client";

import { useState } from "react";
import Link from "next/link";
import FooterHeader from "./ui/FooterHeader";
import FooterSelect2 from "./ui/FooterSelect2";
import { about, category, support } from "@/data/footer";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    setMessage("Successfully subscribed. Check your email for confirmation.");
    setShowMessage(true);
    setEmail("");
    setTimeout(() => setShowMessage(false), 4000);
  };

  return (
    <>
      <section className="footer-style1 pt25 pb-0">
        <div className="container">
          <FooterHeader />
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="link-style1 mb-4 mb-sm-5">
                <h5 className="text-white mb15">About</h5>
                <div className="link-list">
                  {about.map((item, i) => (
                    <Link key={i} href={item.path}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="link-style1 mb-4 mb-sm-5">
                <h5 className="text-white mb15">Categories</h5>
                <ul className="ps-0">
                  {category.map((item, i) => (
                    <li key={i}>
                      <Link href={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="link-style1 mb-4 mb-sm-5">
                <h5 className="text-white mb15">Support</h5>
                <ul className="ps-0">
                  {support.map((item, i) => (
                    <li key={i}>
                      <Link href={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="footer-widget">
                <div className="footer-widget mb-4 mb-sm-5">
                  <div className="mailchimp-widget">
                    <h5 className="title text-white mb20">Subscribe</h5>
                    <form onSubmit={handleSubmit}>
                      <div className="mailchimp-style1">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your email address"
                          value={email}
                          onChange={handleEmailChange}
                        />
                        <button
                          type="submit"
                          disabled={!email}
                          style={{
                            opacity: email ? 1 : 0.5,
                            cursor: email ? "pointer" : "not-allowed",
                          }}
                        >
                          Send
                        </button>
                      </div>
                    </form>

                    {showMessage && (
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "10px",
                          borderRadius: "4px",
                          backgroundColor: message.includes("Successfully")
                            ? "#4CAF50"
                            : "#f44336",
                          color: "white",
                          fontSize: "12px",
                          textAlign: "center",
                          animation: "fadeIn 0.3s ease-in-out",
                        }}
                      >
                        {message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container white-bdrt1 py-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="text-center text-lg-start">
                <p className="copyright-text mb-2 mb-md-0 text-white-light ff-heading">
                  (c) Veritask. 2025. All rights reserved.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="footer_bottom_right_btns text-center text-lg-end">
                <FooterSelect2 />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
