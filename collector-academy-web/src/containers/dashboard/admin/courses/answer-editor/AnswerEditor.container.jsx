import { DeleteOutlined, LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Utils } from 'utils/Utils';
import { validateField } from './AnswerEditor.helper';
import * as coursesActions from 'redux/actions/Courses.action';
import AnswerEditor from 'components/dashboard/admin/courses/answer-editor/AnswerEditor.component';

function AnswerEditorContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const deleteCourseTestAnswerModalRef = useRef();

  const { accessToken } = useSelector((state) => state.auth);
  const {
    courseTestQuestions,
    courseTestAnswers,
    selectedCourseTestQuestion,
    selectedCourseTestAnswer,
    courseTestAnswerUpdateLoading,
    courseTestAnswerInsertLoading,
    courseTestAnswerDeleteLoading
  } = useSelector((state) => state.courses);

  const [defaultCourseTestAnswer, setDefaultCourseTestAnswer] = useState(null);
  const [currentCourseTestAnswer, setCurrentCourseTestAnswer] = useState(null);
  const [currentCourseTestQuestion, setCurrentCourseTestQuestion] = useState(null);
  const [isValidCourseTestAnswer, setIsValidCourseTestAnswer] = useState(null);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (!Utils.isNull(selectedCourseTestAnswer)) {
      const filteredCourseTestAnswer = courseTestAnswers.find(
        (courseTestAnswer) => courseTestAnswer.courseTestAnswerNo === selectedCourseTestAnswer
      );

      if (!Utils.isNull(filteredCourseTestAnswer) || !Utils.isUndefined(filteredCourseTestAnswer)) {
        setDefaultCourseTestAnswer(filteredCourseTestAnswer);
        setCurrentCourseTestAnswer(filteredCourseTestAnswer);

        setIsValidCourseTestAnswer({
          testAnswer: 1
        });
      }
    } else {
      setDefaultCourseTestAnswer(null);
      setCurrentCourseTestAnswer(null);

      setIsValidCourseTestAnswer({
        testAnswer: 0
      });
    }
  }, [courseTestAnswers, selectedCourseTestAnswer]);

  useEffect(() => {
    if (!Utils.isNull(selectedCourseTestQuestion)) {
      const filteredCourseTestQuestion = courseTestQuestions.find(
        (courseTestQuestion) => courseTestQuestion?.courseTestQuestionNo === selectedCourseTestQuestion
      );

      if (!Utils.isNull(filteredCourseTestQuestion) || !Utils.isUndefined(filteredCourseTestQuestion)) {
        setCurrentCourseTestQuestion(filteredCourseTestQuestion);
      }
    } else {
      setCurrentCourseTestQuestion([]);
    }
  }, [courseTestQuestions, selectedCourseTestQuestion]);

  useEffect(() => {
    setCanSave(Utils.checkIsValidStatus(isValidCourseTestAnswer));
  }, [isValidCourseTestAnswer]);

  const courseTestAnswerActionListData = () => {
    const courseTestAnswerActionList = [];

    if (!Utils.isNull(selectedCourseTestAnswer)) {
      courseTestAnswerActionList.push({
        title: `Update Course Test Answer${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Save changes made to Course Test Answer' : 'Modify the Course Test Answer to enable this button',
        icon: courseTestAnswerUpdateLoading ? (
          <LoadingOutlined style={{ fontSize: '20px' }} />
        ) : (
          <SaveOutlined style={{ fontSize: '20px' }} />
        ),
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || courseTestAnswerUpdateLoading,
        onClick: handleOnUpdateCourseTestAnswerClick
      });
    } else {
      courseTestAnswerActionList.push({
        title: `Add Course Test Answer${canSave ? '' : ' - No Valid Changes Made'}`,
        description: canSave ? 'Insert changes made to Course Test Answer' : 'Complete the Course Test Answer to enable this button',
        icon: courseTestAnswerInsertLoading ? (
          <LoadingOutlined style={{ fontSize: '20px' }} />
        ) : (
          <SaveOutlined style={{ fontSize: '20px' }} />
        ),
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !canSave || courseTestAnswerInsertLoading,
        onClick: handleOnInsertCourseTestAnswerClick
      });
    }

    courseTestAnswerActionList.push({
      title: `Delete Course Test Answer${selectedCourseTestAnswer ? '' : ' - No Course Test Answer to Delete'}`,
      description: selectedCourseTestAnswer ? 'Delete current Course Test Answer' : 'No Course Test Answer to Delete',
      icon: courseTestAnswerDeleteLoading ? (
        <LoadingOutlined style={{ fontSize: '20px' }} />
      ) : (
        <DeleteOutlined style={{ fontSize: '20px' }} />
      ),
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.lighter,
      disabled: !selectedCourseTestAnswer || courseTestAnswerDeleteLoading,
      onClick: handleOnDeleteCourseTestAnswerClick
    });

    return courseTestAnswerActionList;
  };

  const handleOnCurrentCourseTestAnswerChange = (value, type) => {
    const formattedValue = type === 'courseAnserIndex' ? Number(value) : typeof value === 'boolean' ? value : value;

    setCurrentCourseTestAnswer({
      ...currentCourseTestAnswer,
      [type]: formattedValue
    });

    const hasChanged = defaultCourseTestAnswer?.[type] !== formattedValue;

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

    setIsValidCourseTestAnswer({
      ...isValidCourseTestAnswer,
      [type]: isValid
    });
  };

  const handleOnUpdateCourseTestAnswerClick = () => {
    dispatch(
      coursesActions.requestCourseTestAnswerUpdate(accessToken, currentCourseTestAnswer, currentCourseTestAnswer?.courseTestAnswerNo)
    );
  };

  const handleOnInsertCourseTestAnswerClick = () => {
    dispatch(
      coursesActions.requestCourseTestAnswerInsert(accessToken, currentCourseTestAnswer, currentCourseTestQuestion?.courseTestQuestionNo)
    );
  };

  const handleOnDeleteCourseTestAnswerClick = () => {
    deleteCourseTestAnswerModalRef.current.callPopUpOpen();
  };

  const handleOnDeleteCourseTestAnswerPopUpClick = () => {
    dispatch(coursesActions.requestCourseTestAnswerDelete(accessToken, currentCourseTestAnswer?.courseTestAnswerNo));
  };

  return (
    <AnswerEditor
      theme={theme}
      courseTestAnswerActionListData={courseTestAnswerActionListData()}
      currentCourseTestQuestion={currentCourseTestQuestion}
      currentCourseTestAnswer={currentCourseTestAnswer}
      isValidCourseTestAnswer={isValidCourseTestAnswer}
      deleteCourseTestAnswerModalRef={deleteCourseTestAnswerModalRef}
      courseTestAnswerDeleteLoading={courseTestAnswerDeleteLoading}
      onCurrentCourseTestAnswerChange={handleOnCurrentCourseTestAnswerChange}
      onDeleteCourseTestAnswerPopUpClick={handleOnDeleteCourseTestAnswerPopUpClick}
    />
  );
}

AnswerEditorContainer.propTypes = {};

export default AnswerEditorContainer;
