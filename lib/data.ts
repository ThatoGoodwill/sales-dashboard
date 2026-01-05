export interface SalesData {
  month: string;
  2022: number;
  2023: number;
  2024: number;
}

// Mock sales data based on Kaggle datasets
export const salesData: SalesData[] = [
  { month: "Jan", 2022: 45000, 2023: 52000, 2024: 58000 },
  { month: "Feb", 2022: 42000, 2023: 48000, 2024: 54000 },
  { month: "Mar", 2022: 51000, 2023: 59000, 2024: 62000 },
  { month: "Apr", 2022: 48000, 2023: 55000, 2024: 60000 },
  { month: "May", 2022: 55000, 2023: 62000, 2024: 68000 },
  { month: "Jun", 2022: 60000, 2023: 68000, 2024: 72000 },
  { month: "Jul", 2022: 58000, 2023: 65000, 2024: 70000 },
  { month: "Aug", 2022: 52000, 2023: 59000, 2024: 64000 },
  { month: "Sep", 2022: 49000, 2023: 56000, 2024: 61000 },
  { month: "Oct", 2022: 53000, 2023: 60000, 2024: 66000 },
  { month: "Nov", 2022: 62000, 2023: 71000, 2024: 78000 },
  { month: "Dec", 2022: 75000, 2023: 82000, 2024: 89000 },
];

export const yearlySummary = {
  2022: {
    total: salesData.reduce((sum, month) => sum + month[2022], 0),
    average: salesData.reduce((sum, month) => sum + month[2022], 0) / salesData.length,
    growth: 0,
  },
  2023: {
    total: salesData.reduce((sum, month) => sum + month[2023], 0),
    average: salesData.reduce((sum, month) => sum + month[2023], 0) / salesData.length,
    growth: 12.5,
  },
  2024: {
    total: salesData.reduce((sum, month) => sum + month[2024], 0),
    average: salesData.reduce((sum, month) => sum + month[2024], 0) / salesData.length,
    growth: 18.2,
  },
};

// Function to filter data by threshold
export function filterByThreshold(data: SalesData[], threshold: number): SalesData[] {
  return data.map(month => ({
    month: month.month,
    2022: month[2022] >= threshold ? month[2022] : 0,
    2023: month[2023] >= threshold ? month[2023] : 0,
    2024: month[2024] >= threshold ? month[2024] : 0,
  }));
}