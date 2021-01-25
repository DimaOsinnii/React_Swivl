import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.github.com/',
});

export default function getMethod(url) {
    return instance.get(url).catch(console.log)
}
