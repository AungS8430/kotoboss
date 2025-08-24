import { actions } from "astro:actions";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";



export const Stats = ({ user }: { user: string }) => {
  const [decks, setDecks] = useState<{ id: number; name: string }[]>([]);
  const [curr, setCurr] = useState<{ id: number; name: string } | null>(null);
  const [studies, setStudies] = useState<{ date: Date; count: number; new: number; learning: number; relearning: number; young: number; mature: number }[]>([]);
  const [studiesChart, setStudiesChart] = useState({
    series: [
      {
        name: "New",
        data: []
      },
      {
        name: "Learning",
        data: []
      },
      {
        name: "Relearning",
        data: []
      },
      {
        name: "Young",
        data: []
      },
      {
        name: "Mature",
        data: []
      }
    ],
    xaxis: {
      categories: [] as string[]
    }
  })

  async function fetchDecks() {
    await actions.stats.getDecks({ user: user }).then((res) => {
      if (res.data) {
        setDecks(res.data.decks);
      }
    });
  }

  async function getStudies(deckId?: number) {
    await actions.stats.getStudies({ user: user, deck: deckId }).then((res) => {
      if (res.data) {
        setStudies(res.data.data);
      }
    })
  }

  function updateStudiesChart() {
    const seriesData = {
      new: [],
      learning: [],
      relearning: [],
      young: [],
      mature: []
    };
    const categories: any[] = [];
    studies.forEach((study: { date: Date; count: number; new: number; learning: number; relearning: number; young: number; mature: number }) => {
      (seriesData.new as number[]).push(study.new);
      (seriesData.learning as number[]).push(study.learning);
      (seriesData.relearning as number[]).push(study.relearning);
      (seriesData.young as number[]).push(study.young);
      (seriesData.mature as number[]).push(study.mature);
      const dateObj = new Date(study.date);
      const formattedDate = dateObj.toISOString();
      categories.push(formattedDate);
    });
    setStudiesChart({
      series: [
        { name: "New", data: seriesData.new },
        { name: "Learning", data: seriesData.learning },
        { name: "Relearning", data: seriesData.relearning },
        { name: "Young", data: seriesData.young },
        { name: "Mature", data: seriesData.mature }
      ],
      xaxis: {
        categories: categories
      }
    });
  }

  useEffect(() => {
    fetchDecks();
  }, [user]);
  useEffect(() => {
    getStudies(curr ? curr.id : undefined);
  }, [curr, decks]);
  useEffect(() => {
    updateStudiesChart();
  }, [studies]);

  return (
    <div className="bg-base-100 rounded-box shadow-md md:w-2xl m-auto gap-4 p-4 flex flex-col text-center">
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
      <div className="overflow-x-auto">
        <Chart
          type="bar"
          series={studiesChart.series}
          options={{
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 3,
                borderRadiusApplication: 'end', // 'around', 'end'
                borderRadiusWhenStacked: 'last', // 'all', 'last'
                dataLabels: {
                  total: {
                    enabled: true,
                    style: {
                      fontSize: '13px',
                      fontWeight: 900
                    }
                  }
                }
              },
            },
            chart: {
              stacked: true,
            },
            xaxis: {
              ...studiesChart.xaxis,
              type: "datetime",
            }
          }}
        />
      </div>
    </div>
  );
}