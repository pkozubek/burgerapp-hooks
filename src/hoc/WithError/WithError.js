import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withError = (WrappedCopoment,axios)=>{
    return (props)=> {
        const [error,confirmError] = useHttpErrorHandler(axios);
       

        return(
            <React.Fragment>
                <Modal 
                show = {error}
                click = {confirmError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedCopoment {...props}/>
            </React.Fragment>
        );
    }

}

export default withError