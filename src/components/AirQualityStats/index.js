import React, { useMemo } from "react";
import { useAirQualityDataContext } from "../../AirQualityProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AirQualityStats() {
  const { qdata } = useAirQualityDataContext();

  const formatedData = useMemo(() => {
    return qdata.map((d) => ({ name: d.city, city: d.aqi }));
  }, [qdata]);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={formatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: `Air Quality Index`,
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="city" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
