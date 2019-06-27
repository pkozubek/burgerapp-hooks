import React, {useState} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = (props)=>{
    const [showSideDrawer,setSideDrawerVisiblity] = useState(false);
 
    const sideDrawerHandler = ()=>{
        setSideDrawerVisiblity(!showSideDrawer);
    }

    return (
        <React.Fragment>
            <Toolbar 
            click = {sideDrawerHandler}
            isAuth = {props.isAuth}/>
            <SideDrawer 
            isAuth = {props.isAuth}
            show = {showSideDrawer} 
            click = {sideDrawerHandler}/>
            <main className = {classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = state =>{   
    return {
        isAuth: state.login.token != null
    }
}

export default connect(mapStateToProps)(layout);