import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(1)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels({ _id, name, title, description,
  removeItem}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded? panel : false);
  };

  return (
    <div  className={classes.root}>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
        <ExpansionPanelSummary 
          expandIcon={ <ExpandMoreIcon  /> }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}> {name} </Typography>
          <Typography className={classes.secondaryHeading}> {title} </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
           Description: {description}
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
            <IconButton onClick={() => removeItem(_id)}>
                <DeleteIcon/>
            </IconButton>
           <Link to={{
             pathname: '/notes/update',
             state: {
               id: _id,
               open: true,
               action: 'edit'
             }
           }}>
           <IconButton>
                <EditIcon/>
            </IconButton>
           </Link>

            <Link to={{
             pathname: '/notes/copy',
             state: {
               id: _id,
               open: true,
               action: 'copy'
             }
           }}>
            <IconButton>
                <FileCopyIcon/>
            </IconButton>
            </Link>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}
