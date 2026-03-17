import Image from "next/image";
import Link from "next/link";

export default function ProjectContactWidget1({ client, clientName }) {
  const name = client?.name || clientName || "Client";
  const email = client?.email || "";

  return (
    <>
      <div className="freelancer-style1 service-single mb-0 bdrs8">
        <h4>About Buyer</h4>
        <div className="wrapper d-flex align-items-center mt20">
          <div className="thumb position-relative mb25">
            {client?.profileImage || client?.img ? (
              <Image
                height={60}
                width={60}
                className="rounded-circle mx-auto"
                src={client.profileImage || client.img}
                alt="client"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center bg-light fw600 text-thm border"
                style={{ width: "60px", height: "60px", fontSize: "24px" }}
              >
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="ml20">
            <h5 className="title mb-1">{name}</h5>
            <p className="mb-0">{email}</p>
            <div className="review">
              <p>
                <i className="fas fa-star fz10 review-color pr10" />
                <span className="dark-color">5.0</span> (New Client)
              </p>
            </div>
          </div>
        </div>
        <hr className="opacity-100" />
        <div className="details">
          <div className="fl-meta d-flex align-items-center justify-content-between text-center">
            <div className="meta fw500">
              Location
              <br />
              <span className="fz14 fw400">{client?.location || "Global"}</span>
            </div>
            <div className="meta fw500">
              Projects
              <br />
              <span className="fz14 fw400">{client?.createdTasks?.length || 1}</span>
            </div>
          </div>
        </div>
        <div className="d-grid mt30">
          <Link href={`/submit-proposal?taskId=${client?.id || ''}`} className="ud-btn btn-thm-border">
            Contact Buyer
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </>
  );
}
