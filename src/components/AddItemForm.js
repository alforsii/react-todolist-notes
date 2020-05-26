import React, { useState, useEffect, forwardRef } from 'react';
import uuid from 'react-uuid'


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: '600px',
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  location,
  history,
  setItems,
  items,
}) {

  const classes = useStyles();
  const openForm = location?.state?.open;
  const itemId = location?.state?.id;
  const action = location?.state?.action;
  const [open, setOpen] = useState(openForm);
  const [errMessage, setErrMessage] = useState('');

  const [formInput, setFormInput] = useState({
    _id: uuid(),
    name: '',
    title: '',
    description: '',
  });
  const { name, title, description } = formInput;

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  useEffect(() => {
    setOpen(openForm);
    if(itemId){
      const foundItem = items.filter(item => item._id === itemId)[0]
      if(action === 'edit'){
        setFormInput(foundItem)
      }
      if(action === 'copy'){
        const name = foundItem.name + ' Copy'
        const title = foundItem.title + ' Copy'
        setFormInput({name, title,  _id: uuid()})
      }
    }
  }, [openForm, itemId, action, items]);
  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };

  const handleChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
      if(!name || !title) {
        setErrMessage('Please enter name and title.')
        return
      }
      if(action === 'edit'){
        // updateItems = items.filter(item => item._id !== itemId )
       const updateItems = items.map(item => {
          if(item._id === itemId) {
            item = formInput
          }
          return item
        })
        setItems(updateItems);
      } else {
        setItems([...items, formInput]);
      }
    setFormInput({ name: '', title: '', description: '' });
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Note
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {action === 'edit' ? 'Edit': action === 'copy'? 'Copy': 'Create'}
            </Button>
          </Toolbar>
        </AppBar>
        <form
          // onSubmit={handleSubmit}
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          <div className={classes.formControl}>
          <Typography style={{color: 'red'}}>
              {errMessage && errMessage}
            </Typography>
            <TextField
              className={classes.textField}
              id="name"
              name="name"
              label="Name*"
              placeholder="Placeholder"
              multiline
              variant="outlined"
              value={name}
              onChange={handleChange}
            />
            <TextField
              className={classes.textField}
              id="title"
              name="title"
              label="Title*"
              placeholder="Placeholder"
              multiline
              variant="outlined"
              value={title}
              onChange={handleChange}
            />
            <TextField
              className={classes.textField}
              id="description"
              name="description"
              label="Description"
              multiline
              rows={12}
              value={description}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
}
