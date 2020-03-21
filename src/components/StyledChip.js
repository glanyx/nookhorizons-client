import React from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    chip: {
        backgroundColor: theme.palette.common.white,
        '& .MuiChip-icon': {
            color: props => props.color,
        },
    }
}));

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
        <div {...props}>
            <Chip className={classes.chip} icon={<FiberManualRecordIcon />} color='default' variant={variant} label={label} />
        </div>
    );
}

export default StyledChip;