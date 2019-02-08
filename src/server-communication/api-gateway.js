import axios from 'axios'

export default new class ApiGateway {
    getObject(sessionId,objectPointer) {
        return axios
            .get(`http://localhost:9000/api/object/${sessionId}/${objectPointer}`);
    }
    getExceptionObjects(sessionId) {
        return axios
            .get(`http://localhost:9000/api/analyzers/exception-analyzer/${sessionId}`);
    }
    getDuplicateStrings(sessionId) {
        return axios
            .get(`http://localhost:9000/api/analyzers/duplicate-strings-analyzer/${sessionId}`);
    }
    getThreadPoolDetail(sessionId) {
        return axios
            .get(`http://localhost:9000/api/analyzers/threadpool-analyzer/${sessionId}`);
    }
    getMemoryStats(sessionId) {
        return axios
            .get(`http://localhost:9000/api/memory/${sessionId}`);
    }
}