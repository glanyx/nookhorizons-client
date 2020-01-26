import React from 'react';
import { Button } from '@material-ui/core'

function StyledButton({
    color,
    variant,
    ...props
}){
    return(
        <Button variant={variant} color={color}>
            {props.children}
        </Button>
    );
}

export default StyledButton;