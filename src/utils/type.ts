export const getDay = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const dayRe = `${day}/${month}/${year}`;
    // if (fillFlag) day < 10 ? `0${day}` : day
    return dayRe;
  };