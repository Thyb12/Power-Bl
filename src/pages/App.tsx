// File: App.tsx
import React, { useState } from 'react';
import '../App.css';
import Charts from "./charts";

function App() {
    const [csvData, setCsvData] = useState<any[]>([]);
    const [originalData, setOriginalData] = useState<any[]>([
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        // ... autres entrées originalData
    ]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            // Lire le contenu du fichier
            file.text().then((text: string) => {
                // Parser les données CSV
                const rows = text.split('\n');
                const headers = rows[0].split('\t'); // Utilisez le séparateur approprié

                const parsedData = rows.slice(1).map((row: string) => {
                    const columns = row.split('\t'); // Utilisez le séparateur approprié

                    // Créer un objet avec des clés dynamiques basées sur les en-têtes
                    const rowData: { [key: string]: string } = {};
                    headers.forEach((header, index) => {
                        rowData[header] = columns[index];
                    });

                    return rowData;
                });

                // Mettre à jour l'état avec les données CSV
                setCsvData(parsedData);
            });
        }
    };

    return (
        <div>
            <div className="App">
                <Charts originalData={originalData} csvData={csvData} />
                {/* Entrée de téléchargement de fichier */}
                <input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>
        </div>
    );
}

export default App;
