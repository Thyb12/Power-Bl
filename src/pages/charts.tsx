// File: charts.tsx
import React from 'react';
import { Line } from "@ant-design/charts";

interface ChartsProps {
    csvData: any[];
}

interface TransformedData {
    year: string;
    age: number;
}

const Charts: React.FC<ChartsProps> = ({ csvData }) => {
    // Vérifier si csvData a au moins un élément et n'est pas indéfini
    if (!csvData || csvData.length === 0 || csvData[0] === undefined) {
        return <div>No data available</div>;
    }

    // Utiliser la première ligne du CSV pour obtenir les noms de colonnes
    const columns: string[] = Object.keys(csvData[0]);

    console.log('Columns:', columns);

    // Extraire les informations des deux colonnes spécifiques ("Age" et "Année")
    const tableData: TransformedData[] = csvData.map((item: Record<string, string>) => {
        if (!item || !columns || columns.length < 2) {
            console.error('Invalid data or columns:', item, columns);
            return null;
        }

        const ageString = item[columns[0]];
        const yearString = item[columns[1]];

        console.log('Age string:', ageString);
        console.log('Year string:', yearString);

        if (!ageString || !yearString) {
            console.error('Invalid age or year:', ageString, yearString);
            return null;
        }

        return {
            year: yearString,
            age: parseFloat(ageString.replace(/\s/g, '').replace(' ', '').replace(',', '.')),
        };
    }).filter(Boolean);

    console.log('Table data:', tableData);

    const props = {
        data: tableData,
        xField: 'year',
        yField: 'age',
    };
    console.log('CSV:', csvData);
    console.log('Data:', props.data);
    console.log('KEYS:', columns);


    // Render le tableau avec les informations des deux colonnes spécifiques
    return (
        <div>
            <Line {...props} />
        </div>
    );
}

export default Charts;
