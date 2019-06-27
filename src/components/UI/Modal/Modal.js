import React,{memo} from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal =(props)=> {
        return ( 
            <React.Fragment >
            <Backdrop 
            show = {props.show}
            click = {
                props.click
            }
            /> 
            <div className = {styles.Modal}
            style = {{transform: props.show ? 'translateY(0)' : 'translateY(-100)',
                    opacity: props.show ? '1' : '0'}} >
                {props.children} 
            </div> 
            </React.Fragment>
        );
};

export default memo(modal, 
    (prevProps,nextProps)=>
    (nextProps.show === prevProps.show 
    || nextProps.children === prevProps.children) 
);