import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleModel from "../../../Models/RoleModel";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import VacationUsersModel from "../../../Models/VacationUsers";
import store from "../../../Redux/Store";
import socketService from "../../../Services/SocketServeice";
import vacationsService from "../../../Services/VacationsService";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard.ts";
import VacationCard from "../VacationCard/VacationCard";
import WelcomePage from "../WelcomePage/WelcomePage";
import ReactPaginate from "react-paginate";
import "./VacationList.css";

function VacationList(): JSX.Element {
    const navigate = useNavigate()
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();
    const [following, setFollowing] = useState<VacationUsersModel[]>();
    const [pageCount, setPageCount] = useState<number>(0);

    // pagination for vacations.
    const vacationsPerPage = 6; // number of vacations per page, change to manipulate pagination.
    const pagesVisited = pageCount * vacationsPerPage + 1;
    const pages = Math.ceil((vacations.length - 1) / vacationsPerPage);
    // a new array of vacations to display.
    const displayVacations = vacations.slice(pagesVisited, pagesVisited + vacationsPerPage);
    function changePage(e: any) {
        setPageCount(e.selected);
    }

    useEffect(() => {

        socketService.connect();
        vacationsService.getAllVacations()
            .then((res) => {
                // sort array and set the new array to the state ( by followers ).
                let following = store.getState().VacationsFollowersState.following;
                const sortedVacations = res.sort((a, b) => {
                    if (following.find((v) => v.vacationId === a.id)) {
                        return -1;
                    }
                    if (following.find((v) => v.vacationId === b.id)) {
                        return 1;
                    }
                    return 0;
                });
                setVacations(sortedVacations)
            })
            .catch(err => console.log(err))

        const unsubscribe = store.subscribe(() => {
            const dup = [...store.getState().VacationsState.vacations];
            setVacations(dup);

        })

        return () => {
            unsubscribe();
            socketService.disconnect();
        }

    }, []);

    useEffect(() => {
        setUser(store.getState().authState.user);
        if (store.getState().authState.user == undefined) {
            navigate("/Login");
        };
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user)
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        setFollowing(store.getState().VacationsFollowersState.following);
        const unsubscribe = store.subscribe(() => {
            setFollowing(store.getState().VacationsFollowersState.following)
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div>

            {/* displays a welcome page and a menu */}
            <div>
                <WelcomePage />
            </div>

            {/* displays all of our vacations */}
            <div className="VacationList">


                <div className="vacationsList-all-vacations-user">


                    {user && user.roleId !== RoleModel.Admin && <>
                        <div className="vacationsList-vip-vacation">
                            {vacations.length > 0 && <>
                                <VacationCard key={vacations.length + 1} vacation={vacations[0]} following={following} />
                            </>}
                        </div>

                        <div className="vacationsList-regular-vacations">

                            {displayVacations.map((el) => {
                                return <VacationCard key={el.id} vacation={el} following={following} />;
                            })}
                            <div className="paginationContainer-div">
                                <ReactPaginate
                                    pageCount={pages}
                                    onPageChange={changePage}
                                    previousClassName={"previous-page-button"}
                                    containerClassName={"paginationContainer"}
                                    disabledClassName={"disabled-page-button"}
                                    activeClassName={"active-page-button"}
                                    nextClassName={"previous-page-button"}
                                />
                            </div>
                        </div>

                    </>
                    }

                </div>

                <div className="admin-vacations-area">

                    {user && user.roleId == RoleModel.Admin && <>
                        {/* <NavLink className="admin-vacations-area-add-button" to="/add-vacation">Add a vacation</NavLink> */}
                        <div className="admin-vacations-area-cards">
                            {vacations.map((el) => <AdminVacationCard key={el.id} vacation={el} />)}
                        </div>
                    </>
                    }

                </div>


            </div>

        </div>
    );
}

export default VacationList;
