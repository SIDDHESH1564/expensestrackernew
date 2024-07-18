import { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(null);
  const [categoryExpenses, setCategoryExpenses] = useState(null);
  const [incomeSourcesData, setIncomeSourcesData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const expensesResponse = await fetch('http://localhost:5000/api/expenses'); // Ensure this matches your backend endpoint
      const expensesData = await expensesResponse.json();

      const incomeResponse = await fetch('http://localhost:5000/api/income'); // Ensure this matches your backend endpoint
      const incomeData = await incomeResponse.json();

      generateMonthlyExpensesGraph(expensesData);
      generateCategoryExpensesGraph(expensesData);
      generateIncomeSourcesGraph(incomeData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generateMonthlyExpensesGraph = (expensesData) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
      labels: months,
      datasets: [
        {
          label: 'Expenses',
          data: months.map((_, i) =>
            expensesData.filter(entry => new Date(entry.date).getMonth() === i).reduce((acc, curr) => acc + curr.amount, 0)
          ),
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
    setMonthlyExpenses(data);
  };

  const generateCategoryExpensesGraph = (expensesData) => {
    const categories = ['Tuition and Fees', 'Housing and Utilities', 'Food and Dining', 'Transportation', 'Personal and Leisure', 'Other'];
    const data = {
      labels: categories,
      datasets: [
        {
          label: 'Expenses by Category',
          data: categories.map(category =>
            expensesData.filter(entry => entry.category === category).reduce((acc, curr) => acc + curr.amount, 0)
          ),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    setCategoryExpenses(data);
  };

  const generateIncomeSourcesGraph = (incomeData) => {
    const incomeSources = ['Salary', 'Freelance Work', 'Investment', 'Other'];
    const data = {
      labels: incomeSources,
      datasets: [
        {
          label: 'Income Sources',
          data: incomeSources.map(source =>
            incomeData.filter(entry => entry.income_source === source).reduce((acc, curr) => acc + curr.amount, 0)
          ),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    setIncomeSourcesData(data);
  };

  return (
    <div className="min-h-screen  bg-white-100 p-4">
      <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">Dashboard</h1>
      <div className="parent-container flex justify-center items-center min-h-screen">

      <div className="graph-container bg-white p-4 rounded-lg shadow-md mb-4">
        {monthlyExpenses && (
          <Line data={monthlyExpenses} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Monthly Expenses',
              },
            },
          }} />
        )}
      </div>
      <div className="graph-container bg-white p-4 rounded-lg shadow-md mb-4">
        {categoryExpenses && (
          <Bar data={categoryExpenses} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Expenses by Category',
              },
            },
          }} />
        )}
      </div>
      <div className="graph-container bg-white p-4 rounded-lg shadow-md">
        {incomeSourcesData && (
          <Doughnut data={incomeSourcesData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Income Sources',
              },
            },
          }} />
        )}
      </div>
      </div>
    </div>
  );
}

// Add the CSS directly in the same file
const styles = `
  .graph-container {
    height: 400px;
    width: 50%;
  },
  .parent-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
    
`;



const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
