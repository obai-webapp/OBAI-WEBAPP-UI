import './statcard.scss';

const StatCard = ({ title, value, icon }) => {
    return (
        <div className="stat-card">
            <img src={icon} className="stat-icon" alt="stat-icon" />
            <div className="stat-summary">
                <p className="stat-description">{title}</p>
                <p className="stat-value">{value}</p>
            </div>
        </div>
    );
};
export default StatCard;
