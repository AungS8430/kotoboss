import { actions } from "astro:actions";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const CardCounts = ({ user, curr }: { user: string, curr: { id: number; name: string } | null }) => {
  const [cardCounts, setCardCounts] = useState<object>({});
  const [cardCountsChart, setCardCountsChart] = useState<{
    series: number[];
    labels: string[];
  }>({
    series: [],
    labels: [],
  });

  async function getCardCounts(deckId?: number) {
    await actions.stats.getCardCounts({ user: user, deck: deckId }).then((res) => {
      if (res.data) {
        setCardCounts(res.data.data);
      }
    })
  }

  function updateCardCountsChart() {
    setCardCountsChart({
      series: Object.values(cardCounts),
      labels: Object.keys(cardCounts),
    });
  }

  useEffect(() => {
    getCardCounts(curr ? curr.id : undefined);
  }, [curr]);
  useEffect(() => {
    updateCardCountsChart();
  }, [cardCounts]);

  return (
    <div className="bg-base-200 rounded-box shadow-md w-full m-auto gap-4 p-4 flex flex-col text-center">
      <h2 className="font-bold text-lg p-2">Card Counts</h2>
      <div className="overflow-x-auto">
        <Chart
          type="pie"
          series={cardCountsChart.series}
          options={{
            labels: cardCountsChart.labels,
            chart: {
              foreColor: "#999999",
            },
          }}
        />
      </div>
    </div>
  );
}