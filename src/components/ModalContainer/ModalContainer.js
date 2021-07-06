import React, {Component, Fragment} from 'react';
import classes from './ModalContainer.module.css';

//import of other components
import Backdrop from '../Backdrop/Backdrop';

class ModalContainer extends Component{
    render() {
        return(
            <Fragment>
                <Backdrop isVisible={this.props.isModalVisible} clicked={this.props.toggleModal} />
                <div className={classes.Modal}
                    style={{
                    transform: this.props.isModalVisible ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.isModalVisible ? '1' : '0'
                }} >
                <div className={classes.ModalHeaderContainer}>
                    <div className={classes.HeaderLabel}>
                        {this.props.modalHeader}
                    </div>
                    <div className={classes.HideModal}>
                        <button className={classes.createTaskBtn} type="button" value="Create" onClick={this.props.toggleModal}>X</button>
                    </div>
                </div>
                    <div className={classes.ModalBody}>
                        {this.props.children}
                    </div>
                    <div className={classes.ModalFooter}>{this.props.modalFooter}</div>
                </div>
                
            </Fragment>
        )
    }
}

export default ModalContainer
