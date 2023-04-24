import { ResponsiveScatterPlot } from "@nivo/scatterplot";

const SummaryChart = ({
  chartData,
}: {
  chartData: {
    id: string;
    data: {
      x: number;
      y: number;
    }[];
  }[];
}) => {
  return (
    <ResponsiveScatterPlot
      data={chartData}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
      xScale={{ type: "linear", min: 0, max: 1 }}
      xFormat=">-.2f"
      yScale={{ type: "linear", min: 0, max: "auto" }}
      yFormat=">-.2f"
      blendMode="multiply"
      axisTop={null}
      axisRight={null}
      nodeSize={25}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Avg Answer Similarity Score",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Avg Latency (s)",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 130,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemsSpacing: 5,
          itemDirection: "left-to-right",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
export default SummaryChart;
