export function getDate() {
    const today = new Date();
    const dayOfTheWeek = today.getDay();
    let day = today.getDate();
    if (dayOfTheWeek == 1) day = today.getDate() - 3;
    if (dayOfTheWeek == 0) day = today.getDate() - 2;
    if (dayOfTheWeek == 7) day = today.getDate() - 1;
  
    return (today.getMonth() + 1) + '-' + day + '-' + today.getFullYear();
}