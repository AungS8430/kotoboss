import { useState, useEffect } from "react";
import { actions } from "astro:actions";

interface CardObject {
  id: number;
  due: Date;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: number;
  last_review: Date | undefined | null;
  front: string;
  back: string;
  media: string | undefined | null;
}

export const Study = ({ deck_id, user }: { deck_id: number; user: string }) => {
  const [deckName, setDeckName] = useState("");
  const [card, setCard] = useState<CardObject | null>(null);
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState<number>(0);
  const [studies, setStudies] = useState<{ learn: number, review: number, new: number }>({ learn: 0, review: 0, new: 0 });
  const [activeState, setActiveState] = useState<"new" | "learn" | "review" | null>(null);

  async function fetchCards() {
    await actions.study.fetchCard({ deck_id: deck_id, user: user }).then((res) => {
      if (res.data) {
        setCard(res?.data?.card);
        setStatus(res?.data?.status);

        if (res?.data?.card.state === 0) setActiveState("new");
        if (res?.data?.card.state === 1 || res?.data?.card.state === 3) setActiveState("learn");
        if (res?.data?.card.state === 2) setActiveState("review");
      }
    });
    await actions.study.fetchStudies({ user: user, deck_id: deck_id }).then((res) => {
      if (res.data) {
        setStudies(res.data);
      }
    });
  }

  async function studyAction(grade: number) {
    if (!card) return;

    await actions.study.studyAction({ user: user, deck_id: deck_id, card_id: card.id, grade: grade });
    fetchCards();
    setToggle(false);
  }

  useEffect(() => {
    fetchCards();
    actions.study.fetchDeckName({ deck_id: deck_id, user: user }).then((res) => {
      if (res.data) {
        setDeckName(res.data);
      }
    });
  }, [deck_id, user]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && toggle) {
        studyAction(2);
      } else if (e.key === " " && !toggle) {
        setToggle(true);
      } else if (e.key === "1" && toggle) {
        studyAction(0);
      } else if (e.key === "2" && toggle) {
        studyAction(1);
      } else if (e.key === "3" && toggle) {
        studyAction(2);
      } else if (e.key === "4" && toggle) {
        studyAction(3);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggle, studyAction]);

  return (
    <div className="bg-base-100 rounded-box shadow-md md:w-2xl h-[80vh] m-auto gap-4 p-4 flex flex-col text-center justify-center">
      <h1 className="font-bold text-neutral-400">Studying {deckName}</h1>
      {card ? (
        <div className="flex flex-col gap-2 grow">
          <div className="grow place-content-center">
            <h2 className="text-xl font-semibold mb-2">{card.front}</h2>
            {toggle ? (
              <div>
                <p className="mb-4">{card.back}</p>
              </div>
            ) : null}
          </div>

          {toggle ? (
            <div>
              <div className="flex justify-center gap-2">
                <button onClick={() => studyAction(0)} className="btn text-red-500 btn-soft">
                  <kbd className="kbd">1</kbd>
                  Again
                </button>
                <button onClick={() => studyAction(1)} className="btn text-yellow-500 btn-soft">
                  <kbd className="kbd">2</kbd>
                  Hard
                </button>
                <button onClick={() => studyAction(2)} className="btn text-green-500 btn-soft">
                  <kbd className="kbd">3</kbd>
                  Good
                </button>
                <button onClick={() => studyAction(3)} className="btn text-blue-500 btn-soft">
                  <kbd className="kbd">4</kbd>
                  Easy
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center">
                <button onClick={() => setToggle(true)} className="btn btn-soft text-white">
                  <kbd className="kbd">␣</kbd>
                  Flip
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="grow place-content-center">{status === -1 ? "Studies finished for today :)" : "Loading..."}</p>
      )}

      <div className="bg-base-300 p-2 rounded-md">
        <p className="flex gap-1 justify-center">
          <span className={`text-primary ${activeState === "new" ? "underline" : ""}`} id="snew">{studies.new}</span>
          <span className={`text-warning ${activeState === "learn" ? "underline" : ""}`} id="slearn">{studies.learn}</span>
          <span className={`text-success ${activeState === "review" ? "underline" : ""}`} id="sreview">{studies.review}</span>
        </p>
      </div>
    </div>
  );
};