import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { ClearOutlined, DeleteOutlined, LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import { Utils } from 'utils/Utils';
import { validateField } from './PageEditor.helper';
import PageEditor from 'components/dashboard/admin/courses/page-editor/PageEditor.component';
import * as coursesActions from 'redux/actions/Courses.action';

function PageEditorContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const deleteCoursePageModalRef = useRef();

  const { accessToken } = useSelector((state) => state.auth);
  const {
    courseModules,
    coursePages,
    selectedCourseModule,
    selectedCoursePage,
    coursePageUpdateLoading,
    coursePageInsertLoading,
    coursePageDeleteLoading
  } = useSelector((state) => state.courses);

  const [defaultCoursePage, setDefaultCoursePage] = useState(null);
  const [currentCoursePage, setCurrentCoursePage] = useState(null);
  const [currentCourseModule, setCurrentCourseModule] = useState(null);
  const [isValidCoursePage, setIsValidCoursePage] = useState(null);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (!Utils.isNull(selectedCoursePage)) {
      const filteredCoursePage = coursePages.find((coursePage) => coursePage?.coursePageNo === selectedCoursePage);

      if (!Utils.isNull(filteredCoursePage) || !Utils.isUndefined(filteredCoursePage)) {
        setDefaultCoursePage(filteredCoursePage);
        setCurrentCoursePage(filteredCoursePage);

        setIsValidCoursePage({
          pageTitle: 1,
          pageDescription: 1,
          pageContent: 1
        });
      }
    } else {
      setDefaultCoursePage([]);
      setCurrentCoursePage([]);

      setIsValidCoursePage({
        pageTitle: 0,
        pageDescription: 0,
        pageContent: 0
      });
    }
  }, [coursePages, selectedCoursePage]);

  useEffect(() => {
    if (!Utils.isNull(selectedCourseModule)) {
      const filteredCourseModule = courseModules.find((courseModule) => courseModule?.courseModuleNo === selectedCourseModule);

      if (!Utils.isNull(filteredCourseModule) || !Utils.isUndefined(filteredCourseModule)) {
        setCurrentCourseModule(filteredCourseModule);
      }
    } else {
      setCurrentCourseModule([]);
    }
  }, [courseModules, selectedCourseModule]);

  useEffect(() => {
    setCanSave(Utils.checkIsValidStatus(isValidCoursePage));
  }, [isValidCoursePage]);

  const pageActionListData = () => {
    const pageActionList = [];

    if (!Utils.isNull(selectedCoursePage)) {
      pageActionList.push({
        title: `Update Page${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Save changes made to page' : 'Modify the page to enable this button',
        icon: coursePageUpdateLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <SaveOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || coursePageUpdateLoading,
        onClick: handleOnUpdatePageClick
      });
    } else {
      pageActionList.push({
        title: `Add Page${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Insert changes made to page' : 'Complete the page to enable this button',
        icon: coursePageInsertLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <SaveOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || coursePageInsertLoading,
        onClick: handleOnInsertPageClick
      });
    }

    pageActionList.push({
      title: `Clear Page Content${currentCoursePage?.pageContent !== '<p><br></p>' ? '' : ' - No Content to Clear'}`,
      description: currentCoursePage?.pageContent !== '<p><br></p>' ? 'Clears all Page Content' : 'No Content to Clear',
      icon: <ClearOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.warning.main,
      backgroundColor: theme.palette.warning.lighter,
      disabled: currentCoursePage?.pageContent === '<p><br></p>',
      onClick: handleOnClearPageContentClick
    });

    pageActionList.push({
      title: `Delete Page${selectedCoursePage ? '' : ' - No Page to Delete'}`,
      description: selectedCoursePage ? 'Delete current Page' : 'No Page to Delete',
      icon: coursePageDeleteLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <DeleteOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.lighter,
      disabled: !selectedCoursePage || coursePageDeleteLoading,
      onClick: handleOnDeletePageClick
    });

    return pageActionList;
  };

  const handleOnCurrentCoursePageChange = (value, type) => {
    const formattedValue = type === 'pageIndex' ? Number(value) : value;

    setCurrentCoursePage({
      ...currentCoursePage,
      [type]: formattedValue
    });

    const hasChanged = defaultCoursePage?.[type] !== formattedValue;

    let isValid = 1;

    if (validateField(type, formattedValue)) {
      if (hasChanged) {
        isValid = 2;
      } else {
        isValid = 1;
      }
    } else {
      isValid = 0;
    }

    setIsValidCoursePage({
      ...isValidCoursePage,
      [type]: isValid
    });
  };

  const handleOnTextEditorChange = (content) => {
    handleOnCurrentCoursePageChange(content, 'pageContent');
  };

  const handleOnClearPageContentClick = () => {
    handleOnCurrentCoursePageChange('<p><br></p>', 'pageContent');
  };

  const handleOnUpdatePageClick = () => {
    dispatch(coursesActions.requestCoursePageUpdate(accessToken, currentCoursePage, currentCoursePage?.coursePageNo));
  };

  const handleOnInsertPageClick = () => {
    dispatch(coursesActions.requestCoursePageInsert(accessToken, currentCoursePage, currentCourseModule?.courseModuleNo));
  };

  const handleOnDeletePageClick = () => {
    deleteCoursePageModalRef.current.callPopUpOpen();
  };

  const handleOnDeleteCoursePagePopUpClick = () => {
    dispatch(coursesActions.requestCoursePageDelete(accessToken, currentCoursePage?.coursePageNo));
  };

  return (
    <PageEditor
      theme={theme}
      currentCourseModule={currentCourseModule}
      currentCoursePage={currentCoursePage}
      isValidCoursePage={isValidCoursePage}
      pageActionListData={pageActionListData()}
      deleteCoursePageModalRef={deleteCoursePageModalRef}
      coursePageDeleteLoading={coursePageDeleteLoading}
      onCurrentCoursePageChange={handleOnCurrentCoursePageChange}
      onTextEditorChange={handleOnTextEditorChange}
      onDeleteCoursePagePopUpClick={handleOnDeleteCoursePagePopUpClick}
    />
  );
}

PageEditorContainer.propTypes = {};

export default PageEditorContainer;
