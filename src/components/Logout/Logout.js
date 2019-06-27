import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

const logout=(props)=>{

    useEffect(()=>{
        props.logUserOut()
    },[]);

    return <Redirect to = '/' />
}

const mapDispatchToProps = dispatch =>{
    return {
       logUserOut : ()=>dispatch(actions.logOut())
    };
}

export default connect(null,mapDispatchToProps)(logout);