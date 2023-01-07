import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./Components/TopButtons";
import Inputs from "./Components/Inputs";
import TimeandLocation from "./Components/TimeAndLocation";
import TempratureAndDetails from "./Components/TempratureAndDetails";
import Forcast from "./Components/Forcast";
import getFormattedWeatherData from "./Services/WeatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [query, setQuery] = useState(); //{ q: "perth" }
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully Fetched Weather For ${data.name}, ${data.country}.`
        );
        setWeather(data);
      });
      //const data =   console.log(data);
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-purple-200 to-blue-700"; //
    const thershold = units === "metric" ? 20 : 60;
    if (weather.temp <= thershold) return "from-cyan-200 to-blue-700";
    return "from-yellow-400 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-200 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeandLocation weather={weather} />
          <TempratureAndDetails weather={weather} />
          <Forcast title={"Hourly Forecast"} items={weather.hourly} />
          <Forcast title={"Daily Forecast"} items={weather.daily} />
        </div>
      )}

      <ToastContainer
        autoClose={5000}
        theme="colored"
        position="top-right"
        newestOnTop={true}
      />
    </div>
  );
}
export default App;
