import React, {useEffect, Suspense} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
//import LoginScreen from './containers/LoginScreen/LoginScreen';
import Logout from './components/Logout/Logout';
import * as actions from './store/actions/index';
import {connect} from 'react-redux';

const asyncCheckout = React.lazy(()=>{
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = React.lazy(()=>{
  return import('./containers/Orders/Orders');
})

const asyncLogin = React.lazy(()=>{
  return import('./containers/LoginScreen/LoginScreen');
})

const app = (props)=>{

  useEffect(
    ()=>props.checkLoginStatus(),[]);

    let routes = (
      <Switch>
        <Route path = '/' exact component = {BurgerBuilder}/>
        <Route path = '/login' component = {asyncLogin}/>
        <Redirect to = '/' />
      </Switch>
    );

    if(props.isAuth){
      routes = (
        <Switch>
          <Route path = '/login' component = {asyncLogin}/>
          <Route path = '/checkout' component = {asyncCheckout}/>  
          <Route path = '/orders' component = {asyncOrders}/>  
          <Route path = '/logout' component = {Logout}/>
          <Route path = '/' exact component = {BurgerBuilder}/>
          <Redirect to = '/' />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          <Suspense fallback = {<p>Loading</p>}>
          {routes}
          </Suspense>
        </Layout>
      </div>
    );

}

const mapStateToProps = state =>{
  return{
    isAuth: state.login.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLoginStatus : () => dispatch(actions.checkLoginStatus())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(app));
