import {FC} from "react";


export const Fireworks: FC = () => {
  return (
    <div className="fireworks">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="firework"/>
      ))}
    </div>
  );
};
