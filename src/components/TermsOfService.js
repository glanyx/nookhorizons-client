import React from 'react';
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    outerWrapper: {
        backgroundImage: `url(${process.env.PUBLIC_URL + `/tos.png`})`,
        backgroundSize: 'cover',
        width: '685px',
        height: '525px',
        padding: theme.spacing(8)
    },
    textWrapper: {
        overflowY: 'scroll',
        width: '675px',
        height: '400px',
        color: theme.palette.common.black,
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(140,70,40,.4)',
            borderRadius: 20,
            outline: '1px solid slategrey'
        }
    },
    typography: {
        marginBottom: theme.spacing(2)
    },
}));

function Tos() {

    const classes = useStyles();

    return (
        <div className={classes.outerWrapper}>
            <div className={classes.textWrapper}>
                <Typography variant='body1' className={classes.typography}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac risus ipsum. Fusce pulvinar quam sed tellus euismod, vitae vehicula velit accumsan. Praesent aliquam lacus eu risus ultrices, eget tincidunt neque tincidunt. Maecenas vel blandit lorem, eget congue libero. Aenean dapibus feugiat mi. Pellentesque finibus ut odio et dapibus. Proin iaculis nulla quis velit vehicula malesuada. Aenean porttitor elit id arcu efficitur, id aliquet nisi convallis. Sed non semper felis. Etiam sodales libero scelerisque, pulvinar libero fermentum, eleifend mauris. Phasellus id neque dictum, lacinia nisl vitae, semper augue.
                </Typography>
                <Typography variant='body1' className={classes.typography}>
                    Maecenas mollis accumsan nisl, elementum pulvinar urna eleifend nec. Sed in felis nisl. Vivamus id nunc in leo mattis elementum. Maecenas id mauris posuere, finibus erat sit amet, commodo dolor. Mauris laoreet leo elementum sapien auctor, ullamcorper aliquet dui commodo. Donec libero est, fringilla non aliquam nec, faucibus sed orci. Suspendisse euismod quis diam non porta. Mauris sagittis aliquam ipsum, vitae molestie ex pretium at. Mauris arcu arcu, molestie eget tellus at, rhoncus malesuada magna.
                </Typography>
                <Typography variant='body1' className={classes.typography}>
                    Maecenas sit amet est consectetur, pellentesque nulla in, feugiat magna. Maecenas ac gravida nisl. Aenean sed ante bibendum, sagittis dolor nec, volutpat turpis. Nulla eu felis vitae lacus congue cursus. Sed accumsan mauris vitae elit vehicula aliquam. Sed porta eget quam ac gravida. Cras ornare tellus sed dui sodales, ut finibus est vulputate.
                </Typography>
                <Typography variant='body1' className={classes.typography}>
                    Aenean non velit quis felis dictum accumsan vitae eu enim. Quisque tincidunt diam nulla, at tempor metus scelerisque nec. Fusce suscipit a libero id posuere. Integer mollis feugiat lorem pellentesque congue. Cras eget odio iaculis, venenatis ligula ac, elementum lorem. Ut scelerisque sodales pulvinar. Aenean vitae fermentum massa. Vestibulum neque ligula, egestas id condimentum id, iaculis sit amet neque. Phasellus ac lorem eget justo tempor imperdiet. Proin sed leo rutrum, egestas tellus sit amet, dignissim ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi quis accumsan metus. Proin pellentesque ac neque fermentum gravida. Pellentesque non laoreet sem. Proin hendrerit condimentum felis, in hendrerit nibh pretium id.
                </Typography>
                <Typography variant='body1'>
                    Mauris vel pretium risus. Proin venenatis tortor quis dolor mattis, at scelerisque nulla aliquet. Proin efficitur sem quis commodo ultricies. Nulla in mollis nisl. Duis commodo, enim in tempor ultrices, ipsum augue tincidunt massa, ac fermentum neque turpis a ligula. Phasellus dignissim cursus semper. Aliquam nunc metus, rhoncus at vestibulum eu, gravida consequat sem. Nam id orci non purus auctor fermentum ut in est. Donec eleifend aliquet eleifend. Mauris tempor consectetur est, vel commodo nisl sodales vitae.
                </Typography>
            </div>
        </div>
    )
}

export default Tos;