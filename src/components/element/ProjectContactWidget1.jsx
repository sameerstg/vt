import Image from "next/image";
import Link from "next/link";

export default function ProjectContactWidget1() {
  return (
    <>
      <div className="worker-style1 service-single mb-0 bdrs8">
        <h4>About Buyer</h4>
        <div className="wrapper d-flex align-items-center mt20">
          <div className="thumb position-relative mb25">
            <Image
              height={60}
              width={60}
              className="rounded-circle mx-auto"
              src="/images/team/client-1.png"
              alt="client"
            />
          </div>
          <div className="ml20">
            <h5 className="title mb-1">Dropbox</h5>
            <p className="mb-0">Digital Marketing</p>
            <div className="review">
              <p>
                <i className="fas fa-star fz10 review-color pr10" />
                <span className="dark-color">4.9</span> (595 reviews)
              </p>
            </div>
          </div>
        </div>
        <hr className="opacity-100" />
        <div className="d-grid mt30">
          <Link href="/submit-proposal" className="ud-btn btn-thm-border">
            Contact Buyer
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </>
  );
}
