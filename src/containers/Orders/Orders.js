import React,{useEffect} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithError from '../../hoc/WithError/WithError';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = (props)=>{

    useEffect(()=>props.handleFetchOrders(props.token, props.userId),[]);

    let ordersReturn = <Spinner/>;
    
    if(!props.loading){
    ordersReturn = 
    (<div>
        {props.orders.map((order)=>(
            <Order 
            key = {order.id}
            ingredients = {order.ingredients}
            cost = {order.cost}
            />
        ))}
    </div>
    );
    }
    
    return ordersReturn;
}

const mapStateToProps = state =>{
    return{
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.login.token,
        userId: state.login.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        handleFetchOrders: (token,userId)=>dispatch(actions.handleFetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithError(orders, axios));