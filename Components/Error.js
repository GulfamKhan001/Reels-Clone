import React from 'react'
import { Transition } from 'react-transition-group';
// import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Error({ error }) {
    // const [open, setOpen] = React.useState(false);
    return (
        <div>
            {/* <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
                Open modal
            </Button> */}
            <Transition in={open} timeout={400}>
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
                                        entering: { opacity: 1, backdropFilter: 'blur(3px)' },
                                        entered: { opacity: 1, backdropFilter: 'blur(3px)' },
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
                                color: "red",
                                justifyContent: "center",
                            }}
                        >
                            
                            <Typography
                                id="fade-modal-dialog-title"
                                component="h2"
                                level="inherit"
                                fontSize="1.25em"
                                mb="0.25em"
                            >
                                {error}
                            </Typography>
                            
                        </ModalDialog>
                    </Modal>
                )}
            </Transition></div>
    )
}

export default Error