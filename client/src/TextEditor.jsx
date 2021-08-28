import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useSelector } from 'react-redux'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { endpoint } from './common'

const TextEditor = (props) => {
  const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(content)))

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }


  const aa = useSelector(state => state.textEditor1Reducer.aa)
  const readFromStore = () => {

    // var aa2 = aa.replace(new RegExp('asdfgh', "g"), ' ')
    var aa2 = aa.replace(new RegExp(String.fromCharCode(2), "g"), '"').replace(new RegExp(String.fromCharCode(3), "g"), ' ').replace(new RegExp(String.fromCharCode(4), "g"), '/').replace(new RegExp(String.fromCharCode(5), "g"), '%')

    const data = (JSON.parse(aa2));
    setEditorState(EditorState.createWithContent(convertFromRaw(data)))

  }
  const savetoCasparcgStore = () => {
    //.replaceAll('"', String.fromCharCode(2)).replaceAll(' ', String.fromCharCode(3)).replaceAll('/', String.fromCharCode(4)).replaceAll('%', String.fromCharCode(5))

    // const data1 = (JSON.stringify(convertToRaw(editorState.getCurrentContent()))).replaceAll('"', '\\"').replaceAll(' ', 'asdfgh')
    const data1 = (JSON.stringify(convertToRaw(editorState.getCurrentContent()))).replaceAll('"', String.fromCharCode(2)).replaceAll(' ', String.fromCharCode(3)).replaceAll('/', String.fromCharCode(4)).replaceAll('%', String.fromCharCode(5))


    endpoint(`call 1-110 store.dispatch({type:'CHANGE_TEXT1',payload:'${data1}'})`)
    setTimeout(() => {
      endpoint(`call 1-110 ReadToCasparcgfromStore()`)
    }, 20);
  }
  window.savetoCasparcgStore = savetoCasparcgStore;
  window.ReadToCasparcgfromStore = readFromStore;

  return (
    <div>
      <Editor
        editorState={editorState}
        // toolbarClassName="toolbarClassName"
        toolbarClassName={props.hidetoolbar}
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />


    </div>
  );
}


export default TextEditor