import { useTheme } from '@mui/material/styles';

import TestEditor from 'components/dashboard/admin/courses/test-editor/TestEditor';
import { validateField } from './TestEditor.helper';
import * as coursesActions from 'redux/actions/Courses.action';
import { Utils } from 'utils/Utils';
import { useEffect, useRef, useState } from 'react';
import {
  CheckSquareOutlined,
  DeleteOutlined,
  FileUnknownOutlined,
  LoadingOutlined,
  ReconciliationOutlined,
  SaveOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { navigateTo } from 'utils/NavigateService';

function TestEditorContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const deleteCourseTestModalRef = useRef();

  const { accessToken } = useSelector((state) => state.auth);
  const {
    courses,
    courseTests,
    courseTestQuestions,
    courseDifficulties,
    selectedCourse,
    selectedCourseTest,
    courseTestUpdateLoading,
    courseTestInsertLoading,
    courseTestDeleteLoading
  } = useSelector((state) => state.courses);

  const [defaultCourseTest, setDefaultCourseTest] = useState(null);
  const [currentCourseTest, setCurrentCourseTest] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isValidCourseTest, setIsValidCourseTest] = useState(null);
  const [canSave, setCanSave] = useState(false);

  const [courseTestQuestionsGroupData, setCourseTestQuestionsGroupData] = useState([]);

  const [courseDifficultiesMenuItems, setCourseDifficultiesMenuItems] = useState([]);

  useEffect(() => {
    dispatch(coursesActions.resetQuestionEditor());

    if (!Utils.isNull(selectedCourseTest)) {
      dispatch(coursesActions.requestAllCourseTestQuestions(accessToken, selectedCourseTest));
    }
  }, [dispatch, accessToken, selectedCourseTest]);

  useEffect(() => {
    const handleOnGoToTestQuestionEditor = () => {
      navigateTo('/dashboard/admin/courses/course/test/question');
    };

    const handleOnSetSelectedTestQuestionNo = (courseTestNo) => {
      dispatch(coursesActions.setSelectedCourseTestQuestion(courseTestNo));
      handleOnGoToTestQuestionEditor();
    };

    const formatCourseTestQuestionsGroupData = [];

    if (selectedCourseTest) {
      formatCourseTestQuestionsGroupData.push({
        title: 'Add Question',
        description: 'Add questions to the course test.',
        icon: <ReconciliationOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        onClick: () => handleOnSetSelectedTestQuestionNo(null)
      });
    } else {
      formatCourseTestQuestionsGroupData.push({
        title: 'No Test Created',
        description: 'Create a Test Before adding Questions',
        icon: <WarningOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.lighter,
        disabled: true,
        onClick: () => handleOnSetSelectedTestQuestionNo(null)
      });
    }

    formatCourseTestQuestionsGroupData.push(
      ...courseTestQuestions.map((courseQuestion) => ({
        title: courseQuestion?.questionTitle,
        description: `Order: ${courseQuestion?.questionIndex}`,
        icon: <FileUnknownOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.lighter,
        onClick: () => handleOnSetSelectedTestQuestionNo(courseQuestion?.courseTestQuestionNo)
      }))
    );

    setCourseTestQuestionsGroupData(formatCourseTestQuestionsGroupData);
  }, [theme, dispatch, courseTests, courseTestQuestions, selectedCourseTest]);

  useEffect(() => {
    console.log('here 1');
    setCourseDifficultiesMenuItems(
      courseDifficulties.map((courseDifficulty) => ({
        value: courseDifficulty.courseDifficultyNo,
        label: courseDifficulty.courseDifficulty
      }))
    );
  }, [courseDifficulties]);

  useEffect(() => {
    if (!Utils.isNull(selectedCourseTest)) {
      const filteredCourseTest = courseTests.find((courseTest) => courseTest.courseTestNo === selectedCourseTest);

      if (!Utils.isNull(filteredCourseTest) || !Utils.isUndefined(filteredCourseTest)) {
        setDefaultCourseTest(filteredCourseTest);
        setCurrentCourseTest(filteredCourseTest);

        setIsValidCourseTest({
          testTitle: 1,
          testDuration: 1,
          testPassPercentage: 1,
          courseDifficultyNo: 1,
          retries: 1
        });
      }
    } else {
      setDefaultCourseTest(null);
      setCurrentCourseTest(null);

      setIsValidCourseTest({
        testTitle: 0,
        testDuration: 0,
        testPassPercentage: 0,
        courseDifficultyNo: 0,
        retries: 0
      });
    }
  }, [courseTests, selectedCourseTest]);

  useEffect(() => {
    console.log('here 3');
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
    console.log('here 4');
    setCanSave(Utils.checkIsValidStatus(isValidCourseTest));
  }, [isValidCourseTest]);

  const courseTestActionListData = () => {
    const courseTestActionList = [];

    if (!Utils.isNull(selectedCourseTest)) {
      courseTestActionList.push({
        title: `Update Course Test${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Save changes made to Course Test' : 'Modify the Course Test to enable this button',
        icon: courseTestUpdateLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <SaveOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || courseTestUpdateLoading,
        onClick: handleOnUpdateCourseTestClick
      });
    } else {
      courseTestActionList.push({
        title: `Add Test${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Insert changes made to Course Test' : 'Complete the Course Test to enable this button',
        icon: courseTestInsertLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <SaveOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || courseTestInsertLoading,
        onClick: handleOnInsertCourseTestClick
      });
    }

    courseTestActionList.push({
      title: 'Coming Soon - Assign Test to Users',
      description: 'Assign Test to User',
      icon: <CheckSquareOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.warning.main,
      backgroundColor: theme.palette.warning.lighter,
      disabled: true,
      onClick: () => {}
    });

    courseTestActionList.push({
      title: `Delete Course Test${selectedCourseTest ? '' : ' - No Course Test to Delete'}`,
      description: selectedCourseTest ? 'Delete current Course Test' : 'No Course Test to Delete',
      icon: courseTestDeleteLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <DeleteOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.lighter,
      disabled: !selectedCourseTest || courseTestDeleteLoading,
      onClick: handleOnDeleteCourseTestClick
    });

    return courseTestActionList;
  };

  const handleOnCurrentCourseTestChange = (value, type) => {
    const formattedValue = type === 'testDuration' || type === 'testPassPercentage' || type === 'retries' ? Number(value) : value;

    setCurrentCourseTest({
      ...currentCourseTest,
      [type]: formattedValue
    });

    const hasChanged = defaultCourseTest?.[type] !== formattedValue;

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

    setIsValidCourseTest({
      ...isValidCourseTest,
      [type]: isValid
    });
  };

  const handleOnUpdateCourseTestClick = () => {
    dispatch(coursesActions.requestCourseTestUpdate(accessToken, currentCourseTest, currentCourseTest?.courseTestNo));
  };

  const handleOnInsertCourseTestClick = () => {
    dispatch(coursesActions.requestCourseTestInsert(accessToken, currentCourseTest, currentCourse?.courseNo));
  };

  const handleOnDeleteCourseTestClick = () => {
    deleteCourseTestModalRef.current.callPopUpOpen();
  };

  const handleOnDeleteCourseTestPopUpClick = () => {
    dispatch(coursesActions.requestCourseTestDelete(accessToken, currentCourseTest?.courseTestNo));
  };

  return (
    <TestEditor
      theme={theme}
      courseTestActionListData={courseTestActionListData()}
      currentCourse={currentCourse}
      currentCourseTest={currentCourseTest}
      isValidCourseTest={isValidCourseTest}
      courseDifficultiesMenuItems={courseDifficultiesMenuItems}
      courseTestQuestionsGroupData={courseTestQuestionsGroupData}
      deleteCourseTestModalRef={deleteCourseTestModalRef}
      courseTestDeleteLoading={courseTestDeleteLoading}
      onCurrentCourseTestChange={handleOnCurrentCourseTestChange}
      onDeleteCourseTestPopUpClick={handleOnDeleteCourseTestPopUpClick}
    />
  );
}

TestEditorContainer.propTypes = {};

export default TestEditorContainer;
