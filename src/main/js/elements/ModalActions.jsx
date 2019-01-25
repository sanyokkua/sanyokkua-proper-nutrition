import React      from 'react';
import { Button } from "react-materialize";
import PropTypes  from "prop-types";

const ModalActions = ({onPositiveButtonClick, positiveButtonText, positiveButtonClassName, positiveButtonIsDisabled, cancelButtonText, buttonWaves}) => {
    return <div>
        <Button disabled={ positiveButtonIsDisabled } modal="close" waves={ buttonWaves ? buttonWaves : "light" } className={ positiveButtonClassName ? positiveButtonClassName : "red darken-2" } onClick={ onPositiveButtonClick }>
            { positiveButtonText }
        </Button>
        <Button flat modal="close" waves={ buttonWaves ? buttonWaves : "light" }>
            { cancelButtonText }
        </Button>
    </div>
};

ModalActions.propTypes = {
    onPositiveButtonClick: PropTypes.func.isRequired,
    positiveButtonText: PropTypes.string.isRequired,
    positiveButtonClassName: PropTypes.string,
    positiveButtonIsDisabled: PropTypes.bool.isRequired,
    cancelButtonText: PropTypes.string.isRequired,
    buttonWaves: PropTypes.string

};

export default ModalActions;