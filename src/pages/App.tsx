// File: App.tsx
import React, { useState } from "react";
import "../App.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import Papa from "papaparse";

function App() {
	// State to store parsed data
	const [parsedData, setParsedData] = useState([]);

	//State to store table Column name
	const [tableRows, setTableRows] = useState([]);

	//State to store the values
	const [values, setValues] = useState([]);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];

		if (file) {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: function (results: any) {
					//   const rowsArray:any = [];
					//   const valuesArray:any = [];

					// Iterating data to get column name and their values
					//   results.data.map((d) => {
					//     rowsArray.push(Object.keys(d));
					//     valuesArray.push(Object.values(d));
					//   });

					// Parsed Data Response in array format
					setParsedData(results?.data);

					//   // Filtered Column Names
					//   setTableRows(rowsArray[0]);

					//   // Filtered Values
					//   setValues(valuesArray);
				},
			});
		}
	};

	return (
		<div>
			<div className="App">
				<input type="file" accept=".csv" onChange={handleFileUpload} />
			</div>
			<LineChart width={800} height={400} data={parsedData}>
				<Line type="monotone" dataKey="Age" stroke="#8884d8" />
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="Année" />
				<YAxis />
			</LineChart>
		</div>
	);
}

export default App;
