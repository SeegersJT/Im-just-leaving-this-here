import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import regex from 'utils/regex/Regex';
import MainCardComponent from 'components/card/MainCard.component';
import { Grid, Stack, Typography } from '@mui/material';

function TextEditor({ content, offline, videoTitle, onContentChange }) {
  const handleOnInternalContentChange = (value) => {
    const updatedContent = value.replace(regex.findYoutubeLink, (match, p1, p2, p3) => {
      const videoId = p2 || p3;

      // ============================================================================================
      // THIS WHOLE FEATURE NEEDS TO BE MOVED TO THE TEST ARE WHERE THE CONTENT ITSELF IS DISPLAYED THEN WE DONT HAVE TO WORRY ABOUT QUILL MESSING THINGS UP...
      if (offline) {
        if (!videoTitle) {
          console.warn('Offline mode requires a valid videoTitle to construct the local video URL.');
          return match;
        }

        const encodedTitle = encodeURIComponent(videoTitle);
        const videoSrc = `/video/${encodedTitle}.mp4`;
        return `<video controls width="600" height="500">
                  <source src="${videoSrc}" type="video/mp4" />
                </video>`;
        // ============================================================================================
      } else {
        return `<iframe width="600" height="500" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      }
    });

    onContentChange(updatedContent);
  };

  return (
    <MainCardComponent sx={{ mt: 2 }}>
      <Grid container lg={12}>
        <Grid item lg={6}>
          <Stack direction="column" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
            <Typography variant="h5">Editor</Typography>
            <ReactQuill
              theme="snow"
              value={content}
              placeholder="Start typing here..."
              onChange={handleOnInternalContentChange}
              style={{
                height: '100%',
                minHeight: '500px',
                width: '100%',
                maxWidth: '700px',
                overflowY: 'auto'
              }}
            />
          </Stack>
        </Grid>
        <Grid item lg={6}>
          <Stack direction="column" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
            <Typography variant="h5">Preview</Typography>
            <div
              style={{
                height: '100%',
                width: '100%',
                maxWidth: '700px',
                overflowY: 'auto',
                padding: '10px',
                boxSizing: 'border-box',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                whiteSpace: 'normal'
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Stack>
        </Grid>
      </Grid>
    </MainCardComponent>
  );
}

TextEditor.propTypes = {
  content: PropTypes.string.isRequired,
  offline: PropTypes.bool,
  videoTitle: PropTypes.string,
  onContentChange: PropTypes.func.isRequired
};

TextEditor.defaultProps = {
  offline: false,
  videoTitle: ''
};

export default TextEditor;
