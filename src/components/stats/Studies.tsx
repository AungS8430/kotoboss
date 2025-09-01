import { actions } from "astro:actions";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";



export const Studies = ({ user, curr }: { user: string, curr: { id: number; name: string } | null }) => {
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

  async function getStudies(deckId?: number) {
    await actions.stats.getStudies({ user: user, deck: deckId }).then((res) => {
      if (res.data) {
        setStudies(res.data.data);
      }
    })
  }

  function generateDateRange(startDate: Date, endDate: Date): Date[] {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = studies.length > 0 ? new Date(studies[0].date) : today;
    for (const date of generateDateRange(start, today)) {
      const formattedDate = date.toISOString().split('T')[0];
      categories.push(formattedDate);

      const study = studies.find(
        (s) => new Date(s.date).toISOString().split('T')[0] === formattedDate
      );
      (seriesData.new as number[]).push(study ? study.new : 0);
      (seriesData.learning as number[]).push(study ? study.learning : 0);
      (seriesData.relearning as number[]).push(study ? study.relearning : 0);
      (seriesData.young as number[]).push(study ? study.young : 0);
      (seriesData.mature as number[]).push(study ? study.mature : 0);
    }
    console.log(seriesData);
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
    getStudies(curr ? curr.id : undefined);
  }, [curr]);
  useEffect(() => {
    updateStudiesChart();
  }, [studies]);

  return (
    <div className="bg-base-200 rounded-box shadow-md w-full m-auto gap-4 p-4 flex flex-col text-center">
      <h2 className="font-bold text-lg p-2">Studies Statistics</h2>
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
            xaxis: {
              ...studiesChart.xaxis,
            }
          }}
        />
      </div>
    </div>
  );
}