import React from "react";

interface PlaceHolderProps {}

const ContentPlaceholder: React.FC<PlaceHolderProps> = ({}) => {
  return (
    <div
      className="card d-flex flex-row justify-content-center my-2"
      aria-hidden="true"
    >
      <div className="mt-2 ms-3">
        <i className={"bi bi-caret-up btn"} />
        <div className="text-center"></div>
        <i className={"bi bi-caret-down btn"} />
      </div>
      <div className="card-body">
        <div className="card-text placeholder-glow" style={{ height: 30 }}>
          <span className="placeholder col-5 rounded"></span>
        </div>
        <h5 className="card-title placeholder-glow">
          <span
            className="placeholder col-7 rounded"
            style={{ height: 35 }}
          ></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span
            className="placeholder col-12 w-100"
            style={{ height: 300 }}
          ></span>
          <span className="placeholder col-2 me-2 rounded"></span>
          <span className="placeholder col-1 rounded"></span>
        </p>
      </div>
    </div>
  );
};

export default ContentPlaceholder;
