import "./App.css";
import Select from "react-select";
import { useState, useEffect } from "react";
import countryData from "countrycitystatejson";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const data = countryData.getAll();
  const [allCountryData, setAllCountryData] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setselectedCountry] = useState();
  const [selectedStates, setSelectedStates] = useState();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 300,
    }),
  };

  function getAllCountryData() {
    const arr = [];
    for (let i in data) {
      arr.push({ label: data[i].name, value: i });
    }
    setAllCountryData(arr);
  }

  function getStatesName(selectedCountry) {
    const country = selectedCountry.value;
    let arr = [];
    for (let i in data[country].states) {
      arr.push({ label: i, value: i });
    }
    setStates(arr);
    setSelectedStates(null);
  }

  function showMessage(msg) {
    toast(`Selected State is : ${msg}`);
  }

  useEffect(() => {
    getAllCountryData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStatesName(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedStates) {
      showMessage(selectedStates.label);
    }
  }, [selectedStates]);

  return (
    <div className="container">
      <div className="country_container">
        <p className="dropdown_label">Select a Country</p>
        <Select
          value={selectedCountry}
          onChange={setselectedCountry}
          options={allCountryData}
          styles={customStyles}
        />
      </div>
      <div className="states_container">
        <p className="dropdown_label">Select a State</p>
        <Select
          value={selectedStates}
          onChange={setSelectedStates}
          options={states}
          styles={customStyles}
        />
        {!selectedCountry && (
          <p className="select_country_text">
            *Please Select a Country to Select the State
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
