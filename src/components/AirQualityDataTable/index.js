import React from "react";
import { Table } from "reactstrap";
import { formatDistanceToNow } from "date-fns";
import classnames from "classnames";
import { useAirQualityDataContext } from "../../AirQualityProvider";
import styles from "./index.module.scss";

export default function AirQualityDataTable({ onRowClick }) {
  const { qdata } = useAirQualityDataContext();

  const getStyleClass = (aqi) => {
    return classnames({
      [styles.green]: aqi <= 50,
      [styles.greenYellow]: aqi > 50 && aqi <= 100,
      [styles.yellow]: aqi > 100 && aqi <= 200,
      [styles.orange]: aqi > 200 && aqi <= 300,
      [styles.lightRed]: aqi > 300 && aqi <= 400,
      [styles.red]: aqi > 500 && aqi <= 500,
    });
  };

  return (
    <Table bordered responsive hover size="sm">
      <thead>
        <tr>
          <th>City</th>
          <th>Current AQI</th>
          <th>Last updated</th>
        </tr>
      </thead>
      <tbody>
        {qdata.map((v) => (
          <tr
            key={v.city}
            className={getStyleClass(v.aqi)}
            onClick={() => onRowClick(v.city)}
          >
            <td>{v.city}</td>
            <td>{v.aqi}</td>
            <td>{formatDistanceToNow(v.Timestamp)} ago</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
