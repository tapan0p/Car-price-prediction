import { useState } from "react";
import { FaCarAlt, FaRupeeSign, FaChartLine, FaEnvelope } from "react-icons/fa";

const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "Contact", href: "#contact" },
  { name: "Market Analysis", href: "#market" },
];

// Predefined options for dropdown selects
const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const DRIVE_TYPES = ["Manual", "Automatic"];
const CAR_TYPES = ["Sedan", "HatchBack", "SUV", "MUV", "Luxury"];
const LOCATIONS = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
];
const CURRENT_YEAR = new Date().getFullYear();

const dropdown = {
  "Car Name": [
    "Maruti S PRESSO",
    "Hyundai Xcent",
    "Tata Safari",
    "Maruti Vitara Brezza",
    "Tata Tiago",
    "Maruti Swift",
    "Hyundai i20",
    "Renault Kwid",
    "Hyundai Grand i10",
    "Maruti IGNIS",
    "Honda Brio",
    "Hyundai Elite i20",
    "Honda City",
    "Maruti Baleno",
    "Honda WR-V",
    "Honda Amaze",
    "Maruti Alto 800",
    "Maruti Celerio",
    "Ford Ecosport",
    "Maruti Ciaz",
    "Datsun Redi Go",
    "Tata TIAGO NRG",
    "Hyundai Santro Xing",
    "Ford FREESTYLE",
    "Maruti Dzire",
    "Maruti Alto",
    "Hyundai NEW SANTRO",
    "Maruti Alto K10",
    "Ford Endeavour",
    "Maruti Swift Dzire",
    "Maruti Wagon R 1.0",
    "Hyundai GRAND I10 NIOS",
    "Maruti Celerio X",
    "Toyota URBAN CRUISER",
    "Mahindra XUV500",
    "Hyundai Verna",
    "Hyundai VENUE",
    "Tata NEXON",
    "Mahindra KUV 100 NXT",
    "Toyota YARIS",
    "Mahindra XUV 3OO",
    "Renault TRIBER",
    "Hyundai Tucson New",
    "Mahindra TUV300",
    "Toyota Glanza",
    "Maruti Eeco",
    "Renault Duster",
    "Hyundai i10",
    "Nissan MAGNITE",
    "KIA SONET",
    "Maruti Ertiga",
    "Honda Jazz",
    "KIA SELTOS",
    "Volkswagen Ameo",
    "Renault Kiger",
    "Honda Accord",
    "Hyundai NEW I20",
    "Tata ALTROZ",
    "Maruti A Star",
    "Maruti Ritz",
    "Nissan Micra",
    "Hyundai Eon",
    "Hyundai Creta",
    "Mahindra Bolero",
    "Toyota Etios Liva",
    "Maruti New Wagon-R",
    "Nissan Micra Active",
    "Tata Harrier",
    "Tata TIGOR",
    "Tata PUNCH",
    "Volkswagen Polo",
    "Toyota Camry",
    "Toyota Corolla Altis",
    "Honda Civic",
    "Volkswagen Vento",
    "Maruti S Cross",
    "Skoda Octavia",
    "Hyundai i20 Active",
    "Hyundai New Elantra",
    "Honda BR-V",
    "Hyundai AURA",
    "Mahindra Thar",
    "Maruti Zen Estilo",
    "Hyundai NEW I20 N LINE",
    "Tata Hexa",
    "Maruti XL6",
    "Honda CRV",
    "Toyota Innova",
    "Skoda Rapid",
    "Datsun Go",
    "Maruti Wagon R Stingray",
    "Volkswagen TIGUAN",
    "Toyota Etios",
    "Tata Zest",
    "Ford New Figo",
    "Mahindra Kuv100",
    "Skoda SLAVIA",
    "Mahindra Scorpio",
    "Nissan Terrano",
    "Volkswagen TAIGUN",
    "Renault Captur",
    "Mahindra XUV700",
    "Hyundai Sonata",
    "Mahindra BOLERO NEO",
    "Maruti BREZZA",
    "Datsun Go Plus",
    "Hyundai ALCAZAR",
    "Jeep Compass",
    "Toyota Innova Crysta",
    "KIA CARENS",
    "Skoda KUSHAQ",
    "Volkswagen Jetta",
    "Renault Pulse",
    "Ford Figo Aspire",
    "Maruti Wagon R",
    "Mahindra TUV 300 PLUS",
    "MG HECTOR PLUS",
    "Tata Bolt",
    "MG HECTOR",
    "Volkswagen T-ROC",
    "Maruti OMNI E",
    "Jeep GRAND CHEROKEE",
    "Toyota Fortuner",
    "Mahindra MARAZZO",
    "Nissan Sunny",
  ],
  Fuel: ["PETROL", "DIESEL", "CNG", "LPG"],
  Location: [
    "HR-98",
    "TN-22",
    "TS-08",
    "WB-24",
    "HR-51",
    "MH-14",
    "MH-12",
    "UP-32",
    "HR-26",
    "KA-04",
    "PB-10",
    "MH-48",
    "GJ-05",
    "GJ-27",
    "MH-47",
    "KA-01",
    "MH-01",
    "GJ-01",
    "PB-91",
    "TN-19",
    "UP-16",
    "KA-19",
    "WB-02",
    "DL-8C",
    "DL-12",
    "CH-01",
    "KA-53",
    "KA-02",
    "TS-13",
    "KL-22",
    "KL-09",
    "HR-10",
    "MH-05",
    "TS-07",
    "DL-11",
    "MH-46",
    "MH-04",
    "KA-05",
    "UP-14",
    "HR-16",
    "DL-9C",
    "GJ-02",
    "RJ-02",
    "BR-01",
    "MH-02",
    "DL-14",
    "TN-02",
    "KL-27",
    "UP-78",
    "TN-14",
    "KL-45",
    "WB-90",
    "AP-23",
    "KL-41",
    "PB-70",
    "TN-09",
    "MH-03",
    "DL-1C",
    "MP-09",
    "KL-01",
    "KA-03",
    "WB-20",
    "DL-10",
    "DL-3C",
    "KL-36",
    "KA-09",
    "TN-07",
    "TS-10",
    "RJ-36",
    "HR-35",
    "PB-08",
    "GJ-18",
    "RJ-14",
    "UP-37",
    "GJ-38",
    "HR-03",
    "HR-52",
    "GJ-06",
    "AP-29",
    "TN-59",
    "HR-36",
    "GJ-32",
    "GJ-08",
    "TS-12",
    "WB-26",
    "TN-06",
    "KA-41",
    "UP-65",
    "MP-04",
    "GJ-03",
    "AP-10",
    "HR-13",
    "DL-5C",
    "KA-51",
    "TN-58",
    "DL-2C",
    "MH-15",
    "PB-07",
    "HR-30",
    "KA-13",
    "TN-12",
    "MH-43",
    "GJ-16",
    "TS-09",
    "MH-34",
    "KA-11",
    "MH-40",
    "MH-49",
    "RJ-45",
    "DL-7C",
    "HR-20",
    "TS-05",
    "KA-36",
    "KA-25",
    "PB-02",
    "GJ-17",
    "TN-10",
    "TN-18",
    "WB-12",
    "MH-09",
    "MH-06",
    "TN-37",
    "TS-33",
    "PB-12",
    "TS-15",
    "TS-11",
    "WB-08",
    "KL-29",
    "KA-16",
    "MH-16",
    "RJ-51",
    "TS-19",
    "TN-11",
    "TN-23",
    "TS-29",
    "DL-4C",
    "TN-73",
    "TN-57",
    "WB-06",
    "GJ-13",
    "KA-22",
    "TN-85",
    "DL-6C",
    "AP-28",
    "KA-06",
    "KA-50",
    "GJ-23",
    "TN-05",
    "MH-29",
    "AP-09",
    "PB-13",
    "TN-64",
    "TN-55",
    "HR-12",
    "GJ-04",
    "HR-29",
    "BR-31",
    "MH-50",
    "PB-65",
    "KL-08",
    "HR-76",
    "GJ-36",
    "GJ-15",
    "TN-03",
    "PB-27",
    "MH-31",
    "MH-20",
    "GJ-07",
    "KA-20",
    "TN-01",
    "TN-60",
    "MP-15",
    "KL-63",
    "UP-53",
    "TS-25",
    "HR-72",
    "TN-38",
    "KA-32",
    "HR-34",
    "GJ-21",
    "HR-23",
    "TS-03",
    "KA-26",
    "TS-02",
    "KL-82",
    "TN-15",
    "TS-28",
    "RJ-21",
    "HR-19",
    "GJ-19",
    "HR-24",
    "GJ-26",
    "TS-06",
    "TN-21",
    "UP-27",
    "TN-13",
    "HR-87",
    "HR-14",
    "TS-16",
    "HR-85",
    "GJ-12",
    "WB-50",
    "AP-07",
    "KA-55",
    "KL-53",
    "KL-75",
    "KL-54",
    "UP-72",
    "TN-49",
    "MH-35",
    "DL-13",
    "22-BH",
    "RJ-28",
    "RJ-13",
    "TN-30",
    "PB-39",
    "UP-25",
    "KA-52",
    "TN-68",
    "KL-43",
    "KA-17",
    "HR-77",
    "RJ-18",
    "RJ-05",
    "UP-42",
    "KA-14",
    "BR-06",
    "TN-43",
    "AP-22",
    "KL-40",
    "TN-45",
    "WB-10",
    "TN-20",
    "TN-40",
    "MH-27",
    "TN-04",
    "MH-08",
    "UP-21",
    "MH-10",
    "PB-19",
    "AP-13",
    "TN-69",
    "RJ-47",
    "KA-42",
    "KA-12",
    "MP-19",
    "TN-29",
    "KL-07",
    "TN-74",
    "AP-11",
    "RJ-23",
    "TS-04",
    "MP-41",
    "KL-02",
    "TN-56",
    "PB-09",
    "KA-59",
    "UP-85",
    "MH-18",
    "UP-62",
    "WB-44",
    "TN-33",
    "TN-72",
    "UP-80",
    "KA-43",
    "MP-48",
    "KL-39",
    "GJ-10",
    "MH-44",
    "KA-30",
    "MP-05",
    "TN-31",
    "UP-40",
    "RJ-20",
    "KA-63",
    "RJ-41",
    "PB-23",
    "TN-77",
    "UP-52",
    "UP-15",
    "HR-01",
    "RJ-40",
    "KL-73",
    "GJ-22",
    "MH-36",
    "GJ-14",
    "KA-15",
    "GJ-24",
    "KL-65",
    "KL-67",
    "TN-87",
    "PB-06",
    "HR-82",
    "RJ-10",
    "TS-34",
    "MH-42",
    "TN-86",
    "HR-81",
    "KL-21",
    "GJ-09",
    "KL-38",
    "UP-63",
    "RJ-01",
    "TN-99",
    "KA-07",
    "MH-11",
    "TN-34",
    "KL-48",
    "UP-13",
    "RJ-29",
    "TS-35",
    "HR-27",
    "HR-07",
    "TN-65",
    "GJ-35",
    "TN-75",
    "HR-11",
    "MH-41",
    "KL-46",
    "BR-02",
    "WB-18",
    "TS-27",
    "HR-31",
    "PB-37",
    "RJ-46",
    "TN-79",
    "MP-13",
    "PB-36",
    "MP-43",
    "MP-11",
    "UP-67",
    "WB-16",
    "KL-05",
    "RJ-07",
    "TS-01",
    "TN-42",
    "KA-47",
    "KL-47",
    "UP-33",
    "PB-03",
    "TS-17",
    "AP-39",
    "KA-68",
    "KL-11",
    "KL-66",
    "TN-78",
    "WB-42",
    "KA-34",
    "TN-63",
    "KL-18",
    "KA-64",
    "KL-17",
    "MP-20",
    "TS-36",
    "TS-30",
    "KA-65",
    "MP-37",
    "WB-98",
    "GJ-31",
    "KL-14",
    "TN-25",
    "TN-91",
    "WB-30",
    "WB-66",
    "HR-02",
    "PB-56",
    "MP-16",
    "TN-39",
    "KL-32",
    "HR-70",
    "PB-29",
    "AP-30",
    "WB-32",
    "WB-38",
    "UP-43",
    "PB-11",
    "KA-08",
    "TN-66",
    "GJ-30",
    "KL-33",
    "KA-21",
    "TN-81",
    "AP-01",
    "KA-29",
    "KL-64",
    "KL-04",
    "MH-17",
    "TN-90",
    "MH-24",
    "KL-24",
    "KL-25",
    "UP-41",
    "TS-23",
    "PB-28",
    "KA-35",
    "KL-03",
    "KL-16",
    "HR-06",
    "KL-80",
    "UP-44",
    "HR-50",
    "KA-46",
    "PB-32",
    "KA-27",
    "TN-52",
    "TN-32",
    "TN-50",
    "TS-32",
    "BR-09",
    "HR-80",
    "KL-42",
    "KL-34",
    "UP-70",
    "KL-55",
    "TN-67",
    "KA-28",
    "MH-13",
    "RJ-06",
    "RJ-27",
    "KL-37",
    "KA-18",
    "HR-05",
    "TN-48",
    "KA-40",
    "MP-12",
    "HR-22",
    "UP-83",
    "TN-70",
    "HR-21",
    "KL-72",
    "TS-18",
    "RJ-53",
    "PB-87",
    "MH-32",
    "HR-79",
    "PB-46",
  ],
  Drive: ["Manual", "Automatic"],
  Type: ["HatchBack", "Sedan", "SUV", "Lux_SUV", "Lux_sedan"],
  Owner: [1, 2, 3, 4],
};

export default function App() {
  const [form, setForm] = useState({
    car_name: "",
    year: CURRENT_YEAR - 5,
    distance: "",
    owner: 1,
    fuel: FUEL_TYPES[0],
    location: LOCATIONS[0],
    drive: DRIVE_TYPES[0],
    type: CAR_TYPES[0],
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error for this field when user changes it
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!form.car_name.trim()) errors.car_name = "Car name is required";
    if (!form.year) errors.year = "Year is required";
    else if (form.year < 1990 || form.year > CURRENT_YEAR)
      errors.year = `Year must be between 1990 and ${CURRENT_YEAR}`;
    if (!form.distance) errors.distance = "Distance is required";
    else if (form.distance < 0) errors.distance = "Distance cannot be negative";
    if (form.owner < 1) errors.owner = "Owner count must be at least 1";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setPrediction(null);
    try {
      const params = new URLSearchParams({
        car_name: form.car_name,
        year: form.year,
        distance: form.distance,
        owner: form.owner,
        fuel: form.fuel,
        location: form.location,
        drive: form.drive,
        type: form.type,
      });
      const res = await fetch(`http://localhost:8000/predict?${params}`);
      if (!res.ok) throw new Error("Prediction failed");
      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError(
        "Could not get prediction. Please check your input and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaCarAlt className="text-blue-600 text-2xl" />
            <span className="font-bold text-xl text-blue-700">
              Second Hand Car Price Prediction
            </span>
          </div>
          <div className="space-x-8 hidden md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center"
              >
                {item.name === "Home" && <FaCarAlt className="mr-1" />}
                {item.name === "Contact" && <FaEnvelope className="mr-1" />}
                {item.name === "Market Analysis" && (
                  <FaChartLine className="mr-1" />
                )}
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Home Section */}
        <section
          id="home"
          className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg my-8"
        >
          <div className="flex items-center justify-center mb-6">
            <FaCarAlt className="text-blue-600 text-3xl mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">
              Predict Car Price
            </h2>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm text-blue-700 border border-blue-200">
            <p>
              Fill in the details of the car to get an estimated price based on
              our machine learning model.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Car Name
              </label>
              <input
                name="car_name"
                value={form.car_name}
                onChange={handleChange}
                placeholder="e.g. Maruti Swift, Honda City"
                className={`w-full border ${formErrors.car_name ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              />
              {formErrors.car_name && (
                <p className="mt-1 text-red-500 text-sm">
                  {formErrors.car_name}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Manufacturing Year
                </label>
                <input
                  name="year"
                  type="number"
                  min="1990"
                  max={CURRENT_YEAR}
                  value={form.year}
                  onChange={handleChange}
                  className={`w-full border ${formErrors.year ? "border-red-500" : "border-gray-300"
                    } px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                />
                {formErrors.year && (
                  <p className="mt-1 text-red-500 text-sm">{formErrors.year}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Distance (km)
                </label>
                <input
                  name="distance"
                  type="number"
                  min="0"
                  placeholder="e.g. 25000"
                  value={form.distance}
                  onChange={handleChange}
                  className={`w-full border ${formErrors.distance ? "border-red-500" : "border-gray-300"
                    } px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                />
                {formErrors.distance && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formErrors.distance}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Number of Owners
                </label>
                <input
                  name="owner"
                  type="number"
                  min="1"
                  max="5"
                  value={form.owner}
                  onChange={handleChange}
                  className={`w-full border ${formErrors.owner ? "border-red-500" : "border-gray-300"
                    } px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                />
                {formErrors.owner && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formErrors.owner}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Fuel Type
                </label>
                <select
                  name="fuel"
                  value={form.fuel}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {FUEL_TYPES.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Location
                </label>
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {LOCATIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Transmission
                </label>
                <select
                  name="drive"
                  value={form.drive}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {DRIVE_TYPES.map((drive) => (
                    <option key={drive} value={drive}>
                      {drive}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Car Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {CAR_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold mt-6 disabled:opacity-60 transition-colors duration-200 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Predicting...
                </>
              ) : (
                <>
                  <FaRupeeSign className="mr-2" /> Predict Price
                </>
              )}
            </button>
          </form>

          {prediction !== null && (
            <div className="mt-8 text-center p-6 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Estimated Price
              </h3>
              <div className="text-3xl font-bold text-green-700 flex items-center justify-center">
                <FaRupeeSign className="mr-1" />{" "}
                {prediction.toLocaleString("en-IN")}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Based on similar cars in the market
              </p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center">
              {error}
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-blue-600 text-xl mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Contact</h2>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              Have questions or feedback about our car price prediction service?
              Feel free to reach out!
            </p>
          </div>
          <p className="flex items-center">
            <FaEnvelope className="text-gray-600 mr-2" />
            <span>Email: </span>
            <a
              href="mailto:mahatatapan2000@gmail.com"
              className="text-blue-600 hover:text-blue-800 ml-1 transition-colors duration-200"
            >
              mahatatapan2000@gmail.com
            </a>
          </p>
        </section>

        {/* Market Analysis Section */}
        <section
          id="market"
          className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg mb-16"
        >
          <div className="flex items-center mb-4">
            <FaChartLine className="text-blue-600 text-xl mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Market Analysis
            </h2>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-gray-700 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Market analysis features coming soon. We're working on providing
              valuable insights about the second-hand car market trends.
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} Second Hand Car Price Prediction |
            Developed by Tapan Mahata
          </p>
        </div>
      </footer>
    </div>
  );
}
