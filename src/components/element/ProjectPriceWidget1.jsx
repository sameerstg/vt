import Link from "next/link";

export default function ProjectPriceWidget1({ price, id }) {
  return (
    <>
      <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">{price || "$100 - $150"}</h3>
        <p className="text fz14">Project Budget</p>
        <div className="d-grid">
          <Link href={`/submit-proposal?taskId=${id}`} className="ud-btn btn-thm">
            Submit a Proposal
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </>
  );
}
