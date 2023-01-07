import React from "react";
import { formatToLocalTime } from "../Services/WeatherService";

function TimeandLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex item-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex item-center justify-center my-3">
        <p className="text-white text-xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeandLocation;
