import SimpleScrollBar from 'components/simpleScrollBar/SimpleScrollBar.component';
import Navigation from './navigation/Navigation.component';
import PropTypes from 'prop-types';

function DrawerContent({ navigationGroups }) {
  return (
    <SimpleScrollBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
      <Navigation navigationGroups={navigationGroups} />
    </SimpleScrollBar>
  );
}

DrawerContent.propTypes = {
  navigationGroups: PropTypes.array
};

export default DrawerContent;
