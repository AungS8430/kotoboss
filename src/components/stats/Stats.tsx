import { actions } from "astro:actions";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Studies } from "./Studies.tsx";
import { Scheduled } from "./Scheduled.tsx";
import { CardCounts } from "./CardCounts.tsx"



export const Stats = ({ user }: { user: string }) => {
  const [decks, setDecks] = useState<{ id: number; name: string }[]>([]);
  const [curr, setCurr] = useState<{ id: number; name: string } | null>(null);

  async function fetchDecks() {
    await actions.stats.getDecks({ user: user }).then((res) => {
      if (res.data) {
        setDecks(res.data.decks);
      }
    });
  }

  useEffect(() => {
    fetchDecks();
  }, [user]);

  return (
    <div className="bg-base-100 rounded-box shadow-md md:w-2xl m-auto gap-4 p-4 flex flex-col text-center max-h-full overflow-y-auto">
      <div className="flex flex-row w-full">
        <h1 className="font-bold text-xl p-2">Stats</h1>
        <div className="grow" />
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn">{curr == null ? "All Decks" : curr.name} ▼</div>
          <ul tabIndex={0} className="dropdown-content menu rounded-box bg-base-200 shadow-sm absolute">
            <li>
              <a onClick={() => {
                setCurr(null);
                document.activeElement && (document.activeElement as HTMLElement).blur();
              }} className="whitespace-nowrap">All Decks</a>
            </li>
            {
              decks.map((deck) => (
                <li key={deck.id}>
                  <a
                    onClick={() => {
                      setCurr({ id: deck.id, name: deck.name });
                      document.activeElement && (document.activeElement as HTMLElement).blur();
                    }}
                    className="whitespace-nowrap"
                  >
                    {deck.name}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      <Studies user={user} curr={curr} />
      <Scheduled user={user} curr={curr} />
      <CardCounts user={user} curr={curr} />
    </div>
  );
}