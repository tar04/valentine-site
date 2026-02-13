import React, {FC} from "react";


export const Hearts: FC = () => {
  return (
    <div className="hearts">
      {[...Array(15)].map((_, i) => (
        <span key={i}>❤️</span>
      ))}
    </div>
  );
};

