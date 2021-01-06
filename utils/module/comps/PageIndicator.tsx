import React, { ReactElement } from "react";
import PageDot from "./PageDot";
// import "../styles/PageIndicator.css";

interface Props {
  currentPage: number;
  pages: JSX.Element[];
  setCurrentPage: (page: number) => void;
}

function PageIndicator({
  pages,
  currentPage,
  setCurrentPage,
}: Props): ReactElement {
  const pagesCount = pages.length;

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        position: "fixed",
        right: "15px",
        top: "50%",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: "translateY(-50%)",
      }}
    >
      {pages.map((page, i) => (
        <PageDot
          key={i}
          page={page}
          current={currentPage === i}
          index={i}
          setCurrentPage={setCurrentPage}
        />
      ))}
    </div>
  );
}

export default PageIndicator;
