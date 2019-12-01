import React, { Fragment, useState } from 'react';
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  Button
} from '@material-ui/core'
import MUIRichTextEditor from 'mui-rte';
import { 
  ContentState, 
  EditorState,
  convertToRaw, 
  convertFromHTML
 } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const useStyles = makeStyles( (theme) => ({
  
  button: {
    marginTop: '20px',
    float: 'right'
  }

}))

const editorTheme = createMuiTheme();

Object.assign(editorTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '4px',
        minHeight: '400px'
      },
      editor: {
        padding: '0 20px 20px 20px',
        overflow: 'scroll'
      },
      placeHolder: {
        padding: '0 20px 20px 20px',
        width: '90%'
      }
    }
  }
});

const controls = ["title", "bold", "italic", "underline",
                  "strikethrough", "link", "numberList", 
                  "bulletList", "quote", "code"];

const TextEditor = (props) => {

  const blocksFromHTML = convertFromHTML(props.html);
  const initialContent = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const initialValue = JSON.stringify(convertToRaw(initialContent));

  const classes = useStyles();

  const [state, setState] = useState(EditorState.createWithContent(initialContent));

  const handleChange = (newState) => {
    setState(newState);
  }

  const save = () => {
    const content = state.getCurrentContent();
    const html = stateToHTML(content);
    props.onSave(html);
  }

  return (
    <Fragment>
      <MuiThemeProvider theme={editorTheme}>
        <MUIRichTextEditor value={initialValue}
                          label="Template Body"
                          controls={controls}
                          inlineToolbar={false}
                          onChange={handleChange} />
      </MuiThemeProvider>
      <Button variant="contained" 
              size="large" 
              color="primary" 
              className={classes.button}
              onClick={save} >
        Save
      </Button>
    </Fragment>
  )
}

export default TextEditor;