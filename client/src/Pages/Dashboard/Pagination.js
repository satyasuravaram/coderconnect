import React from "react";
import "./Dashboard.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="search-container">
      <ul className="pagination center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              href="#"
              className="page-link page-anchor"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
