import { message } from "antd"

let obj: any = {}

obj.getToken = () => {
    return localStorage.getItem("token")
}

obj.setToken = (token: string) => {
    return localStorage.setItem("token", `Bearer ${token}`)
}

// form Error handle
obj.errorHandle = (e: any) => {
    const arr = Object.keys(e)
    message.error(e[arr[0]].message)
}

export default obj