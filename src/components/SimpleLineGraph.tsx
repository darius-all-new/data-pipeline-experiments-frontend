/*
Displays a simple line graph for just one measurement
*/

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Data {
  [key: string]: number | string | boolean;
  time: string;
}

interface Props {
  measurement: string;
  data: Data[];
}

const SimpleLineGraph = (props: Props) => {
  return (
    <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
      <LineChart
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="none" />
        <XAxis dataKey="time" />
        <YAxis
          domain={[
            (dataMin: number) => Math.round(dataMin * 100) / 100,
            (dataMax: number) => Math.round(dataMax * 100) / 100,
          ]}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={props.measurement}
          stroke="#000000"
          dot={false}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineGraph;
