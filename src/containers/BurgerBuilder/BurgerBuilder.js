import React, {useState, useEffect} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithError from '../../hoc/WithError/WithError';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'; 

const burgerBuilder = (props)=>{

    //const [orderBlocked, setOrderBlocked] = useState(true);
    const [wasOrdered, setWasOrdered] = useState(false);

    /*
    state = {
        orderBlocked: true,
        wasOrdered: false,
        loading: false
    };*/
  
    useEffect(()=>props.ingredientInit(),[]);

    const possibleOrderHandler = (ingredients)=>{
        let sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum + el;
        },0)
        
        let orderBlocked = sum <=0;
        return orderBlocked;
    }

    const wasOrderedHandler = ()=>{
        
        if(props.isAuth)
            setWasOrdered(true);
        else{
            props.changeURL('/checkout');
            props.history.push('/login');
        }
    };
    
    const cancelOrderHandler = () => {
        setWasOrdered(!wasOrdered);
    };

    const checkoutHandler = () =>{
        props.orderInit();
        props.history.push('/checkout'); 
    };

    const handleLoading = () =>{
        
        return <OrderSummary 
        checkoutClick = {checkoutHandler} 
        cost = {props.cost} 
        cancelClick = {cancelOrderHandler} 
        ingredients = {props.ingr}
        />
    }

        let disabledInfo = {
            ...props.ingr
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let currentModal = handleLoading(); 

        let burger = null;
        if(props.ingr){
            burger = (
            <React.Fragment>
                <Burger ingredients = {props.ingr}/>
                <BuildControls 
                    removeHandler = {props.onIgredientDelete} 
                    addHandler = {props.onIgredientAdd}
                    disabledInfo = {disabledInfo}
                    cost = {props.cost}
                    orderBlocked = {possibleOrderHandler(props.ingr)}
                    wasOrdererClick = {wasOrderedHandler}/>
            </React.Fragment>
            );
        }else{
            burger = <Spinner/>
        }

        if(props.error){
            burger = (
                <div>Burger can't be loaded!</div>
            )
        }

        return(
        <React.Fragment>
            <Modal show = {wasOrdered} click = {cancelOrderHandler}>
                {currentModal}
            </Modal>
            {burger}
        </React.Fragment>
        );
}


const mapStateToProps = (state)=>{
    return{
        ingr: state.burgerBuilder.ingredients,
        cost: state.burgerBuilder.cost,
        error: state.burgerBuilder.error,
        isAuth : state.login.token !== null,
        isBuilded: state.burgerBuilder.isBuilded
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onIgredientAdd: (name)=>dispatch(actions.addIngredient(name)),
        onIgredientDelete: (name)=>dispatch(actions.removeIngredient(name)),
        ingredientInit: ()=>dispatch(actions.initIngredients()),
        orderInit: ()=>dispatch(actions.bugerOrderInit()),
        changeURL: (url)=>dispatch(actions.changeRedirect(url))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithError(burgerBuilder,axios));