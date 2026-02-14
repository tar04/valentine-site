import {Dispatch, FC, SetStateAction} from "react";

import {Status} from "../types";


interface IAcceptedPage {
  setStatus: Dispatch<SetStateAction<Status>>;
}

export const AcceptedPage: FC<IAcceptedPage> = ({setStatus}) => {

  return (
    <div className="accepted-wrapper">
      <h1 className="title cursive-text">Ураааа 🎊 Я так і знав! 💖</h1>
      <h2 className="subtitle cursive-text">Так сильно любаю тебе, моя принцесо! ❤️❤️❤️</h2>
      <button className="continue" onClick={() => setStatus('invitation')}>Тут, здається, для тебе лист</button>
    </div>
  );
};