import axios from 'axios'

export default new class ApiGateway {
    hostProtocolSection = "http://localhost:5334";
    urlPrefix = "/api";

    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this.hostProtocolSection = "";
        }
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


}


