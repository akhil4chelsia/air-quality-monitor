import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { useAirQualityDataContext } from "../../AirQualityProvider";

export default function AirQualityLiveStat({ city }) {
  const { qdata } = useAirQualityDataContext();

  const formatedData = qdata.filter((each) => each.city === city);

  var history = [];
  var existing = localStorage.getItem(city);
  if (existing) {
    existing = existing ? JSON.parse(existing) : [];
    history = [...existing, ...formatedData];
    history =
      history.length > 8
        ? history.slice(history.length - 8, history.length - 1)
        : history;
  } else {
    history = [...formatedData];
  }

  localStorage.setItem(city, JSON.stringify(history));

  const data = history.map((each) => ({
    name: format(each.Timestamp, "HH:MM:SS"),
    time: each.aqi,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          label={{ value: `AQI - ${city}`, angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="time" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
