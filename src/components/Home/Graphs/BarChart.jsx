import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '@constants/chart-customs.scss';
import chartOption from './chartoptions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    return (
        <div className="chart-wrapper">
            <Bar options={chartOption} data={data} />
        </div>
    );
};
export default BarChart;
