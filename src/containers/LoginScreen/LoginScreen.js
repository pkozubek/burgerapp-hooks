import React, {useState,useEffect,Fragment} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Styles from './LoginScreen.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../shared/shared';

const loginScreen = (props)=> {
    
    const [inputs,setInputs] = useState({email: {
        elementType: 'input',
        elementConfig:{
            type : 'text',
            placeholder : 'Email',
            name : 'email '
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        moded: false
        },
        password: {
            elementType: 'input',
            elementConfig:{
                type : 'password',
                placeholder : 'Password',
                name : 'password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            moded: false
            }});

    const [register,setRegister] = useState(true);

    useEffect(
        ()=>{if( !props.isBuilded && props.redirectUrl !== '/'){
            props.redirectUrl()
        }},[]);

    const changeValHandler = (event, controlName) => {

        const updatedInputs = {
            ...inputs,
            [controlName]: {
                ...inputs[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value , inputs[controlName].validation),
                moded: true
            }
        }

        setInputs(updatedInputs);
    }

    const handleLoginClick = (event)=>{
        event.preventDefault();
        props.loginHandle(inputs.email.value,inputs.password.value,register);
    }

    const changeMethod = () =>{
        setRegister(!register);
    }

        let formArray = [];

        for (let keyVal in inputs){
            formArray.push(
                {
                    id: keyVal,
                    config: inputs[keyVal]
                }
            )
        }

        let form = formArray.map(
            (formElement) => {
                return (
                    <Input 
                        key = {formElement.id}
                        elementType = {formElement.config.elementType} 
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value} 
                        isValid = {formElement.config.valid}
                        shouldValid = {formElement.config.validation}
                        moded = {formElement.config.moded}
                        change = {(event) =>changeValHandler(event, formElement.id)}
                        />);
            }
        )
        
        let loginType = register ? 'login' :  'register';
        
        let formOutput = null;

        if(props.loading){
            formOutput = <Spinner/>
        }else{
            formOutput = (<Fragment>
                <h2>{register ? 'Register new user' : 'Login'}</h2>
                <form >
                    {form}
                    <Button 
                    buttonType = 'Success'
                    click = {handleLoginClick}>
                    Confirm
                    </Button>
                </form>
                <Button
                 buttonType = 'Danger'
                 click = {changeMethod}>
                 Switch to: {loginType}
                </Button>
            </Fragment>);
        }

        let errorOutput = null;
        if(props.error){
            errorOutput = <p>{props.error}</p>
        }

        let authRedirect = null
        if(props.isAuth)
            authRedirect = <Redirect to = {props.urlRedirect}/>

        return (<div className = {Styles.LoginScreen}>
           {authRedirect}
           {errorOutput}
           {formOutput}
           </div>);
};

const mapStateToProps = state => {
    return {
        loading: state.login.load,
        error: state.login.error,
        isAuth: state.login.token !== null,
        urlRedirect: state.login.urlRedirect,
        isBuilded: state.burgerBuilder.isBuilded
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        loginHandle : (email,password,isRegister)=>dispatch(actions.loginHandle(email,password, isRegister)),
        redirectUrl : ()=>dispatch(actions.changeRedirect('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(loginScreen);