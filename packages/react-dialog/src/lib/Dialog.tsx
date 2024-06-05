import { useEffect, useRef, useState } from 'react';
import type { FC, ReactNode, CSSProperties } from 'react';

import css from './react-dialog.module.css';
import { useDialog } from './hooks/useDialog';

type DialogProps = {
  targetLabel: string;
  closeBtnLabel?: string;
  flyout?: 'up' | 'down' | 'left' | 'right';
  onClose?: () => void;
  children?: ReactNode;
  isOpen?: boolean;
  style?: CSSProperties;
};

const defaultStyle = {};

export const Dialog: FC<DialogProps> = ({
  targetLabel,
  closeBtnLabel = 'Close',
  children,
  onClose = () => {},
  isOpen = false,
  flyout = undefined,
  style = defaultStyle,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { open, close, styles } = useDialog({
    dialog: dialogRef.current,
    trigger: triggerRef.current,
    style,
    flyout,
    isOpen,
    closeFn: onClose,
  });

  function showDialog() {
    open();
  }

  function hideDialog() {
    close();
  }

  return (
    <div>
      <button
        data-testid="dialog-trigger"
        ref={triggerRef}
        type="button"
        onClick={showDialog}
        className={`btn dialog-open ${flyout ? 'flyout-target' : ''}`}
        tabIndex={0}
      >
        {targetLabel}
      </button>
      <dialog
        data-testid="dialog-body"
        ref={dialogRef}
        className={`${css.dialog}`}
        style={{ ...styles }}
      >
        {children}
        <button
          tabIndex={0}
          className="btn"
          onClick={hideDialog}
          data-testid="dialog-close"
        >
          {closeBtnLabel}
        </button>
      </dialog>
    </div>
  );
};
