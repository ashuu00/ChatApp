import React from 'react'
import { ListItem, ListItemIcon, Typography,ListItemText} from '@material-ui/core';

const Lists = ({idx, msg }) => {
    return (
      <ListItem key={idx} disableGutters style={{backgroundColor:'orange',margin:'5px 0 0 0',padding:'0 10px'}}>
          <ListItemText
       primary={ <Typography variant="subtitle2" color="initial" style={{color:'blue',margin:'-10px 0'}}><br/>
            Ashutosh 19:42
        </Typography>}
        secondary={
        <Typography variant="h6">
        {msg}
        </Typography>}
        />
      </ListItem>
    )
}

export default Lists;
