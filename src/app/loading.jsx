export default function Loading() {
  return (
    <div className="global-page-loader is-visible" aria-hidden={false}>
      <div className="global-page-loader__inner">
        <span className="global-page-loader__ring" />
        <span className="global-page-loader__text">Loading...</span>
      </div>
    </div>
  );
}

