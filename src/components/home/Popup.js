import React,{useState,useEffect}from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Controls from "../controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
// import Draggable from "react-draggable";
//import useMediaQuery from '@mui/material/useMediaQuery';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    // top: theme.spacing(5),
    //minHeight: "20%",
    //maxHeight: '100%',
   
  },
  dialogTitle: {
    padding: "0%",
    
  },
  DialogContent:{
  minHeight: "20%",
    maxHeight: '100%',
    display: "flex",
    flexDirection: "column",
  }
}));

export default function Popup(props) {
  const { title,size, children, openPopup, setPopups } = props;
  //var ResponsiveDialog = withResponsiveFullScreen({breakpoint: 'xs'})(Dialog);
  const theme = useTheme();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const classes = useStyles();


  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  // useEffect(() => {
  //   setIsFullScreen(isMobileView);
  // }, [isMobileView]);
  return (
   
      <Dialog
       hideBackdrop
      //  fullScreen={isFullScreen}
        open={openPopup}
        fullWidth
        maxWidth={size?size:"md"}
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1, textAlign: "center" }}>
              {title}
            </Typography>
            <Controls.ActionButton
              color="secondary"
              onClick={() => {
                setPopups(false);
              }}
            >
              <CloseIcon />
            </Controls.ActionButton>
          </div>
        </DialogTitle>
        <DialogContent className={classes.DialogContent}> {children}</DialogContent>
      </Dialog>
      
  );
}
