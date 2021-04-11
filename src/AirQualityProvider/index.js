import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import constate from "constate";
import { unionBy } from "lodash";

function useAirQualityData() {
  const _isMountedRef = useRef(true);
  const [data, setData] = useState([]);
  const [shouldReconnectSentinel, setShouldReconnectSentinel] = useState({});

  const onMessage = (message) => {
    try {
      const newData = JSON.parse(message);
      const parsedData = newData.map((n) => ({
        ...n,
        aqi: n.aqi.toFixed(2),
        Timestamp: Date.now(),
      }));
      if (parsedData && _isMountedRef.current) {
        setData((prev) => unionBy(parsedData, prev, "city"));
      }
    } catch (e) {}
  };

  const connectToWebsocket = useCallback(async () => {
    const ws = new WebSocket("ws://city-ws.herokuapp.com");

    ws.onmessage = function (evt) {
      onMessage(evt.data);
    };

    const keepAliveTimer = setInterval(() => {
      ws.send("keep alive");
    }, 9 * 60 * 1000);

    ws.onclose = function (e) {
      clearInterval(keepAliveTimer);
      if (e.code !== 4137) {
        setTimeout(() => {
          if (_isMountedRef.current) {
            setShouldReconnectSentinel({});
          }
        }, 500);
      }
    };

    return ws;
  }, []);

  useEffect(() => {
    _isMountedRef.current = true;
    let ws;
    (async () => {
      ws = await connectToWebsocket();
    })();

    return () => {
      if (ws) {
        ws.close(4137);
      }
      _isMountedRef.current = false;
    };
  }, [connectToWebsocket, shouldReconnectSentinel]);

  const qdata = useMemo(() => {
    return data.sort((a, b) => {
      if (a.city < b.city) {
        return -1;
      }
      if (a.city > b.city) {
        return 1;
      }
      return 0;
    });
  }, [data]);

  return {
    qdata,
  };
}

export const [AirQualityProvider, useAirQualityDataContext] = constate(
  useAirQualityData
);
