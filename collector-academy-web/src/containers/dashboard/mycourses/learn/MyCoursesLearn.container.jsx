import {
  AppstoreAddOutlined,
  CheckSquareOutlined,
  EditOutlined,
  MinusSquareOutlined,
  PlayCircleOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import MyCoursesLearn from 'components/dashboard/mycourses/learn/MyCoursesLearn.component';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as myCoursesActions from 'redux/actions/MyCourses.action';
import { Utils } from 'utils/Utils';
import { getTestStatusColor } from './MyCoursesLearn.helper';
import { requestCourseTestLogInsert, requestCourseTestResultInsert, requestCourseTestResultUpdate } from 'redux/actions/Courses.action';

function MyCoursesLearnContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const { myLearnCourse, selectedCourseResultNo } = useSelector((state) => state.myCourses);

  const [steps, setSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedView, setSelectedView] = useState('course');
  const [selectedCourseTestNo, setSelectedCOurseTestNo] = useState();

  const [learnActionsListData, setLearnActionsListData] = useState([]);
  const [finishTestActionsListData, setFinishTestActionsListData] = useState([]);
  const [learnGroupData, setLearnGroupData] = useState([]);

  useEffect(() => {
    const { myCourse, myCourseResult } = myLearnCourse;
    const { myModules, myTests } = myCourse;

    if (selectedView === 'course') {
      const formatPages = [];

      myModules.map((myModule) => {
        myModule.myPages.map((myPage) => {
          formatPages.push({
            header1: `Course: ${myCourse?.courseTitle}`,
            subHeader1: `${myCourse?.courseDescription}`,
            header2: `Module: ${myModule?.moduleTitle}`,
            subHeader2: myModule?.moduleDescription,
            header3: `Page: ${myPage?.pageTitle}`,
            subHeader3: myPage?.pageDescription,
            content: myPage?.pageContent /// CONVERT INTO HTML FRIENDLY TEXT
          });
        });
      });

      setSteps(formatPages);
      setSelectedStep(0);
    } else {
      const formatQuestions = [];
      const selectedTest = myTests.find((myTest) => myTest?.courseTestNo === selectedCourseTestNo);
      const courseTestNo = selectedTest?.courseTestNo;
      const myCourseTestResult = selectedTest?.myCourseTestResult;
      const courseTestResultNo = myCourseTestResult?.courseTestResultNo;
      const myTestLogs = myCourseTestResult?.myTestLogs;
      const courseResultNo = myCourseResult?.courseResultNo;

      selectedTest.myQuestions.map((myQuestion) => {
        const isQuestionAnswered = myTestLogs.find((myTestLog) => myTestLog.courseTestQuestionNo === myQuestion?.courseTestQuestionNo);
        formatQuestions.push({
          header1: `Test: ${selectedTest?.testTitle}`,
          subHeader1: `Difficulty: ${selectedTest?.courseDifficulty} - Duration: ${Utils.formatMinutes(selectedTest?.testDuration)}`,
          header2: `Question: ${myQuestion?.questionTitle}`,
          subHeader2: 'Choose one answer from multiple choice',
          content: myQuestion?.myAnswers.map((myAnswer) => {
            const selectedAnswer = myTestLogs.find((myTestLog) => myTestLog.courseTestAnswerNo === myAnswer?.courseTestAnswerNo);
            return {
              title: myAnswer?.courseTestAnswer,
              icon: selectedAnswer ? (
                <CheckSquareOutlined style={{ fontSize: '20px' }} />
              ) : (
                <MinusSquareOutlined style={{ fontSize: '20px' }} />
              ),
              color: selectedAnswer ? theme.palette.primary.main : theme.palette.secondary.main,
              backgroundColor: selectedAnswer ? theme.palette.primary.lighter : theme.palette.secondary.lighter,

              onClick: () =>
                handleOnAnswerClick(selectedTest?.myCourseTestResult, myQuestion?.courseTestQuestionNo, myAnswer?.courseTestAnswerNo)
            };
          }),
          completed: isQuestionAnswered,
          isTestContent: true
        });
      });

      console.log();

      if (Utils.isNull(courseTestResultNo)) {
        dispatch(requestCourseTestResultInsert(accessToken, courseResultNo, courseTestNo));
      }

      setSteps(formatQuestions);
    }
  }, [dispatch, accessToken, theme, myLearnCourse, selectedView, selectedCourseTestNo]);

  useEffect(() => {
    dispatch(myCoursesActions.requestMyLearnCourse(accessToken, selectedCourseResultNo));
  }, [dispatch, accessToken, selectedCourseResultNo]);

  useEffect(() => {
    const formatLearnGroupData = [];

    formatLearnGroupData.push({
      title: steps[selectedStep]?.header1,
      description: steps[selectedStep]?.subHeader1,
      icon: <AppstoreAddOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.success.main,
      backgroundColor: theme.palette.success.lighter,
      disabled: true
    });

    formatLearnGroupData.push({
      title: steps[selectedStep]?.header2,
      description: steps[selectedStep]?.subHeader2,
      icon: <AppstoreAddOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.success.main,
      backgroundColor: theme.palette.success.lighter,
      disabled: true
    });

    if (!Utils.isNull(steps[selectedStep]?.header3) && !Utils.isUndefined(steps[selectedStep]?.header3)) {
      formatLearnGroupData.push({
        title: steps[selectedStep]?.header3,
        description: steps[selectedStep]?.subHeader3,
        icon: <AppstoreAddOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: true
      });
    }

    setLearnGroupData(formatLearnGroupData);
  }, [theme, steps, selectedStep]);

  useEffect(() => {
    const formatLearnActionsListData = [];

    const { myCourse } = myLearnCourse;
    const { myModules, myTests } = myCourse;

    const handleOnSelectModules = () => {
      setSelectedView('course');
      setSelectedStep(0);
    };

    const handleOnStartTestClick = (courseTestNo) => {
      setSelectedView('test');
      setSelectedStep(0);
      setSelectedCOurseTestNo(courseTestNo);
    };

    formatLearnActionsListData.push({
      title: 'Learn Course',
      description: 'Enter the Course to Start Learning',
      icon: <PlayCircleOutlined style={{ fontSize: '20px' }} />,
      iconSize: 1,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.lighter,
      onClick: handleOnSelectModules
    });

    myTests.map((myTest) => {
      const statusColors = getTestStatusColor(myTest?.myCourseTestResult?.courseTestResultStatusNo, theme);

      formatLearnActionsListData.push({
        title: myTest?.testTitle,
        description: `Difficulty: ${myTest?.courseDifficulty} - Duration: ${Utils.formatMinutes(myTest?.testDuration)}`,
        titleRight: Utils.formatString(myTest?.myCourseTestResult?.courseTestResultStatus) || 'Not Started',
        descriptionRight: `Remaining Attempts: ${myTest?.remainingRetries}`,
        icon: <EditOutlined style={{ fontSize: '20px' }} />,
        iconSize: 1,
        color: statusColors.color,
        backgroundColor: statusColors.backgroundColor,
        onClick: () => handleOnStartTestClick(myTest?.courseTestNo)
      });
    });

    setLearnActionsListData(formatLearnActionsListData);
  }, [theme, myLearnCourse]);

  useEffect(() => {
    const formatFinishTestActionsListData = [];
    const { myCourse } = myLearnCourse;
    const { myModules, myTests } = myCourse;

    const selectedTest = myTests.find((myTest) => myTest?.courseTestNo === selectedCourseTestNo);
    const questionsCount = selectedTest?.myQuestions.length;
    const testLogsCount = selectedTest?.myCourseTestResult?.myTestLogs.length;

    formatFinishTestActionsListData.push({
      title: 'Finish Test',
      description: 'Submit Answers for Auto Assessment',
      icon: <SaveOutlined style={{ fontSize: '20px' }} />,
      iconSize: 1,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.lighter,
      disabled: questionsCount !== testLogsCount,
      onClick: handleOnFinishTestClick
    });

    setFinishTestActionsListData(formatFinishTestActionsListData);
  }, [theme, myLearnCourse, selectedCourseTestNo]);

  const handleOnSelectedStepClick = (index) => {
    setSelectedStep(index);
  };

  const handleOnAnswerClick = (courseTestResult, courseTestQuestionNo, courseTestAnswerNo) => {
    const formatCourseTestLog = courseTestResult?.myTestLogs.find(
      (myTestLog) =>
        myTestLog?.courseTestResultNo === courseTestResult?.courseTestResultNo &&
        myTestLog?.courseTestQuestionNo === courseTestQuestionNo &&
        myTestLog?.courseTestAnswerNo === courseTestAnswerNo
    );

    if (Utils.isNull(formatCourseTestLog) || Utils.isUndefined(formatCourseTestLog)) {
      dispatch(requestCourseTestLogInsert(accessToken, courseTestResult?.courseTestResultNo, courseTestQuestionNo, courseTestAnswerNo));
    } else {
      // Do update
    }

    const { myCourse } = myLearnCourse;
    const { myModules, myTests } = myCourse;

    const selectedTest = myTests.find((myTest) => myTest?.courseTestNo === selectedCourseTestNo);

    if (selectedTest?.myQuestions.length - 1 > selectedStep) {
      setSelectedStep(selectedStep + 1);
    }
  };

  const handleOnFinishTestClick = () => {
    const { myCourse } = myLearnCourse;
    const { myTests } = myCourse;

    const selectedTest = myTests.find((myTest) => myTest?.courseTestNo === selectedCourseTestNo);
    const courseTestResultNo = selectedTest?.myCourseTestResult?.courseTestResultNo;

    dispatch(requestCourseTestResultUpdate(accessToken, courseTestResultNo));

    setSelectedView('course');
  };

  return (
    <MyCoursesLearn
      actionsListData={learnActionsListData}
      finishTestActionsListData={finishTestActionsListData}
      learnGroupData={learnGroupData}
      steps={steps}
      selectedStep={selectedStep}
      selectedView={selectedView}
      onSelectedStepClick={handleOnSelectedStepClick}
    />
  );
}

MyCoursesLearnContainer.propTypes = {};

export default MyCoursesLearnContainer;
