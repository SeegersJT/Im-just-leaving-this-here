import { useTheme } from '@mui/material/styles';

import * as coursesActions from 'redux/actions/Courses.action';
import { Utils } from 'utils/Utils';
import { useEffect, useRef, useState } from 'react';
import {
  DeleteOutlined,
  FileUnknownOutlined,
  LoadingOutlined,
  ReconciliationOutlined,
  SaveOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { navigateTo } from 'utils/NavigateService';
import QuestionEditor from 'components/dashboard/admin/courses/question-editor/QuestionEditor.component';
import { validateField } from './QuestionEditor.helper';

function QuestionEditorContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const deleteCourseTestQuestionModalRef = useRef();

  const { accessToken } = useSelector((state) => state.auth);
  const {
    courseTests,
    courseTestQuestions,
    courseTestAnswers,
    selectedCourseTest,
    selectedCourseTestQuestion,
    courseTestQuestionUpdateLoading,
    courseTestQuestionInsertLoading,
    courseTestQuestionDeleteLoading
  } = useSelector((state) => state.courses);

  const [defaultCourseTestQuestion, setDefaultCourseTestQuestion] = useState(null);
  const [currentCourseTestQuestion, setCurrentCourseTestQuestion] = useState(null);
  const [currentCourseTest, setCurrentCourseTest] = useState(null);
  const [isValidCourseTestQuestion, setIsValidCourseTestQuestion] = useState(null);
  const [canSave, setCanSave] = useState(false);

  const [courseTestAnswersGroupData, setCourseTestAnswersGroupData] = useState([]);

  useEffect(() => {
    dispatch(coursesActions.resetAnswerEditor());

    if (!Utils.isNull(selectedCourseTestQuestion)) {
      dispatch(coursesActions.requestAllCourseTestAnswers(accessToken, selectedCourseTestQuestion));
    }
  }, [dispatch, accessToken, selectedCourseTestQuestion]);

  useEffect(() => {
    const handleOnGoToTestAnswerEditor = () => {
      navigateTo('/dashboard/admin/courses/course/test/question/answer');
    };

    const handleOnSetSelectedTestAnswerNo = (courseTestAnswerNo) => {
      dispatch(coursesActions.setSelectedCourseTestAnswer(courseTestAnswerNo));
      handleOnGoToTestAnswerEditor();
    };

    const formatCourseTestAnswersGroupData = [];

    if (selectedCourseTestQuestion) {
      formatCourseTestAnswersGroupData.push({
        title: 'Add Answer',
        description: 'Add answers to the course question.',
        icon: <ReconciliationOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        onClick: () => handleOnSetSelectedTestAnswerNo(null)
      });
    } else {
      formatCourseTestAnswersGroupData.push({
        title: 'No Test Created',
        description: 'Create a Test Before adding Questions',
        icon: <WarningOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.lighter,
        disabled: true,
        onClick: () => handleOnSetSelectedTestAnswerNo(null)
      });
    }

    formatCourseTestAnswersGroupData.push(
      ...courseTestAnswers.map((courseAnswer) => ({
        title: courseAnswer?.testAnswer,
        description: `Order: ${courseAnswer?.courseAnswerIndex}`,
        titleRight: courseAnswer?.correctAnswer ? 'Correct' : 'Incorrect',
        descriptionRight: 'Answer',
        icon: <FileUnknownOutlined style={{ fontSize: '20px' }} />,
        color: courseAnswer?.correctAnswer ? theme.palette.success.main : theme.palette.error.main,
        backgroundColor: courseAnswer?.correctAnswer ? theme.palette.success.lighter : theme.palette.error.lighter,
        onClick: () => handleOnSetSelectedTestAnswerNo(courseAnswer?.courseTestAnswerNo)
      }))
    );

    setCourseTestAnswersGroupData(formatCourseTestAnswersGroupData);
  }, [theme, dispatch, courseTests, courseTestAnswers, selectedCourseTestQuestion]);

  useEffect(() => {
    if (!Utils.isNull(selectedCourseTestQuestion)) {
      const filteredCourseTestQuestion = courseTestQuestions.find(
        (courseTestQuestion) => courseTestQuestion.courseTestQuestionNo === selectedCourseTestQuestion
      );

      if (!Utils.isNull(filteredCourseTestQuestion) || !Utils.isUndefined(filteredCourseTestQuestion)) {
        setDefaultCourseTestQuestion(filteredCourseTestQuestion);
        setCurrentCourseTestQuestion(filteredCourseTestQuestion);

        setIsValidCourseTestQuestion({
          questionTitle: 1
          //   questionIndex: 1
        });
      }
    } else {
      setDefaultCourseTestQuestion(null);
      setCurrentCourseTestQuestion(null);

      setIsValidCourseTestQuestion({
        questionTitle: 0
        // questionIndex: 0
      });
    }
  }, [courseTestQuestions, selectedCourseTestQuestion]);

  useEffect(() => {
    if (!Utils.isNull(selectedCourseTest)) {
      const filteredCourseTest = courseTests.find((courseTest) => courseTest?.courseTestNo === selectedCourseTest);

      if (!Utils.isNull(filteredCourseTest) || !Utils.isUndefined(filteredCourseTest)) {
        setCurrentCourseTest(filteredCourseTest);
      }
    } else {
      setCurrentCourseTest([]);
    }
  }, [courseTests, selectedCourseTest]);

  useEffect(() => {
    setCanSave(Utils.checkIsValidStatus(isValidCourseTestQuestion));
  }, [isValidCourseTestQuestion]);

  const courseTestQuestionActionListData = () => {
    const courseTestQuestionActionList = [];

    if (!Utils.isNull(selectedCourseTestQuestion)) {
      courseTestQuestionActionList.push({
        title: `Update Course Test Question${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Save changes made to Course Test Question' : 'Modify the Course Test Question to enable this button',
        icon: courseTestQuestionUpdateLoading ? (
          <LoadingOutlined style={{ fontSize: '20px' }} />
        ) : (
          <SaveOutlined style={{ fontSize: '20px' }} />
        ),
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || courseTestQuestionUpdateLoading,
        onClick: handleOnUpdateCourseTestQuestionClick
      });
    } else {
      courseTestQuestionActionList.push({
        title: `Add Course Test Question${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Insert changes made to Course Test Question' : 'Complete the Course Test Question to enable this button',
        icon: courseTestQuestionInsertLoading ? (
          <LoadingOutlined style={{ fontSize: '20px' }} />
        ) : (
          <SaveOutlined style={{ fontSize: '20px' }} />
        ),
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || courseTestQuestionInsertLoading,
        onClick: handleOnInsertCourseTestQuestionClick
      });
    }

    courseTestQuestionActionList.push({
      title: `Delete Course Test Question${selectedCourseTestQuestion ? '' : ' - No Course Test Question to Delete'}`,
      description: selectedCourseTestQuestion ? 'Delete current Course Test Question' : 'No Course Test Question to Delete',
      icon: courseTestQuestionDeleteLoading ? (
        <LoadingOutlined style={{ fontSize: '20px' }} />
      ) : (
        <DeleteOutlined style={{ fontSize: '20px' }} />
      ),
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.lighter,
      disabled: !selectedCourseTestQuestion || courseTestQuestionDeleteLoading,
      onClick: handleOnDeleteCourseTestQuestionClick
    });

    return courseTestQuestionActionList;
  };

  const handleOnCurrentCourseTestQuestionChange = (value, type) => {
    const formattedValue = type === 'questionIndex' ? Number(value) : value;

    setCurrentCourseTestQuestion({
      ...currentCourseTestQuestion,
      [type]: formattedValue
    });

    const hasChanged = defaultCourseTestQuestion?.[type] !== formattedValue;

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

    setIsValidCourseTestQuestion({
      ...isValidCourseTestQuestion,
      [type]: isValid
    });
  };

  const handleOnUpdateCourseTestQuestionClick = () => {
    dispatch(
      coursesActions.requestCourseTestQuestionUpdate(
        accessToken,
        currentCourseTestQuestion,
        currentCourseTestQuestion?.courseTestQuestionNo
      )
    );
  };

  const handleOnInsertCourseTestQuestionClick = () => {
    dispatch(coursesActions.requestCourseTestQuestionInsert(accessToken, currentCourseTestQuestion, currentCourseTest?.courseTestNo));
  };

  const handleOnDeleteCourseTestQuestionClick = () => {
    deleteCourseTestQuestionModalRef.current.callPopUpOpen();
  };

  const handleOnDeleteCourseTestQuestionPopUpClick = () => {
    dispatch(coursesActions.requestCourseTestQuestionDelete(accessToken, currentCourseTestQuestion?.courseTestQuestionNo));
  };

  return (
    <QuestionEditor
      theme={theme}
      courseTestQuestionActionListData={courseTestQuestionActionListData()}
      currentCourseTest={currentCourseTest}
      currentCourseTestQuestion={currentCourseTestQuestion}
      isValidCourseTestQuestion={isValidCourseTestQuestion}
      courseTestAnswersGroupData={courseTestAnswersGroupData}
      deleteCourseTestQuestionModalRef={deleteCourseTestQuestionModalRef}
      courseTestQuestionDeleteLoading={courseTestQuestionDeleteLoading}
      onCurrentCourseTestQuestionChange={handleOnCurrentCourseTestQuestionChange}
      onDeleteCourseTestQuestionPopUpClick={handleOnDeleteCourseTestQuestionPopUpClick}
    />
  );
}

QuestionEditorContainer.propTypes = {};

export default QuestionEditorContainer;
