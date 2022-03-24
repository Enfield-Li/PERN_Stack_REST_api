import React from "react";

interface RepliesProps {}

const Replies: React.FC<RepliesProps> = ({}) => {
  return (
    <div>
      <div>
        <i className="bi bi-hand-thumbs-up" role="button"></i>
        <i className="bi bi-hand-thumbs-down mx-3" role="button"></i>
      </div>
    </div>
  );
};

export default Replies;
