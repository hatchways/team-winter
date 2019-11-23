import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const CustomizedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('#ff0000'),
    background: "linear-gradient(45deg, #2AA897 10%, #4FBE75 90%)",
    '&:hover': {
      backgroundColor: "#ff0000",
    },
    width: 150,
    height: 50,
    fontSize: 15,
  },
}))(Button);

export default CustomizedButton;