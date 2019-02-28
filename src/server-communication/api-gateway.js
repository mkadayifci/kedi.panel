import axios from 'axios'
import errorInterceptor from './error-interceptor'

export default new class ApiGateway {
    hostProtocolSection = "http://localhost:5334";
    urlPrefix = "/api";

    constructor() {
        this.takeCancellationToken();

        if (process.env.NODE_ENV === 'production') {
            this.hostProtocolSection = "";
        }

        axios.interceptors.response.use(null, errorInterceptor);
    }
    takeCancellationToken() {
        this.cancelToken = axios.CancelToken;
        this.source = this.cancelToken.source();
    }
    cancelAllConnections() {
        this.source.cancel('Operation canceled by the user.');
        this.takeCancellationToken();
    }
    getObject(sessionId, objectPointer) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/object/${sessionId}/${objectPointer}`,
                {
                    cancelToken: this.source.token
                });
    }
    getExceptionObjects(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/exception-analyzer/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getDuplicateStrings(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/duplicate-strings-analyzer/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getPinnedObjects(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/pinned-objects-analyzer/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getBlockingObjects(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/blocking-objects-analyzer/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getThreadPoolDetail(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/threadpool-analyzer/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getStackTraceAnalyze(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/stack-trace-analyzer/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getFinalizerQueue(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/analyzers/finalizer-queue-analyzer/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getMemoryStats(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/memory/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getModuleList(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/modules/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getThreadsList(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/threads/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getSummary(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/summary/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getTypeNames(sessionId) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/play-zone/types/${sessionId}`,
                {
                    cancelToken: this.source.token
                });
    }
    getPlayZoneResults(sessionId, types, searchValue) {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/play-zone/results/${sessionId}`,
                {
                    params: { queryValue: searchValue, type: types }
                },
                {
                    cancelToken: this.source.token
                });
    }
    getFileSystemInfo(path) {
        if (path === undefined || path === "") {
            path = "~";
        }

        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/file-system/`,
                {
                    params:
                    {
                        path: path
                    }
                },
                {
                    cancelToken: this.source.token
                });
    }
    getSessions() {
        return axios
            .get(`${this.hostProtocolSection}${this.urlPrefix}/sessions`,
                {
                    cancelToken: this.source.token
                });
    }
    createSession(path) {
        return axios
            .post(`${this.hostProtocolSection}${this.urlPrefix}/session`,
                {
                    path: path
                });
    }
    closeAllSessions() {
        return axios
            .post(`${this.hostProtocolSection}${this.urlPrefix}/session/close-all`);
    }
    commitFeedback(name, emailAddress, content) {
        return axios
            .post("https://kedi.io/wp-json/wp/v2/comments", null, {
                params: {
                    author_name: name,
                    author_email: emailAddress,
                    content: content,
                    post: 165
                }
            });
    }


}


