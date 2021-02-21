import React, {useState, useEffect} from "react"
import {ORDERS_ENDPOINT} from "../utils/APIEndpoints"
import axios from "axios"

function Order(props) {
    const orderId = props.match.params.orderId
    const [loading, setloading] = useState(true)

    const [order, setOrder] = useState({
        id: "",
        customerName: "",
        orderDate: "",
        orderTime: "",
        amount: "",
        orderStatus: "",
    })

    const _getOrderDetails = async () => {
        const {data} = await axios.get(`${ORDERS_ENDPOINT}/${orderId}`)
        setOrder(data)
        console.log(data)
        setloading(false)
    }
    useEffect(() => {
        _getOrderDetails()
    }, [])

    const loadDisplay = loading ? (
        <h1 style={{display: "grid", placeItems: "center", height: "500px"}}>
            Loading...
        </h1>
    ) : (
        <div>
            <h1 className="MainHeading">Order Details</h1>
            <table className="OrderTable">
                <tbody id="orders-table">
                    <tr className="TableRow">
                        <th>Detail</th>
                        <th>Value</th>
                    </tr>
                    <tr className="TableRow">
                        <td className="SecondaryText">Order ID</td>
                        <td className="PrimaryText">{order.id}</td>
                    </tr>

                    <tr className="TableRow">
                        <td className="SecondaryText">Customer Name</td>
                        <td className="PrimaryText">{order.customerName}</td>
                    </tr>

                    <tr className="TableRow">
                        <td className="SecondaryText">Order Date & Time</td>
                        <td className="PrimaryText">
                            {order.orderDate}
                            <br />
                            <span className="SecondaryText">
                                {order.orderTime}
                            </span>
                        </td>
                    </tr>

                    <tr className="TableRow">
                        <td className="SecondaryText">Amount</td>
                        <td className="PrimaryText">${order.amount}</td>
                    </tr>

                    <tr className="TableRow">
                        <td className="SecondaryText">Status</td>
                        <td className="PrimaryText">{order.orderStatus}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
    return <div style={{width: "50%", marginLeft: "20vw"}}>{loadDisplay}</div>
}

export default Order
