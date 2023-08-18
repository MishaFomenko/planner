
export const windowTrack = (setWindowWidth) => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => {
    setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
    window.removeEventListener('resize', handleResize);
    };
}
    

export function getLocals(setDays) {
    let idun;
    let localIdStr = localStorage.getItem('localId');
    let localId = JSON.parse(localIdStr);
    if (localId===null) {
        idun=9999999;
    } else {
        idun=localId;
    }
    let localDaysStr = localStorage.getItem('localDays');
    let localDays = JSON.parse(localDaysStr);
    if (localDays===null || localDays?.length===0) {
        localDays=[{id:idun, tasks:[], date:localDate}];
    } 
    setDays(localDays)
}

