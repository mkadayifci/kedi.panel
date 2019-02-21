import axios from 'axios';

export default function (error) {

    if (axios.isCancel(error)) {
        return Promise.reject(error);
    }
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
            case 101://Host application's architecture is 64Bit but source is 32Bit
                window.vueInstance.$errNotifier("Architecture Mismatch", "kedi only supports 64bit dump files. 32Bit file support is in our product roadmap.");
                break;
            default:
                window.vueInstance.$errNotifier("Error Occured", error.response.data.message);
                break;
        }
    }
    return Promise.reject(error);
}