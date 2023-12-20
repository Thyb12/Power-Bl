// File: charts.tsx
import React from 'react';

interface ChartsProps {
    originalData: any[];
    csvData: any[];
}

interface TableData {
    age: string;
    année: string;
}

const Charts: React.FC<ChartsProps> = ({ csvData }) => {
    // Vérifier si csvData a au moins un élément et n'est pas indéfini
    if (!csvData || csvData.length === 0 || csvData[0] === undefined) {
        return <div>No data available</div>;
    }

    // Utiliser la première ligne du CSV pour obtenir les noms de colonnes
    const columns: string[] = Object.keys(csvData[0]);

    // Extraire les informations des deux colonnes spécifiques ("Age" et "Année")
    const tableData: TableData[] = csvData.map((item: Record<string, string>) => ({
        age: item[columns[0]],
        année: item[columns[1]],
    }));

    // Render le tableau avec les informations des deux colonnes spécifiques
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Age</th>
                    <th>Année</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((data: TableData, index: number) => (
                    <tr key={index}>
                        <td>{data.age}</td>
                        <td>{data.année}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Charts;
