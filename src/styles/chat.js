import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const chatSyles = makeStyles(theme => ({
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        marginTop: '63px',
        backgroundColor: '#1a237e',
        color: '#ffff'
    },
    appBarTitle: {
        flexGrow: 1,
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: '63px',
    },
    textField: {
        marginTop: '10px'
    }
}));

export { chatSyles }