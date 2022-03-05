import React from "react";

interface ProfileCardPlaceholderProps {}

const ProfileCardPlaceholder: React.FC<ProfileCardPlaceholderProps> = ({}) => {
  return (
    <div className="card mt-2" aria-hidden="true" style={{ width: 300 }}>
      <div className="card-body">
        <div className="card-title placeholder-glow mb-4">
          <div className="d-flex justify-content-center ">
            <span
              className="placeholder col-4 rounded-circle"
              style={{ height: 35, width: 35 }}
            ></span>
          </div>
        </div>
        <div className="card-text placeholder-glow my-3">
          <span
            className="placeholder col-12 w-20 rounded"
            style={{ height: 60 }}
          ></span>
        </div>
        <div
          role="button"
          className="btn btn-primary disabled placeholder col-12"
        ></div>
      </div>
    </div>
  );
};
export default ProfileCardPlaceholder;
