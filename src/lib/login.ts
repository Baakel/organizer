import { auth } from "$lib/auth"

const res =  async () => { 
    console.log(auth)
    return await auth.signInWith("google")
};

export function doLogin() {
    const result = res()
    console.log(res)
    console.log(result)
    return result
}