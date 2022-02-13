export function getUserFromStorage() {
    const userKey = Object.keys(window.localStorage)
        .filter(it => it.startsWith('firebase:authUser'))[0];
    const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : null;
    return user
}

export function isToday(date, now): boolean {
    const yearDate = date.getYear();
    const monthDate = date.getMonth();
    const dayDate = date.getDate();
    const yearNow = now.getYear();
    const monthNow = now.getMonth();
    const dayNow = now.getDate();
    if (yearDate === yearNow && monthDate === monthNow && dayDate === 
      dayNow) {
      return true
    }
    return false
}