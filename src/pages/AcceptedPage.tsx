import {Dispatch, FC, SetStateAction} from "react";

import {Status} from "../types";


interface IAcceptedPage {
  setStatus: Dispatch<SetStateAction<Status>>;
}

export const AcceptedPage: FC<IAcceptedPage> = ({setStatus}) => {

  return (<h1 className="success animate">
      Урааа! 💖🎆 Тепер ти моя валентинка!
      <button className="continue" onClick={() => setStatus('invitation')}>Далі</button>
    </h1>
  );
};