import axios from "axios";


export const http = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-type": "application/json"
    }
});

export default (url: string) => http.get(url).then((res) => res.data);


