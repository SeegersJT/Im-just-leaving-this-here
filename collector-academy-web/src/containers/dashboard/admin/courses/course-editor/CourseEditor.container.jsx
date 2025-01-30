import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckSquareOutlined,
  DeleteOutlined,
  ExceptionOutlined,
  FileDoneOutlined,
  FolderAddOutlined,
  FolderOutlined,
  LoadingOutlined,
  SaveOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import CoursesEdit from 'components/dashboard/admin/courses/course-editor/CourseEditor.component';
import * as coursesActions from 'redux/actions/Courses.action';
import { Utils } from 'utils/Utils';
import { validateField } from './CourseEditor.helper';
import { navigateTo } from 'utils/NavigateService';

function CourseEditorContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const deleteCourseModalRef = useRef();

  const { accessToken } = useSelector((state) => state.auth);
  const {
    courses,
    courseModules,
    courseTests,
    courseDifficulties,
    selectedCourse,
    courseUpdateLoading,
    courseInsertLoading,
    courseDeleteLoading
  } = useSelector((state) => state.courses);

  const [defaultCourse, setDefaultCourse] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isValidCourse, setIsValidCourse] = useState(null);
  const [canSave, setCanSave] = useState(false);

  const [courseModulesGroupData, setCourseModulesGroupData] = useState([]);
  const [courseTestsGroupData, setCourseTestsGroupData] = useState([]);

  const [courseDifficultiesMenuItems, setCourseDifficultiesMenuItems] = useState([]);

  useEffect(() => {
    dispatch(coursesActions.resetModuleEditor());
    dispatch(coursesActions.resetTestEditor());
    dispatch(coursesActions.requestAllCourseDifficulties(accessToken));

    if (!Utils.isNull(selectedCourse)) {
      dispatch(coursesActions.requestAllCourseModules(accessToken, selectedCourse));
      dispatch(coursesActions.requestAllCourseTests(accessToken, selectedCourse));
    }
  }, [dispatch, accessToken, selectedCourse]);

  useEffect(() => {
    const handleOnGoToModuleEditor = () => {
      navigateTo('/dashboard/admin/courses/course/module');
    };

    const handleOnSetSelectedModuleNo = (courseModuleNo) => {
      dispatch(coursesActions.setSelectedCourseModule(courseModuleNo));
      handleOnGoToModuleEditor();
    };

    const handleOnGoToTestEditor = () => {
      navigateTo('/dashboard/admin/courses/course/test');
    };

    const handleOnSetSelectedTestNo = (courseTestNo) => {
      dispatch(coursesActions.setSelectedCourseTest(courseTestNo));
      handleOnGoToTestEditor();
    };

    const formatCourseModulesGroupData = [];
    const formatCourseTestsGroupData = [];

    if (selectedCourse) {
      formatCourseModulesGroupData.push({
        title: 'Add Module',
        description: 'Add modules to the course to organize pages.',
        icon: <FolderAddOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        onClick: () => handleOnSetSelectedModuleNo(null)
      });

      formatCourseTestsGroupData.push({
        title: 'Add Test',
        description: 'Add tests to the course.',
        icon: <ExceptionOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        onClick: () => handleOnSetSelectedTestNo(null)
      });
    } else {
      formatCourseModulesGroupData.push({
        title: 'No Course Created',
        description: 'Create a Course Before adding Modules',
        icon: <WarningOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.lighter,
        disabled: true,
        onClick: () => handleOnSetSelectedModuleNo(null)
      });

      formatCourseTestsGroupData.push({
        title: 'No Course Created',
        description: 'Create a Course Before adding Tests',
        icon: <WarningOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.lighter,
        disabled: true,
        onClick: () => handleOnSetSelectedTestNo(null)
      });
    }

    formatCourseModulesGroupData.push(
      ...courseModules.map((courseModule) => ({
        title: courseModule.moduleTitle,
        description: courseModule.moduleDescription,
        icon: <FolderOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.lighter,
        onClick: () => handleOnSetSelectedModuleNo(courseModule.courseModuleNo)
      }))
    );

    formatCourseTestsGroupData.push(
      ...courseTests.map((courseTest) => ({
        title: courseTest?.testTitle,
        description: `Pass Percentage: ${courseTest?.testPassPercentage}%`,
        titleRight: courseDifficulties.find((courseDifficulty) => courseDifficulty.courseDifficultyNo === courseTest?.courseDifficultyNo)
          ?.courseDifficulty,
        descriptionRight: Utils.formatMinutes(courseTest?.testDuration),
        icon: <FileDoneOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.lighter,
        onClick: () => handleOnSetSelectedTestNo(courseTest?.courseTestNo)
      }))
    );

    setCourseModulesGroupData(formatCourseModulesGroupData);
    setCourseTestsGroupData(formatCourseTestsGroupData);
  }, [theme, dispatch, courseModules, courseTests, selectedCourse, courseDifficulties]);

  useEffect(() => {
    setCourseDifficultiesMenuItems(
      courseDifficulties.map((courseDifficulty) => ({
        value: courseDifficulty.courseDifficultyNo,
        label: courseDifficulty.courseDifficulty
      }))
    );
  }, [courseDifficulties]);

  useEffect(() => {
    if (!Utils.isNull(selectedCourse)) {
      const filteredCourse = courses.find((course) => course.courseNo === selectedCourse);

      if (!Utils.isNull(filteredCourse) || !Utils.isUndefined(filteredCourse)) {
        setDefaultCourse(filteredCourse);
        setCurrentCourse(filteredCourse);

        setIsValidCourse({
          courseTitle: 1,
          courseDescription: 1,
          courseDuration: 1,
          courseDifficultyNo: 1
        });
      }
    } else {
      setDefaultCourse(null);
      setCurrentCourse(null);

      setIsValidCourse({
        courseTitle: 0,
        courseDescription: 0,
        courseDuration: 0,
        courseDifficultyNo: 0
      });
    }
  }, [courses, selectedCourse]);

  useEffect(() => {
    setCanSave(Utils.checkIsValidStatus(isValidCourse));
  }, [isValidCourse]);

  const coursesActionListData = () => {
    const courseActionList = [];

    if (!Utils.isNull(selectedCourse)) {
      courseActionList.push({
        title: `Update Course${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Save changes made to Course' : 'Modify the Course to enable this button',
        icon: courseUpdateLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <SaveOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || courseUpdateLoading,
        onClick: handleOnUpdateCourseClick
      });
    } else {
      courseActionList.push({
        title: `Add Course${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Insert changes made to Course' : 'Complete the Course to enable this button',
        icon: courseInsertLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <SaveOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || courseInsertLoading,
        onClick: handleOnInsertCourseClick
      });
    }

    courseActionList.push({
      title: 'Coming Soon - User Allocations',
      description: 'Allocate/DeAllocate Users from current Course ',
      icon: <CheckSquareOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.warning.main,
      backgroundColor: theme.palette.warning.lighter,
      disabled: true,
      onClick: () => {}
    });

    courseActionList.push({
      title: `Delete Course${selectedCourse ? '' : ' - No Course to Delete'}`,
      description: selectedCourse ? 'Delete current Course' : 'No Course to Delete',
      icon: courseDeleteLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <DeleteOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.lighter,
      disabled: !selectedCourse || courseDeleteLoading,
      onClick: handleOnDeleteCourseClick
    });

    return courseActionList;
  };

  const handleOnCurrentCourseChange = (value, type) => {
    const formattedValue = type === 'courseDuration' ? Number(value) : value;

    setCurrentCourse({
      ...currentCourse,
      [type]: formattedValue
    });

    const hasChanged = defaultCourse?.[type] !== formattedValue;

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

    setIsValidCourse({
      ...isValidCourse,
      [type]: isValid
    });
  };

  const handleOnUpdateCourseClick = () => {
    dispatch(coursesActions.requestCourseUpdate(accessToken, currentCourse, currentCourse.courseNo));
  };

  const handleOnInsertCourseClick = () => {
    dispatch(coursesActions.requestCourseInsert(accessToken, currentCourse));
  };

  const handleOnDeleteCourseClick = () => {
    deleteCourseModalRef.current.callPopUpOpen();
  };

  const handleOnDeletCoursePopUpClick = () => {
    dispatch(coursesActions.requestCourseDelete(accessToken, currentCourse?.courseNo));
  };

  return (
    <CoursesEdit
      theme={theme}
      coursesActionListData={coursesActionListData()}
      courseModulesGroupData={courseModulesGroupData}
      courseTestsGroupData={courseTestsGroupData}
      currentCourse={currentCourse}
      isValidCourse={isValidCourse}
      courseDifficultiesMenuItems={courseDifficultiesMenuItems}
      deleteCourseModalRef={deleteCourseModalRef}
      courseDeleteLoading={courseDeleteLoading}
      onCurrentCourseChange={handleOnCurrentCourseChange}
      onDeleteCoursePopUpClick={handleOnDeletCoursePopUpClick}
    />
  );
}

CourseEditorContainer.propTypes = {};

export default CourseEditorContainer;
