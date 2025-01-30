import AuthenticatedRoute from 'middleware/AuthenticatedRoute.container';
import LoginContainer from 'containers/auth/login/Login.container';
import PasswordForgotContainer from 'containers/auth/passwordForgot/PasswordForgot.container';
import DashboardContainer from 'containers/dashboard/dashboard.container';
import HomeDashboardContainer from 'containers/dashboard/home/HomeDashboard.container';
import UsersAddContainer from 'containers/dashboard/admin/users/add/UsersAdd.container';
import UsersEditContainer from 'containers/dashboard/admin/users/edit/UsersEdit.container';
import UsersHomeContainer from 'containers/dashboard/admin/users/home/UsersHome.container';
import UsersDashboardContainer from 'containers/dashboard/admin/users/UsersDashboard.container';
import GlobalContainer from 'containers/global/global.container';
import OneTimePinContainer from 'containers/token/oneTimePin/OneTimePin.container';
import PasswordResetContainer from 'containers/token/passwordReset/PasswordReset.container';
import TokenContainer from 'containers/token/Token.container';
import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RouteNotFound from 'middleware/RouteNotFound.container';
import UsersAddStatusContainer from 'containers/dashboard/admin/users/add/status/UsersAddStatus.container';
import CoursesDashboardContainer from 'containers/dashboard/admin/courses/CoursesDashboard.container';
import CoursesHomeContainer from 'containers/dashboard/admin/courses/home/CoursesHome.container';
import CourseEditorContainer from 'containers/dashboard/admin/courses/course-editor/CourseEditor.container';
import ModuleEditorContainer from 'containers/dashboard/admin/courses/module-editor/ModuleEditor.container';
import PageEditorContainer from 'containers/dashboard/admin/courses/page-editor/PageEditor.container';
import TestEditorContainer from 'containers/dashboard/admin/courses/test-editor/TestEditor.container';
import QuestionEditorContainer from 'containers/dashboard/admin/courses/question-editor/QuestionEditor.container';
import AnswerEditorContainer from 'containers/dashboard/admin/courses/answer-editor/AnswerEditor.container';
import AllocationContainer from 'containers/dashboard/admin/allocation/Allocation.container';
import AdminDashboardContainer from 'containers/dashboard/admin/AdminDashboard.container';
import AdminHomeContainer from 'containers/dashboard/admin/home/AdminHome.container';
import MyCoursesDashboardContainer from 'containers/dashboard/mycourses/MyCoursesDashboard.container';
import MyCoursesHomeContainer from 'containers/dashboard/mycourses/home/MyCoursesHome.container';
import MyCoursesLearnContainer from 'containers/dashboard/mycourses/learn/MyCoursesLearn.container';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  const { roleNo } = useSelector((state) => state.user);
  return (
    <Router>
      <GlobalContainer>
        <Routes>
          {/* ===========================================[ UNAUTHENTICATED ROUTES ]=========================================== */}

          {/* ====[ REROUTE - TO - LOGIN ]==== */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />

          <Route path="/auth/login" element={<LoginContainer />} />
          <Route path="/auth/password-forgot" element={<PasswordForgotContainer />} />

          <Route path="/token" element={<TokenContainer />}>
            <Route path="one-time-pin" element={<OneTimePinContainer />} />
            <Route path="password-reset" element={<PasswordResetContainer />} />
          </Route>

          {/* ===========================================[ UNAUTHENTICATED ROUTES ]=========================================== */}

          {/* ===========================================[ AUTHENTICATED ROUTES ]=========================================== */}

          <Route element={<AuthenticatedRoute />}>
            {/* ====[ DASHBOARD ]==== */}
            <Route path="/dashboard" element={<DashboardContainer />}>
              <Route index element={<Navigate to="/dashboard/home" replace />} />
              <Route path="home" element={<HomeDashboardContainer />} />

              {/* ====[ MY COURSES - DASHBOARD ]==== */}
              <Route path="my-courses" element={<MyCoursesDashboardContainer />}>
                <Route index element={<Navigate to="/dashboard/my-courses/home" replace />} />
                <Route path="home" element={<MyCoursesHomeContainer />} />

                <Route path="learn" element={<MyCoursesLearnContainer />} />

                {/* ====[ REROUTE - TO - ADMIN USERS HOME ]==== */}
                <Route path="*" element={<RouteNotFound destination="/dashboard/my-courses" />} />
              </Route>

              {/* ====[ ADMIN - DASHBOARD ]==== */}
              {roleNo <= 4 && (
                <Route path="admin" element={<AdminDashboardContainer />}>
                  <Route index element={<Navigate to="/dashboard/admin/home" replace />} />
                  <Route path="home" element={<AdminHomeContainer />} />

                  {/* ====[ ADMIN - USERS - DASHBOARD ]==== */}
                  <Route path="users" element={<UsersDashboardContainer />}>
                    <Route index element={<Navigate to="/dashboard/admin/users/home" replace />} />
                    <Route path="home" element={<UsersHomeContainer />} />

                    <Route path="add/status" element={<UsersAddStatusContainer />} />
                    <Route path="add" element={<UsersAddContainer />} />
                    <Route path="edit" element={<UsersEditContainer />} />

                    {/* ====[ REROUTE - TO - ADMIN USERS HOME ]==== */}
                    <Route path="*" element={<RouteNotFound destination="/dashboard/admin/users" />} />
                  </Route>

                  {/* ====[ ADMIN - COURSES - DASHBOARD ]==== */}
                  <Route path="courses" element={<CoursesDashboardContainer />}>
                    <Route index element={<Navigate to="/dashboard/admin/courses/home" replace />} />
                    <Route path="home" element={<CoursesHomeContainer />} />

                    <Route path="course" element={<CourseEditorContainer />} />
                    <Route path="course/module" element={<ModuleEditorContainer />} />
                    <Route path="course/module/page" element={<PageEditorContainer />} />
                    <Route path="course/test" element={<TestEditorContainer />} />
                    <Route path="course/test/question" element={<QuestionEditorContainer />} />
                    <Route path="course/test/question/answer" element={<AnswerEditorContainer />} />

                    {/* ====[ REROUTE - TO - COURSES HOME ]==== */}
                    <Route path="*" element={<RouteNotFound destination="/dashboard/admin/courses" />} />
                  </Route>

                  {/* ====[ ADMIN - COURSES - DASHBOARD ]==== */}
                  <Route path="allocation" element={<AllocationContainer />} />

                  <Route path="*" element={<RouteNotFound destination="/dashboard/admin" />} />
                </Route>
              )}

              {/* ====[ REROUTE - TO - DAHSBOARD HOME ]==== */}
              <Route path="*" element={<RouteNotFound destination="/dashboard" />} />
            </Route>
          </Route>

          {/* ===========================================[ AUTHENTICATED ]=========================================== */}

          {/* ====[ REROUTE - TO - ROOT ]==== */}
          <Route path="*" element={<RouteNotFound destination="/" />} />
        </Routes>
      </GlobalContainer>
    </Router>
  );
}
