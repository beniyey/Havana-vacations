import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import logo from "../../../Assets/Images/Havana-logo.png";
import { NavLink } from "react-router-dom";
import "./AdminInsights.css";
Chart.register(CategoryScale);

function AdminInsights(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        vacationsService.getAllVacations()
            .then(res => {
                setVacations(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="AdminInsights">
            <div className="adminInsights-nav">
                <NavLink to="/vacations">
                    <img className="adminInsights-logo" src={logo} alt="Havana Logo" />
                </NavLink>
                <h1 className="adminInsights-nav-text">Admin Insights</h1>
                <NavLink to="/vacations" className="adminInsights-back">Back</NavLink>

            </div>
            <div className="adminChart">
                <Bar data={{
                    labels: [...vacations.map(el => el.destination)],
                    datasets: [
                        {
                            label: 'number of followers',
                            data: [...vacations.map(v => v.followers)],
                            backgroundColor: [
                                '#98B3B1',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ]
                        }
                    ]
                }}
                    height={400}
                    width={600}
                    options={{
                        indexAxis: "y",
                        maintainAspectRatio: false,
                    }} />
            </div>
        </div>
    );
}

export default AdminInsights;
