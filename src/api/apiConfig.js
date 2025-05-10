const apiUrl = {
    authUrl: {
        login: '/auth/login',
        socialLogin: '/auth/login/social',
        register: '/auth/register',
        logout: '/auth/logout',
        changePassWord: 'auth/changePassWord',
        forgotPassWord: '/auth/forgotPassWord',
        resetPassWord: '/auth/resetPassWord',
        verifyOtp: '/auth/verifyOtp',
        refreshToken: '/auth/refreshToken',
    },
    aiUrl: {
        loadChatHistory: '/ai/',
        speakingReply: '/ai/speaking/conversation',
        talkWithAI: '/ai/talk',
    },
    roleUrl: {
        getRole: '/role',
    },
    userUrl: {
        get: '/user',
        getById: (userId) => `/user/${userId}`,
        getInfo: (userName) => `/user/getUserInfo/${userName}`,
        getCourses: (userId) => `/user/getUserInfo/course/${userId}`,
        add: '/user/addUser',
        update: '/user/updateUserInfo',
        updateProfile: '/user/updateUserProfile',
        delete: (userName) => `/user/deleteUser/${userName}`,
    },
    courseUrl: {
        get: '/course',
        getBySlug: (slug) => `/course/slug/${slug}`,
        add: '/course/addCourse',
        getEnrollment: '/course/getCourse/enrollment',
        addEnrollment: '/course/addCourse/enrollment',
        update: '/course/updateCourse',
        delete: (id) => `/course/deleteCourse/${id}`,
    },
    chapterUrl: {
        getByCourseId: (courseId) => `/chapter/course/${courseId}`,
    },
    lessonUrl: {
        add: '/lesson/addNewLesson',
        get: '/lesson/',
        getBySlug: (slug) => `/lesson/slug/${slug}`,
        getByCourseSlug: (slug) => `/lesson/${slug}`,
        getWithUserProgress: (courseName) => `/lesson/getLessonWithUserProgress/${courseName}`,
        getTotalLessonNumber: (courseId) => `/lesson/totalLesson/${courseId}`,
        update: '/lesson/updateLesson',
    },
    lessonProgressUrl: {
        get: '/progress/',
        markCompleted: (lessonId) => `/progress/markLessonCompleted/${lessonId}`,
    },
    testSetUrl: {
        get: '/testset',
    },
    quizzeUrl: {
        add: '/quizze/addNewQuizze',
        getQuizzesWithQuestions: '/quizze/getQuizzesWithQuestions',
        getBySlug: (quizzeSlug) => `/quizze/getQuizzeBySlug/${quizzeSlug}`,
        getByLessonSlug: (lessonSlug) => `/quizze/getQuizzeByLessonSlug/${lessonSlug}`,
        getByType: (quizzeType) => `/quizze/getQuizzeByType/${quizzeType}`,
    },
    questionUrl: {
        getByQuizzeSlug: (quizzeSlug, part) =>
            part ? `/question/slug/${quizzeSlug}?part=${part}` : `/question/slug/${quizzeSlug}`,
        add: '/question/addNewQuestion',
    },
    questionTypeUrl: {
        get: '/questionType/',
    },
    submissionUrl: {
        add: '/submission/submit',
        submitWriting: '/submission/submit/writing',
        getById: (id) => `/submission/getSubmission/${id}`,
        getByUserId: (userId, page, limit) => `/submission/getSubmissions/${userId}?page=${page}&limit=${limit}`,
        getGlobalRanking: '/submission/ranking',
    },
    postUrl: {
        get: '/post',
        getById: (id) => `/post/${id}`,
        like: (id) => `/post/toggleLike/${id}`,
        totalLike: (id) => `/post/totalLike/${id}`,
        create: '/post/create',
        update: (id) => `/post/update/${id}`,
        delete: (id) => `/post/delete/${id}`,
    },
    commentUrl: {
        get: (id) => `/comment/${id}`,
        create: '/comment/create',
        update: (id) => `/comment/update/${id}`,
        delete: (id) => `/comment/delete/${id}`,
    },
    paymentUrl: {
        create: '/payment/create',
        return: '/payment/return',
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
