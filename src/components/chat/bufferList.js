import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import { TextField } from '@material-ui/core';

const BufferList = () => (
  <React.Fragment>
    <List
      dense
      // subheader={<ListSubheader>WeeChat</ListSubheader>}
      style={{ padding: 0 }}>
        
      <ListItem button>
        <ListItemText primary="hackint" />
      </ListItem>

      <ListItem button>
        <ListItemText primary="Maria" />
      </ListItem>

    </List>

  </React.Fragment>
);

export default BufferList;
