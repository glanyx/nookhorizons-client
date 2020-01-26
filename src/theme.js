import { createMuiTheme } from '@material-ui/core/styles';
import { green, brown } from '@material-ui/core/colors'

const theme = createMuiTheme({
    themeName: 'Test Theme',
    palette: {
        primary: green,
        secondary: brown,
    },
    status: {
        danger: 'orange',
    }
})

export default theme;