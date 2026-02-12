import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
    const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
    const [accepted, setAccepted] = useState(false);
    const [musicStarted, setMusicStarted] = useState(false);

    const noButtonRef = useRef<HTMLButtonElement | null>(null);
    const yesButtonRef = useRef<HTMLButtonElement | null>(null);
    const safeAreaRef = useRef<HTMLDivElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

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

        setNoPosition({ top: randomY, left: randomX });
    };

    const startMusic = () => {
        if (!musicStarted && audioRef.current) {
            audioRef.current.play();
            setMusicStarted(true);
        }
    };

    useEffect(() => {
        // стартове положення поруч з кнопкою "Так"
        if (yesButtonRef.current) {
            const yesRect = yesButtonRef.current.getBoundingClientRect();
            setNoPosition({
                top: yesRect.top,
                left: yesRect.right + 40,
            });
        }
    }, []);

    return (
        <div className="container" onClick={startMusic}>

            {/* Flying hearts */}
            <div className="hearts">
                {[...Array(15)].map((_, i) => (
                    <span key={i}>❤️</span>
                ))}
            </div>

            {/* 🎆 Феєрверки */}
            {accepted && (
                <div className="fireworks">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="firework" />
                    ))}
                </div>
            )}

            {!accepted ? (
                <div className="safe-area" ref={safeAreaRef}>
                    <h1 className="title">Ти будеш моєю валентинкою? 💘</h1>

                    <div className="buttons-row">
                        <button
                            ref={yesButtonRef}
                            className="yes animate"
                            onClick={() => setAccepted(true)}
                        >
                            Так ❤️
                        </button>

                        <button
                            ref={noButtonRef}
                            className="no"
                            style={{ position: "fixed", top: noPosition.top, left: noPosition.left }}
                            onMouseEnter={moveNoButton}
                            onTouchStart={moveNoButton}
                        >
                            Ні 😢
                        </button>
                    </div>
                </div>
            ) : (
                <h1 className="success animate">
                    Урааа! 💖🎆 Тепер ти моя валентинка!
                </h1>
            )}
        </div>
    );
}

export default App;
