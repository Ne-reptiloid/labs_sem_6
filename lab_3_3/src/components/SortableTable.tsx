import { useState } from 'react';

interface TableData {
  [key: string]: string | number;
}

interface SortableTableProps {
  data: TableData[];
}

export const SortableTable = ({ data }: SortableTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending';
  } | null>(null);

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const headers = Object.keys(data[0]);

  const sortedData = [...data];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key: string) => {
    setSortConfig({ key, direction: 'ascending' });
  };

  return (
    <table className="sortable-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th 
              key={header} 
              onClick={() => requestSort(header)}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={`${index}-${header}`}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};