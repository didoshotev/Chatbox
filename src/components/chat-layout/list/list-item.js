import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const ListContact = (props) => {


    const handleClick = (e) => {
        
    }


    return (
        <ListItem button key={props.name} onClick={handleClick} selected>
            <ListItemIcon>
                <Avatar alt={props.name} src={props.img} />
            </ListItemIcon>
            <ListItemText primary={props.name}>{props.name}</ListItemText>
            <ListItemText secondary={props.status} align="right"></ListItemText>
        </ListItem>
    )
}

export default ListContact