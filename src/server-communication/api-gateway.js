import axios from 'axios'

export default new class ApiGateway {
    hostProtocolSection = "http://localhost:5334";
    urlPrefix = "/api";

    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this.hostProtocolSection = "";
        }
        axios.interceptors.response.use(null, function (error) {

            window.vueInstance.$logger.submitException(error);
            if (!error.response) {
                window.vueInstance.$errNotifier("Error", "Network error! Couldn't reach the host application.");
            }
            else if (error.response.status === 500) {
                switch (error.response.data.subCode) {
                    case 100://Host application didn't find the session Id, we must open file manager to create new session.
                        localStorage.removeItem("currentSession");
                        window.vueInstance.$errNotifier("Session Error", "Host application couldn't find session in the memory. Please select a dump file to start inspection.");
                        window.vueInstance.$router.push({ name: "open-file" });
                        break;
                }
                return defaultResponse;
            }
            return Promise.reject(error);
        });
    }
    
    getObject(sessionId, objectPointer) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/object/${sessionId}/${objectPointer}`);
    }
    getExceptionObjects(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/exception-analyzer/${sessionId}`);
    }
    getDuplicateStrings(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/duplicate-strings-analyzer/${sessionId}`);
    }
    getPinnedObjects(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/pinned-objects-analyzer/${sessionId}`);
    }
    getBlockingObjects(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/blocking-objects-analyzer/${sessionId}`);
    }
    getThreadPoolDetail(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/threadpool-analyzer/${sessionId}`);
    }
    getStackTraceAnalyze(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/stack-trace-analyzer/${sessionId}`);
    }
    getFinalizerQueue(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/finalizer-queue-analyzer/${sessionId}`);
    }
    getMemoryStats(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/memory/${sessionId}`);
    }
    getModuleList(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/modules/${sessionId}`);
    }
    getThreadsList(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/threads/${sessionId}`);
    }
    getSummary(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/summary/${sessionId}`);
    }
    getTypeNames(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/play-zone/types/${sessionId}`);
    }
    getPlayZoneResults(sessionId, types, searchValue) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/play-zone/results/${sessionId}`, { params: { queryValue: searchValue, type: types } });
    }
    getFileSystemInfo(path) {
        if (path === undefined || path === "") {
            path = "~";
        }

        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/file-system/`, { params: { path: path } });
    }
    getSessions(sessionId, types, searchValue) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/sessions`);
    }
    createSession(path) {
        return axios
            .post(`${this.hostProtocolSection}${this.urlPrefix}/session`, { path: path });
    }
    closeAllSessions(path) {
        return axios
            .post(`${this.hostProtocolSection}${this.urlPrefix}/session/close-all`);
    }


}


