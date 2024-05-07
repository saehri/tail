import {useCallback, useEffect, useRef, useState} from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {
  $isListItemNode,
  $isListNode,
  insertList,
  removeList,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';

import {Button} from '../../ui/button';
import {
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
  ResetIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';
import {cn} from '@/lib/utils';

const LowPriority = 1;

function Divider() {
  return <div className='divider' />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isListItem, setIsListItem] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        INSERT_UNORDERED_LIST_COMMAND,
        () => {
          insertList(editor, 'bullet');
          return true;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div
      className='flex gap-2 items-center border border-border p-1'
      ref={toolbarRef}
    >
      <div className='flex gap-1 items-center'>
        <Button
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          aria-label='Undo'
          variant='ghost'
          size='icon'
        >
          <ResetIcon />
        </Button>
        <Button
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          aria-label='Redo'
          variant='ghost'
          size='icon'
        >
          <ResetIcon className='scale-x-[-1]' />
        </Button>
      </div>

      <span className='w-[1px] h-7 bg-border' />

      <div className='flex gap-1 items-center'>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
          aria-label='Format Bold'
          variant='ghost'
          size='icon'
          className={cn(isBold && 'bg-secondary/70')}
        >
          <FontBoldIcon />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          }}
          aria-label='Format Italics'
          variant='ghost'
          className={cn(isItalic && 'bg-secondary/70')}
          size='icon'
        >
          <FontItalicIcon />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          }}
          aria-label='Format Underline'
          variant='ghost'
          className={cn(isUnderline && 'bg-secondary/70')}
          size='icon'
        >
          <UnderlineIcon />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
          }}
          aria-label='Format Strikethrough'
          variant='ghost'
          className={cn(isStrikethrough && 'bg-secondary/70')}
          size='icon'
        >
          <StrikethroughIcon />
        </Button>
      </div>

      <span className='w-[1px] h-7 bg-border' />

      <div className='flex gap-1 items-center'>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
          }}
          aria-label='Left Align'
          variant='ghost'
          size='icon'
        >
          <TextAlignLeftIcon />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
          }}
          aria-label='Center Align'
          variant='ghost'
          size='icon'
        >
          <TextAlignCenterIcon />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
          }}
          aria-label='Right Align'
          variant='ghost'
          size='icon'
        >
          <TextAlignRightIcon />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
          }}
          aria-label='Justify Align'
          variant='ghost'
          size='icon'
        >
          <TextAlignJustifyIcon />
        </Button>
      </div>

      <span className='w-[1px] h-7 bg-border' />

      <div className='flex gap-1 items-center'>
        <Button
          onClick={() => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }}
          aria-label='Unordered List'
          variant='ghost'
          size='icon'
        >
          <ListBulletIcon />
        </Button>
      </div>
    </div>
  );
}
