'use client';

export default function Pagination1({ 
  currentPage = 1, 
  totalItems = 0, 
  itemsPerPage = 5, 
  onPageChange 
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a 
            className="page-link" 
            onClick={() => handlePageClick(currentPage - 1)}
            style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}
          >
            <span className="fas fa-angle-left" />
          </a>
        </li>
        {getVisiblePages().map((page, i) => (
          <li 
            key={i} 
            className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
          >
            {page === '...' ? (
              <span className="page-link">...</span>
            ) : (
              <a 
                className="page-link" 
                onClick={() => handlePageClick(page)}
                style={{ cursor: 'pointer' }}
              >
                {page}
              </a>
            )}
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a 
            className="page-link" 
            onClick={() => handlePageClick(currentPage + 1)}
            style={{ cursor: currentPage === totalPages ? 'default' : 'pointer' }}
          >
            <span className="fas fa-angle-right" />
          </a>
        </li>
      </ul>
      <p className="mt10 mb-0 pagination_page_count text-center">
        {startItem} – {endItem} of {totalItems} projects
      </p>
    </div>
  );
}
