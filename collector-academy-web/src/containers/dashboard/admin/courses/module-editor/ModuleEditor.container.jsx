import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { DeleteOutlined, FileAddOutlined, FileDoneOutlined, LoadingOutlined, SaveOutlined, WarningOutlined } from '@ant-design/icons';
import { Utils } from 'utils/Utils';
import { navigateTo } from 'utils/NavigateService';
import { validateField } from './ModuleEditor.helper';
import ModuleEditor from 'components/dashboard/admin/courses/module-editor/ModuleEditor.component';
import * as coursesActions from 'redux/actions/Courses.action';

function ModuleEditorContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const deleteCourseModuleModalRef = useRef();

  const { accessToken } = useSelector((state) => state.auth);
  const {
    courses,
    courseModules,
    coursePages,
    selectedCourse,
    selectedCourseModule,
    courseModuleUpdateLoading,
    courseModuleInsertLoading,
    courseModuleDeleteLoading
  } = useSelector((state) => state.courses);

  const [defaultCourseModule, setDefaultCourseModule] = useState(null);
  const [currentCourseModule, setCurrentCourseModule] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isValidCourseModule, setIsValidCourseModule] = useState(null);
  const [canSave, setCanSave] = useState(false);

  const [coursePagesGroupData, setCoursePagesGroupData] = useState([]);

  useEffect(() => {
    dispatch(coursesActions.resetPageEditor());

    if (!Utils.isNull(selectedCourseModule)) {
      dispatch(coursesActions.requestAllCoursePages(accessToken, selectedCourseModule));
    }
  }, [dispatch, accessToken, selectedCourseModule]);

  useEffect(() => {
    const handleOnGoToPageEditor = () => {
      navigateTo('/dashboard/admin/courses/course/module/page');
    };

    const handleOnSetSelectedPageNo = (coursePageNo) => {
      dispatch(coursesActions.setSelectedCoursePage(coursePageNo));
      handleOnGoToPageEditor();
    };

    const formatCoursePagesGroupData = [];

    if (selectedCourseModule) {
      formatCoursePagesGroupData.push({
        title: 'Add Page',
        description: 'Add pages to the course to add content.',
        icon: <FileAddOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        onClick: () => handleOnSetSelectedPageNo(null)
      });
    } else {
      formatCoursePagesGroupData.push({
        title: 'No Module Created',
        description: 'Create a Module Before adding Pages',
        icon: <WarningOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.lighter,
        disabled: true,
        onClick: () => handleOnSetSelectedPageNo(null)
      });
    }

    formatCoursePagesGroupData.push(
      ...coursePages.map((coursePage) => ({
        title: coursePage.pageTitle,
        description: coursePage.pageDescription,
        icon: <FileDoneOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.lighter,
        onClick: () => handleOnSetSelectedPageNo(coursePage.coursePageNo)
      }))
    );

    setCoursePagesGroupData(formatCoursePagesGroupData);
  }, [dispatch, coursePages, theme, selectedCourseModule]);

  useEffect(() => {
    if (!Utils.isNull(selectedCourseModule)) {
      const filteredCourseModule = courseModules.find((courseModule) => courseModule?.courseModuleNo === selectedCourseModule);

      if (!Utils.isNull(filteredCourseModule) || !Utils.isUndefined(filteredCourseModule)) {
        setDefaultCourseModule(filteredCourseModule);
        setCurrentCourseModule(filteredCourseModule);

        setIsValidCourseModule({
          moduleTitle: 1,
          moduleDescription: 1
        });
      }
    } else {
      setDefaultCourseModule([]);
      setCurrentCourseModule([]);

      setIsValidCourseModule({
        moduleTitle: 0,
        moduleDescription: 0
      });
    }
  }, [courseModules, selectedCourseModule]);

  useEffect(() => {
    if (!Utils.isNull(selectedCourse)) {
      const filteredCourse = courses.find((course) => course?.courseNo === selectedCourse);

      if (!Utils.isNull(filteredCourse) || !Utils.isUndefined(filteredCourse)) {
        setCurrentCourse(filteredCourse);
      }
    } else {
      setCurrentCourse([]);
    }
  }, [courses, selectedCourse]);

  useEffect(() => {
    setCanSave(Utils.checkIsValidStatus(isValidCourseModule));
  }, [isValidCourseModule]);

  const moduleActionListData = () => {
    const moduleActionList = [];

    if (!Utils.isNull(selectedCourseModule)) {
      moduleActionList.push({
        title: `Update Module${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Save changes made to module' : 'Modify the module to enable this button',
        icon: courseModuleUpdateLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <SaveOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || courseModuleUpdateLoading,
        onClick: handleOnUpdateModuleClick
      });
    } else {
      moduleActionList.push({
        title: `Add Module${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Insert changes made to module' : 'Complete the module to enable this button',
        icon: courseModuleInsertLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <SaveOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || courseModuleInsertLoading,
        onClick: handleOnInsertModuleClick
      });
    }

    moduleActionList.push({
      title: `Delete Module${selectedCourseModule ? '' : ' - No Module to Delete'}`,
      description: selectedCourseModule ? 'Delete current Module' : 'No Module to Delete',
      icon: courseModuleDeleteLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <DeleteOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.lighter,
      disabled: !selectedCourseModule || courseModuleDeleteLoading,
      onClick: handleOnDeleteModuleClick
    });

    return moduleActionList;
  };

  const handleOnCurrentCourseModuleChange = (value, type) => {
    const formattedValue = type === 'moduleIndex' ? Number(value) : value;

    setCurrentCourseModule({
      ...currentCourseModule,
      [type]: formattedValue
    });

    const hasChanged = defaultCourseModule?.[type] !== formattedValue;

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

    setIsValidCourseModule({
      ...isValidCourseModule,
      [type]: isValid
    });
  };

  const handleOnUpdateModuleClick = () => {
    dispatch(coursesActions.requestCourseModuleUpdate(accessToken, currentCourseModule, currentCourseModule?.courseModuleNo));
  };

  const handleOnInsertModuleClick = () => {
    dispatch(coursesActions.requestCourseModuleInsert(accessToken, currentCourseModule, currentCourse?.courseNo));
  };

  const handleOnDeleteModuleClick = () => {
    deleteCourseModuleModalRef.current.callPopUpOpen();
  };

  const handleOnDeleteCourseModulePopUpClick = () => {
    dispatch(coursesActions.requestCourseModuleDelete(accessToken, currentCourseModule?.courseModuleNo));
  };

  return (
    <ModuleEditor
      theme={theme}
      currentCourse={currentCourse}
      currentCourseModule={currentCourseModule}
      isValidCourseModule={isValidCourseModule}
      moduleActionListData={moduleActionListData()}
      coursePagesGroupData={coursePagesGroupData}
      deleteCourseModuleModalRef={deleteCourseModuleModalRef}
      courseModuleDeleteLoading={courseModuleDeleteLoading}
      onCurrentCourseModuleChange={handleOnCurrentCourseModuleChange}
      onDeleteCourseModulePopUpClick={handleOnDeleteCourseModulePopUpClick}
    />
  );
}

ModuleEditorContainer.propTypes = {};

export default ModuleEditorContainer;
