import React from 'react';
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  Chip
} from '@material-ui/core'
import MUIRichTextEditor from 'mui-rte';
import { 
  ContentState, 
  convertToRaw, 
  convertFromHTML,
  Modifier,
  EditorState
 } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const useStyles = makeStyles( (theme) => ({
  
  chip: {
    textTransform: 'capitalize'
  }

}))

const editorTheme = createMuiTheme();

Object.assign(editorTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '4px',
        minHeight: '500px'
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

  const classes = useStyles();

  const blocksFromHTML = convertFromHTML(props.content);
  const initialContent = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const initialValue = JSON.stringify(convertToRaw(initialContent));

  const insertText = (text, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();
    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      text
    );
    const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    return  EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
  }

  const makeVariableControls = (variables) => {
    return variables.map( v => `${v}-variable` )
  }
  
  const makeVariableCustomControls = (variables) => {
    return variables.map( v => {
      return {
        name: `${v}-variable`,
        icon: <Chip label={v} className={classes.chip} clickable />,
        type: 'callback',
        onClick: (editorState, name, anchor) => {
          return insertText(`[${v}]`, editorState);
        }
      }
    });
  }

  const variableControls = props.templateVariables ? makeVariableControls(props.templateVariables) : null;
  const variableCustomControls = props.templateVariables ? makeVariableCustomControls(props.templateVariables) : null;

  const handleChange = (newState) => {
    props.onChange(stateToHTML(newState.getCurrentContent()));
  }

  return (
    <MuiThemeProvider theme={editorTheme}>
      <MUIRichTextEditor value={initialValue}
                        label="Template Body"
                        controls={[...controls, ...variableControls]}
                        inlineToolbar={false}
                        onChange={handleChange}
                        customControls={variableCustomControls} />
  </MuiThemeProvider>
  )
}

export default TextEditor;