import './errorBoundary.scss';

export function ErrorBoundaryComponent() {
    return (
        <div className="error_boundary">
            <img src="/warning.png" alt="stat-icon" />
            <p>Oops! something went wrong</p>
        </div>
    );
}
