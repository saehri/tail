'use client';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';

// React Lexical Nodes
import {HeadingNode, QuoteNode} from '@lexical/rich-text';
import {ListNode, ListItemNode} from '@lexical/list';
import {LinkNode} from '@lexical/link';
import {CodeNode} from '@lexical/code';
// -----------------------
import {TRANSFORMERS} from '@lexical/markdown';
import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';

import TextEditorTheme from './text-editor-theme';
import ToolbarPlugin from './plugins/toolbar-plugin';

function Placeholder() {
  return <div></div>;
}

const EDITOR_NODES = [
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
];

const editorConfig = {
  namespace: 'Text Editor',
  nodes: EDITOR_NODES,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: TextEditorTheme,
};

export default function BasicTextEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div>
        <ToolbarPlugin />
        <div>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
