import React, {useState, useEffect} from "react"
import axios from "axios"
import {USERS_ENDPOINT} from "../../utils/APIEndpoints"
import "./Users.css"

function Users() {
    const [users, setUsers] = useState([])
    const [displayUsers, setDisplayUsers] = useState([])
    const [searchText, setSearchText] = useState("")
    const [loading, setloading] = useState(true)

    const _getUsers = async () => {
        const {data} = await axios.get(USERS_ENDPOINT)
        setUsers(data)
        setDisplayUsers(data)
        setloading(false)
    }

    useEffect(() => {
        _getUsers()
    }, [])

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
        if (e.target.value.length < 2) {
            alert("Please enter at least 2 characters")
            setDisplayUsers(users)
            return
        }
        _updateDisplayUsers(e)
    }

    const _updateDisplayUsers = (e) => {
        const dispUsers = []
        for (const user of users) {
            if (
                user.fullName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            )
                dispUsers.push(user)
        }
        setDisplayUsers(dispUsers)
    }

    const handleSearchReset = () => {
        setSearchText("")
        setDisplayUsers(users)
    }

    const loadDisplay = loading ? (
        <h1 style={{display: "grid", placeItems: "center", height: "500px"}}>
            Loading...
        </h1>
    ) : (
        <div className="PageWrapper">
            <h1 className="MainHeading">Users</h1>
            <div className="SubHeading">
                <div className="SearchBoxDiv">
                    <input
                        type="text"
                        className="SearchBox"
                        name="search-text"
                        id="search-text"
                        placeholder="Search by Name"
                        value={searchText}
                        onChange={handleSearchTextChange}
                    />
                    <button
                        className="ResetBtn"
                        id="reset-search"
                        onClick={handleSearchReset}
                    >
                        Reset
                    </button>
                </div>
                <div className="OrdersWrapper">
                    <div style={{width: "100%"}}>
                        <table className="OrderTable">
                            <tbody id="users-table">
                                <tr className="TableRow">
                                    <th>ID</th>
                                    <th>User Avatar</th>
                                    <th>Full Name</th>
                                    <th>DoB</th>
                                    <th>Gender</th>
                                    <th>Current Location</th>
                                </tr>
                                {displayUsers.map(
                                    (
                                        {
                                            id,
                                            profilePic,
                                            fullName,
                                            gender,
                                            dob,
                                            currentCity,
                                            currentCountry,
                                        },
                                        index
                                    ) => (
                                        <tr
                                            className="TableRow"
                                            key={id + "" + index}
                                        >
                                            <td className="SecondaryText">
                                                {id}
                                            </td>
                                            <td className="PrimaryText">
                                                <img
                                                    src={profilePic}
                                                    alt="user-profile-pic"
                                                />
                                            </td>
                                            <td className="SecondaryText">
                                                {fullName}
                                            </td>
                                            <td className="PrimaryText">{`${
                                                dob.split("-")[0]
                                            } ${dob.split("-")[1]}, ${
                                                dob.split("-")[2]
                                            }`}</td>
                                            <td className="SecondaryText">
                                                {gender}
                                            </td>
                                            <td className="SecondaryText">
                                                {currentCity}, {currentCountry}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
    return <main>{loadDisplay}</main>
}

export default Users
