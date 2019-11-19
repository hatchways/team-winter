import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const UserInputContainer = withStyles(() => ({
  root: {
    backgroundColor: "white",
    width: 500,
    height:400,
    borderRadius: 10,
    marginTop: 200,
  }
}))(Container);

export default UserInputContainer;