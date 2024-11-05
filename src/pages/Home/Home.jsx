import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '@components/Card/Card';
import { StatCard, BarChart, PieChart } from '@components/Home';
import { Helmet } from 'react-helmet';
// import stat images
import budgetIcon from '@icons/budget.svg';
import expenseIcon from '@icons/expenses.svg';
import mvpIcon from '@icons/mostvalued.svg';
import userIcon from '@icons/activeusers.svg';

const Home = () => {
    const statCards = [
        {
            id: 1,
            title: 'Total budget',
            value: '7500$',
            icon: budgetIcon
        },
        {
            id: 2,
            title: 'Expenses',
            value: '1500$',
            icon: expenseIcon
        },
        {
            id: 3,
            title: 'Valued products',
            value: '750',
            icon: mvpIcon
        },
        {
            id: 4,
            title: 'active users',
            value: '1.5K',
            icon: userIcon
        }
    ];

    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 2, 23, 12, 13, 100, 10],
                backgroundColor: '#ffc107'
            },
            {
                label: 'Dataset 2',
                data: [1, 2, 23, 12, 13, 100, 10],
                backgroundColor: '#17a2b8'
            }
        ]
    };
    const pieChartData = {
        labels: ['Blue', 'Yellow', 'Green'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 10, 13],
                backgroundColor: ['rgba(23, 162, 184, 1)', 'rgba(255, 193, 7, 1)', 'rgba(215, 215, 215, 1)'],
                borderColor: ['rgba(23, 162, 184, 0.7)', 'rgba(255, 193, 7, 0.7)', 'rgba(215, 215, 215, 0.7)'],
                borderWidth: 1
            }
        ]
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Dashboard | Template</title>
            </Helmet>
            <Row>
                {statCards.map((stat) => (
                    <Col key={stat.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                        <Card cardType="small">
                            <StatCard {...stat} />
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                    <Card header={true} title="Expenses" filters={true} cardType="large">
                        <BarChart data={barChartData} />
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                    <Card header={true} title="Users per country" filters={true} cardType="large">
                        <PieChart data={pieChartData} />
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Home;
