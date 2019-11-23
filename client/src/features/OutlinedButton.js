import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const OutlinedButton = withStyles(() => ({
  root: {
    border: "solid #4FBE75 thin",
    backgroundColor: "white",
    padding: "7px 18px 7px 18px"
  },
}))(Button);

export default OutlinedButton;