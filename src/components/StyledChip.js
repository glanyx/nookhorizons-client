import React from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles({
    chip: {
        '& .MuiChip-icon': {
            color: props => props.color,
        },
    }
});

function StyledChip({
    color,
    variant,
    label,
    ...props
}) {
    const classes = useStyles({
        color: color,
    });

    return(
        <div className={props.className}>
            <Chip className={classes.chip} icon={<FiberManualRecordIcon />} color='default' variant={variant} label={label} />
        </div>
    );
}

export default StyledChip;