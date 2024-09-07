export const formatDate = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    return month + ' ' + date + ', ' + year + ' ' + a.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}