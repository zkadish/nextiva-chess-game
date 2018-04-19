import React from 'react';
import './cancelConfirmComponent.scss';
import { Button } from '@nextiva/next-ui';

const CancelConfirmComponent = ({ cancel, confirm }) => {
    return (
        <div className="cancel_confirm_component">
            <Button kind='warning' {...cancel} >Cancel</Button>
            <Button kind='success' {...confirm} >Confirm</Button>
        </div>
    )
};
export default CancelConfirmComponent;

