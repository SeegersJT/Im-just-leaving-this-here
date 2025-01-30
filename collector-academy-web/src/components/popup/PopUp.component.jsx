import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import Loading from 'components/loading/Loading.component';
import { forwardRef, useImperativeHandle, useState } from 'react';

const style = (width) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: width || 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  'border-radius': '10px',
  boxShadow: 10,
  pt: 2,
  px: 4,
  pb: 3
});

const PopUp = forwardRef(
  ({ width, title, description, backButton, backButtonLabel = 'Back', backButtonColor = 'secondary', loading = false, onClick }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      callPopUpOpen: () => setOpen(true),
      callPopUpClose: () => setOpen(false)
    }));

    const handleClose = () => setOpen(false);

    return (
      <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={style(width)}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Typography variant="h2">{title}</Typography>
              <Typography variant="p">{description}</Typography>

              <Stack direction="row" spacing={2} sx={{ width: '100%', mt: 2 }}>
                {backButton && (
                  <Button
                    sx={{ m: 2, width: '250px' }}
                    disableElevation
                    fullWidth
                    size="large"
                    variant="contained"
                    color={backButtonColor}
                    onClick={handleClose}
                  >
                    {backButtonLabel}
                  </Button>
                )}
                <Button
                  sx={{ m: 2, width: '250px' }}
                  disableElevation
                  fullWidth
                  size="large"
                  variant="contained"
                  color="error"
                  onClick={onClick}
                >
                  Confirm
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    );
  }
);

PopUp.propTypes = {};

export default PopUp;
