import { actions } from "astro:actions";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const Scheduled = ({ user, curr }: { user: string, curr: { id: number; name: string } | null }) => {
  const [scheduled, setScheduled] = useState<Record<string, number>>({});
  const [scheduledChart, setScheduledChart] = useState<{
    series: { data: { x: string; y: number }[] }[];
  }>({
    series: [
      {
        data: [],
      },
    ],
  });

  async function getScheduled(deckId?: number) {
    await actions.stats.getScheduled({ user: user, deck: deckId }).then((res) => {
      if (res.data) {
        setScheduled(res.data.data);
      }
    })
  }

  function updateScheduledChart() {
    const dates = Object.keys(scheduled).sort();
    const counts = dates.map(date => scheduled[date]);

    setScheduledChart({
      series: [
        {
          data: dates.map((date, index) => ({
            x: date,
            y: counts[index]
          }))
        }
      ],
    });
  }

  useEffect(() => {
    getScheduled(curr ? curr.id : undefined);
  }, [curr]);
  useEffect(() => {
    updateScheduledChart();
  }, [scheduled]);

  return (
    <div className="bg-base-200 rounded-box shadow-md w-full m-auto gap-4 p-4 flex flex-col text-center">
      <h2 className="font-bold text-lg p-2">Scheduled Cards</h2>
      <div className="overflow-x-auto">
        <Chart
          type="bar"
          series={scheduledChart.series}
          options={{
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 3,
                borderRadiusApplication: 'end', // 'around', 'end'
                borderRadiusWhenStacked: 'last', // 'all', 'last'
                dataLabels: {
                  total: {
                    enabled: false,
                  },
                }
              },
            },
            chart: {
              stacked: true,
              foreColor: "#999999",
              zoom: {
                enabled: true,
                type: 'x',
                autoScaleYaxis: true
              }
            },
          }}
        />
      </div>
    </div>
  );
}