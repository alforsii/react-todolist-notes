import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'

import Item from './Item'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

export default function ControlledExpansionPanels({ items, setItems }) {
  const classes = useStyles();
  const removeItem = (id) => {
    const updateItems = items.filter(item => item._id !== id)
    setItems(updateItems)
  }
  // const editItem = (id) => {
  //   const updateItems = items.filter(item => item._id !== id)
  //   setItems(updateItems)
  // }
  // const copyItem = (id) => {
  //   const updateItems = items.filter(item => item._id !== id)
  //   setItems(updateItems)
  // }
  return (
    <div className={classes.root}>
      <Typography variant='h5' style={{textAlign: 'center'}} >Make Notes</Typography>
      <Divider/>
      { items.map((item) => 
      (<Item key={item._id} {...item} 
        // editItem={editItem}
        // copyItem={copyItem}
      removeItem={removeItem} /> ))}
    </div>
  );
}
