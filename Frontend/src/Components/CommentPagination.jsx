import React from "react";

const CommentPagination = ({ pagination, onPageChange }) => {
  const { total, page, totalPages } = pagination;

  if (!pagination || totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 disabled:opacity-50 bg-gray-200 rounded">
        Previous
      </button>

      <span className="text-sm">
        Page {page} of {totalPages} ({total} comments)
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 disabled:opacity-50 bg-gray-200 rounded">
        Next
      </button>
    </div>
  );
};

export default CommentPagination;
