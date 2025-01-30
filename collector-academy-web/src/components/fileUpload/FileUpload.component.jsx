import { Box, Button, Typography } from '@mui/material';
import Loading from 'components/loading/Loading.component';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { addSystemNotification } from 'redux/actions/System.action';
import { SNACK_ERROR } from 'redux/reducers/System.reducer';
import { Utils } from 'utils/Utils';

function FileUpload({ onFileUpload, loading, height = '120px', buttonLabel = 'Upload' }) {
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const excelFiles = acceptedFiles.filter((file) => file.name.endsWith('.xlsx'));

      if (onFileUpload && !Utils.isEmpty(excelFiles)) {
        onFileUpload(excelFiles[0]);
      } else {
        dispatch(addSystemNotification('Invalid File Uploaded', SNACK_ERROR));
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsx',
    multiple: false
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        height: height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.500',
        borderRadius: 2,
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: isDragActive ? 'primary.light' : 'background.paper',
        '&:hover': { borderColor: 'primary.main' }
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography variant="body1" color="primary">
              Drop the Template file here...
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Upload Users - Drag and drop the Excel User Template file here, or Click to Browse Files.
            </Typography>
          )}
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            {buttonLabel}
          </Button>
        </>
      )}
    </Box>
  );
}

FileUpload.propTypes = {};

export default FileUpload;
