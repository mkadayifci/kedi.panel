import axios from 'axios'

export default new class ApiGateway {
    hostProtocolSection="http://localhost:9000";
    urlPrefix="/api";

    getObject(sessionId,objectPointer) {
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

    
}


