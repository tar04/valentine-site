import {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from "react";

import {Status} from "../types";


interface IPendingPage {
  setStatus: Dispatch<SetStateAction<Status>>;
}

export const PendingPage: FC<IPendingPage> = ({setStatus}) => {

  const [noPosition, setNoPosition] = useState({top: 0, left: 0});

  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);
  const safeAreaRef = useRef<HTMLDivElement | null>(null);

  const moveNoButton = () => {
    if (!noButtonRef.current || !yesButtonRef.current || !safeAreaRef.current) return;

    const buttonWidth = noButtonRef.current.offsetWidth;
    const buttonHeight = noButtonRef.current.offsetHeight;

    const safeRect = safeAreaRef.current.getBoundingClientRect();
    const yesRect = yesButtonRef.current.getBoundingClientRect();

    const padding = 20;
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    let randomX, randomY;

    do {
      randomX = Math.random() * (maxX - padding) + padding;
      randomY = Math.random() * (maxY - padding) + padding;
    } while (
      // перевірка перекриття тексту
    (randomX < safeRect.right &&
      randomX + buttonWidth > safeRect.left &&
      randomY < safeRect.bottom &&
      randomY + buttonHeight > safeRect.top) ||
    // перевірка перекриття кнопки "Так"
    (randomX < yesRect.right &&
      randomX + buttonWidth > yesRect.left &&
      randomY < yesRect.bottom &&
      randomY + buttonHeight > yesRect.top)
      );

    setNoPosition({top: randomY, left: randomX});
  };

  useEffect(() => {
    if (yesButtonRef.current) {
      const yesRect = yesButtonRef.current.getBoundingClientRect();
      setNoPosition({
        top: yesRect.top,
        left: yesRect.right + 40,
      });
    }
  }, []);
  return (
    <div className="safe-area" ref={safeAreaRef}>
      <h1 className="title">Ти будеш моєю валентинкою? 💘</h1>

      <div className="buttons-row">
        <button
          ref={yesButtonRef}
          className="yes animate"
          onClick={() => setStatus('accepted')}
        >
          Так ❤️
        </button>

        <button
          ref={noButtonRef}
          className="no"
          style={{position: "fixed", top: noPosition.top, left: noPosition.left}}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
        >
          Ні 😢
        </button>
      </div>
    </div>
  );
};