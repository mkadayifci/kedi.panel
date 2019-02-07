import axios from 'axios'

export default new class ApiGateway {
    getObject(objectPointer) {
        return axios
            .get(`http://localhost:9000/api/object/30230bf96a884830a0b96805cf173717/${objectPointer}`)
    }
    getExceptionObjects(sessionId) {
        return axios
            .get(`http://localhost:9000/api/analyzers/exception-analyzer/${sessionId}`)
    }
    getDuplicateStrings(sessionId) {
        return axios
            .get(`http://localhost:9000/api/analyzers/duplicate-strings-analyzer/${sessionId}`)
    }
    getThreadPoolDetail(sessionId) {
        return axios
            .get(`http://localhost:9000/api/analyzers/threadpool-analyzer/${sessionId}`)
    }

}