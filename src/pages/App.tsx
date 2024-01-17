//import
import React, { useState } from "react";
import "../App.css";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Legend,
	CartesianGrid,
	Bar,
	Tooltip,
	BarChart,
	AreaChart,
	Area,
} from "recharts";
import Papa from "papaparse";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";

//Style
const VisuallyHiddenInput = styled("input")`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	bottom: 0;
	left: 0;
	white-space: nowrap;
	width: 1px;
`;

const ChartCustom = styled("div")``;

const UploadCustom = styled("div")`
	position: relative;
`;

//Use State
const App = () => {
	// home to upload screen
	const [showUploader, setShowUploader] = useState(false);
	//upload Data
	const [parsedData, setParsedData] = useState([]);
	// Table Part
	const [lineVar, setLineVar] = useState<string>("");
	const [axisX, setAxisX] = useState<string>("");
	const [axisY, setAxisY] = useState<string>("");
	const [tableRows, setTableRows] = useState([]);
	const [selectedChartType, setSelectedChartType] = useState("");

	// Home Button
	const handleButtonClick = () => {
		setShowUploader(true);
	};

	//Changer variable de Chart
	const handleVarChanges = (varName: string, value: string) => {
		if (varName === "lineVar") {
			setLineVar(value);
		} else if (varName === "axisX") {
			setAxisX(value);
		} else if (varName === "axisY") {
			setAxisY(value);
		}
	};

	//Changer variable du Chart
	const handleChartTypeChange = (chartType: string) => {
		setSelectedChartType(chartType);
	};

	//Upload file
	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];

		if (file) {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: function (results: any) {
					const rowsArray: any[] = [];
					setParsedData(results?.data);

					results.data.map((d: any) => {
						rowsArray.push(Object.keys(d));
					});

					setParsedData(results.data);
					setTableRows(rowsArray[0]);
				},
			});
		}
	};
	//Appel composant
	return (
		<div
			className={`BoardCostum ${showUploader ? "blackBackground" : ""}`}
			style={
				showUploader
					? {
							background: `linear-gradient(to right,#3c086c, #a1a19f)`,
							fontFamily: "monospace",
					  }
					: {}
			}>
			<div className="App">
				{!showUploader ? (
					<div>
						<div
							style={{
								textAlign: "center",
								color: "#fff",
								position: "relative",
								right: "30rem",
								bottom: "2rem",
								width: "17rem",
								fontFamily: "monospace",
								fontSize: 20,
							}}>
							<h1>DATA VISUALISATION TOOLS</h1>
						</div>
						<button
							onClick={handleButtonClick}
							style={{
								padding: "10px 20px",
								fontSize: "16px",
								background: `linear-gradient(to right,#6d50c6, #efeff1)`,
								color: "white",
								fontFamily: "serif",
								position: "relative",
								right: "30rem",
								bottom: "2rem",
								border: "none",
								borderRadius: "5px",
								cursor: "pointer",
							}}>
							GET STARTED
						</button>
					</div>
				) : (
					<div>
						<UploadCustom>
							{parsedData.length > 0 || (
								<>
									<h1 className="TitleCustom">Please Upload Your Data File To Visualize It</h1>
									<Button
										component="label"
										role={undefined}
										tabIndex={-1}
										variant="outlined"
										color="neutral"
										startDecorator={
											<SvgIcon>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
													/>
												</svg>
											</SvgIcon>
										}>
										Upload Csv File
										<VisuallyHiddenInput type="file" onChange={handleFileUpload} />
									</Button>
								</>
							)}

							{parsedData.length > 0 && (
								<>
									<h2>File Columns</h2>
									<hr />
									<ul>
										{tableRows.map((elt: any, index: number) => {
											return <li key={index}>{elt}</li>;
										})}
									</ul>
									<h2 style={{ textAlign: "center" }}>Select your Axis X and Axis Y that you want to visualize</h2>
									<div
										style={{
											display: "flex",
											justifyContent: " space-between",
										}}>
										<input
											className="InputCustom"
											type="text"
											placeholder="AxisX"
											name="lineVar"
											id="lineVar"
											onChange={(e) => handleVarChanges("lineVar", e.target.value)}
										/>
										<input
											className="InputCustom"
											type="text"
											placeholder="axisY"
											name="axisX"
											id="axisX"
											onChange={(e) => handleVarChanges("axisX", e.target.value)}
										/>
									</div>
								</>
							)}
						</UploadCustom>
						{parsedData.length > 0 && (
							<>
								<div className="RadioCustom">
									<input
										className="RadioClass"
										type="radio"
										id="lineChart"
										name="chartType"
										value="line"
										checked={selectedChartType === "line"}
										onChange={() => handleChartTypeChange("line")}
									/>
									<label htmlFor="lineChart">Line Chart</label>

									<input
										className="RadioClass"
										type="radio"
										id="doublelineChart"
										name="chartType"
										value="doubleline"
										checked={selectedChartType === "doubleline"}
										onChange={() => handleChartTypeChange("doubleline")}
									/>
									<label htmlFor="lineChart">Double Line Chart</label>

									<input
										className="RadioClass"
										type="radio"
										id="barChart"
										name="chartType"
										value="bar"
										checked={selectedChartType === "bar"}
										onChange={() => handleChartTypeChange("bar")}
									/>
									<label htmlFor="barChart">Bar Chart</label>

									<input
										className="RadioClass"
										type="radio"
										id="areaChart"
										name="chartType"
										value="area"
										checked={selectedChartType === "area"}
										onChange={() => handleChartTypeChange("area")}
									/>
									<label htmlFor="barChart">Area Chart</label>
								</div>
								<ChartCustom>
									{selectedChartType === "line" && (
										<LineChart width={800} height={400} data={parsedData}>
											<Legend />
											<Line type="monotone" dataKey={lineVar} stroke="#c3e80c" />
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey={axisX} stroke="#fff" />
											<YAxis stroke="#fff" />
										</LineChart>
									)}

									{selectedChartType === "bar" && (
										<BarChart width={730} height={250} data={parsedData}>
											<XAxis dataKey="name" stroke="#fff" />
											<CartesianGrid strokeDasharray="3 3" />
											<YAxis stroke="#fff" />
											<Tooltip />
											<Legend />
											<Bar dataKey="pv" fill="#8884d8" />
											<Bar dataKey="uv" fill="#82ca9d" />
										</BarChart>
									)}

									{selectedChartType === "area" && (
										<AreaChart
											width={730}
											height={250}
											data={parsedData}
											margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
											<defs>
												<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
													<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
													<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
												</linearGradient>
												<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
													<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
													<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
												</linearGradient>
											</defs>
											<XAxis dataKey="name" stroke="#fff" />
											<CartesianGrid strokeDasharray="3 3" />
											<YAxis stroke="#fff" />
											<Tooltip />
											<Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
											<Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
										</AreaChart>
									)}

									{selectedChartType === "doubleline" && (
										<LineChart
											width={730}
											height={250}
											data={parsedData}
											margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
											<XAxis dataKey="name" stroke="#fff" />
											<CartesianGrid strokeDasharray="3 3" />
											<YAxis stroke="#fff" />
											<Tooltip />
											<Legend />
											<Line type="monotone" dataKey="pv" stroke="#8884d8" />
											<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
										</LineChart>
									)}
								</ChartCustom>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
