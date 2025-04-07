const apiUrl = {
    authUrl: {
        login: '/auth/login',
        socialLogin: '/auth/login/social',
        register: '/auth/register',
        logout: '/auth/logout',
    },
    roleUrl: {
        getRole: '/role',
    },
    userUrl: {
        getUser: '/user',
        getUserById: (userId) => `/user/${userId}`,
        getUserInfo: (userName) => `/user/getUserInfo/${userName}`,
        getUserCourses: (userId) => `/user/getUserInfo/course/${userId}`,
        addUser: '/user/addUser',
        updateUser: '/user/updateUserInfo',
        deleteUser: (userName) => `/user/deleteUser/${userName}`,
    },
    courseUrl: {
        getCourse: '/course',
        getCourseBySlug: (slug) => `/course/slug/${slug}`,
        addNewCourse: '/course/addCourse',
        getCourseEnrollment: '/course/getCourse/enrollment',
        addCourseEnrollment: '/course/addCourse/enrollment',
        updateCourse: '/course/updateCourse',
        deleteCourse: (id) => `/course/deleteCourse/${id}`,
    },
    chapterUrl: {
        getChapterByCourseId: (courseId) => `/chapter/course/${courseId}`,
    },
    lessonUrl: {
        addNewLesson: '/lesson/addNewLesson',
        getAllLesson: '/lesson/',
        getLessonBySlug: (slug) => `/lesson/slug/${slug}`,
        getLessonByCourseSlug: (slug) => `/lesson/${slug}`,
        updateLesson: '/lesson/updateLesson',
    },
    quizzeUrl: {
        addNewQuizze: '/quizze/addNewQuizze',
        getQuizzesWithQuestions: '/quizze/getQuizzesWithQuestions',
        getQuizzeBySlug: (quizzeSlug) => `/quizze/getQuizzeBySlug/${quizzeSlug}`,
        getQuizzeByLessonSlug: (lessonSlug) => `/quizze/getQuizzeByLessonSlug/${lessonSlug}`,
    },
    questionUrl: {
        getQuestionByQuizzeSlug: (quizzeSlug) => `/question/slug/${quizzeSlug}`,
        addNewQuestion: '/question/addNewQuestion',
    },
    questionTypeUrl: {
        getQuestionType: '/questionType/',
    },
    submissionUrl: {
        addNewSubmission: '/submission/submit',
    },
    dictionaryUrl: {
        getWord: (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    },
    googleUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
    facebookUrl: {
        getUserInfo: (accessToken) => `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`,
    },
}

export { apiUrl }
