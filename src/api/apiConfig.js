const API_BASE_URL = 'http://localhost:8017'

const apiUrl = {
    authUrl: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`,
    },
    roleUrl: {
        getRole: `${API_BASE_URL}/role`,
    },
    userUrl: {
        getUser: `${API_BASE_URL}/user`,
        getUserInfo: (userName) => `${API_BASE_URL}/user/getUserInfo/${userName}`,
        addUser: `${API_BASE_URL}/user/addUser`,
        updateUser: `${API_BASE_URL}/user/updateUserInfo`,
        deleteUser: (userName) => `${API_BASE_URL}/user/deleteUser/${userName}`,
    },
    courseUrl: {
        getCourse: `${API_BASE_URL}/course`,
        getCourseBySlug: (slug) => `${API_BASE_URL}/course/slug/${slug}`,
        addNewCourse: `${API_BASE_URL}/course/addCourse`,
        updateCourse: `${API_BASE_URL}/course/updateCourse`,
        deleteCourse: (id) => `${API_BASE_URL}/course/deleteCourse/${id}`,
    },
    lessonUrl: {
        addNewLesson: `${API_BASE_URL}/lesson/addNewLesson`,
        getAllLesson: `${API_BASE_URL}/lesson/`,
        getLessonBySlug: (slug) => `${API_BASE_URL}/lesson/slug/${slug}`,
        getLessonByCourseSlug: (slug) => `${API_BASE_URL}/lesson/${slug}`,
        updateLesson: `${API_BASE_URL}/lesson/updateLesson`,
    },
    quizzeUrl: {
        addNewQuizze: `${API_BASE_URL}/quizze/addNewQuizze`,
        getQuizzesWithQuestions: `${API_BASE_URL}/quizze/getQuizzesWithQuestions`,
        getQuizzeBySlug: (quizzeSlug) => `${API_BASE_URL}/quizze/getQuizzeBySlug/${quizzeSlug}`,
        getQuizzeByLessonSlug: (lessonSlug) => `${API_BASE_URL}/quizze/getQuizzeByLessonSlug/${lessonSlug}`,
    },
    questionUrl: {
        getQuestionByQuizzeSlug: (quizzeSlug) => `${API_BASE_URL}/question/getQuestionByQuizzeSlug/${quizzeSlug}`,
        addNewQuestion: `${API_BASE_URL}/question/addNewQuestion`,
    },
    questionTypeUrl: {
        getQuestionType: `${API_BASE_URL}/questionType/`,
    },
    submissionUrl: {
        addNewSubmission: `${API_BASE_URL}/submission/submit`,
    },
    dictionaryUrl: {
        getWord: (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    },
}

export { API_BASE_URL, apiUrl }
