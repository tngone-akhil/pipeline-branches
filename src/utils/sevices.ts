const BUSSINESS_URL = 'https://gtlandmark.demo.orderstack.io/gtlandmark-business-dev';
const AUTH_URL = "https://gtlandmark.demo.orderstack.io/gtlandmark-auth-dev";



export const ENDPOINTS={
    REFRESH_TOKEN: AUTH_URL+"/api/Auth/RefreshToken",
    DASHBOARD_KPIVALUES:BUSSINESS_URL+'/api/DashBoard/KpiValues',
    NOTIFICATION_URL : BUSSINESS_URL+'/api/DashBoard/GetNotification',
    LOGIN_URL : AUTH_URL+"/api/Auth/AuthenticateUser",
    DOWNLOAD_REPORT :BUSSINESS_URL+"/api/DashBoard/DownloadReport",
    GET_ALL_COMPLETED_TASKS : BUSSINESS_URL+"/api/Task/GetAllCompletedTask",
    GET_ALL_PENDING_TASKS : BUSSINESS_URL+'/api/Task/GetAllPendingTask',
    GET_ALL_TASKS: BUSSINESS_URL+'/api/Task/TaskDetail',
    TASK_CREATION:BUSSINESS_URL+'/api/Task/TaskCreation',
    EDIT_TASKS:BUSSINESS_URL+'/api/Task/EditTaskDetails',
    VIEW_TASK : BUSSINESS_URL+'/api/Task/ViewTask'
}

    

