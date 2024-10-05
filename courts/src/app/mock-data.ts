import { format } from 'date-fns';

// Generate data for the last month (30 days)
const currentDate = new Date();
const randomMonthIndex = Math.floor(Math.random() * 12);
const anyMonth = randomMonthIndex === 0 ? 12 : randomMonthIndex;
const lastYear = anyMonth === 12 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
const daysInLastMonth = new Date(lastYear, anyMonth, 0).getDate();

const mockSalesData = [];
for (let i = 1; i <= daysInLastMonth; i++) {
  const date = format(new Date(lastYear, anyMonth - 1, i), 'yyyy-MM-dd');
  const totalSales = Math.floor(Math.random() * 48500) + 1200; // Generate random sales between 1200 and 50000
  const numOrders = Math.floor(Math.random() * 30) + 5; // Generate random number of orders between 5 and 35
  mockSalesData.push({ date, totalSales, numOrders });
}

export const SALES_DATA = mockSalesData;
