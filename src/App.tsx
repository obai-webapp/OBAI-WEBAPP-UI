import { FC, Suspense } from 'react';
import MainRoutes from './routes';
import Loading from '@components/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryComponent } from './components/ErrorBoundary';
import TextLoader from './components/Loading/TextLoader';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const App: FC = () => {
    return (
        <ErrorBoundary fallback={<ErrorBoundaryComponent />}>
            <Suspense fallback={<Loading />}>
                <>
                    <MainRoutes />
                    <ToastContainer autoClose={3000} />
                    <TextLoader />
                </>
            </Suspense>
        </ErrorBoundary>
    );
};

export default App;
