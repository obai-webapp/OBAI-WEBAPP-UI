import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '@constants/chart-customs.scss';
import chartOption from './chartoptions';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    return (
        <div className="chart-wrapper">
            <Pie data={data} options={chartOption} />
        </div>
    );
};
export default PieChart;
