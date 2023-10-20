import React, { useEffect } from 'react';

import Dialog from '@mui/material/Dialog';

import IconButton from '@mui/material/IconButton';

import Fade from '@mui/material/Fade';

import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';

import { RemoveScroll } from 'react-remove-scroll';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <RemoveScroll enabled={isOpen}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        fullScreen
        TransitionComponent={Fade}
        transitionDuration={200}
        PaperProps={{
          sx: {
            bgcolor: '#E9BD36',
            width: '100%',
            height: 'calc(var(--vh, 1vh) * 100)',
            maxHeight: '100%',
            maxWidth: '100%',
            overflow: 'auto',
            position: 'fixed',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            zIndex: '1300',
          },
        }}
      >
        <Box
          sx={{
            bgcolor: '#E9BD36',
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100%',
            position: 'relative',
          }}
        >
          <IconButton
            aria-label='close'
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: '16px',
              top: '16px',
              width: '34px',
              height: '34px',
              color: 'white',
            }}
          >
            <CloseIcon
              sx={{
                width: '34px',
                height: '34px',
              }}
            />
          </IconButton>
          {children}
        </Box>
      </Dialog>
    </RemoveScroll>
  );
};

export default Modal;
