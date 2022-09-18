import React from 'react'
import { Transition } from 'react-transition-group';
// import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Progress({ progress }) {
    return (
        <div><Transition in={open} timeout={400}>
            {(state) => (
                <Modal
                    keepMounted
                    open={!['exited', 'exiting'].includes(state)}
                    // onClose={() => setOpen(false)}
                    componentsProps={{
                        backdrop: {
                            sx: {
                                opacity: 0,
                                backdropFilter: 'none',
                                transition: `opacity 400ms, backdrop-filter 400ms`,
                                ...{
                                    entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                }[state],
                            },
                        },
                    }}
                    sx={{
                        visibility: state === 'exited' ? 'hidden' : 'visible',
                    }}
                >
                    <ModalDialog
                        aria-labelledby="fade-modal-dialog-title"
                        aria-describedby="fade-modal-dialog-description"
                        sx={{
                            opacity: 0,
                            transition: `opacity 300ms`,
                            ...{
                                entering: { opacity: 1 },
                                entered: { opacity: 1 },
                            }[state],
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress variant="determinate" value={progress} />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="caption" component="div" color="text.secondary">
                                    {`${Math.round(progress)}%`}
                                </Typography>
                            </Box>
                        </div>


                    </ModalDialog>
                </Modal>
            )}
        </Transition></div>
    )
}

export default Progress