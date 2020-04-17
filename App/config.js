export function getTimeLeft(time) {
    var time_present = new Date(); // Thời gian ở thời điểm hiện tại

    var time_update = new Date(time); // Thời điểm đăng bài

    var different_times = time_present.getTime() - time_update.getTime();

    var different_years = parseInt(different_times / (1000 * 3600 * 24 * 365));

    var different_months = parseInt(different_times / (1000 * 3600 * 24 * 30));

    var different_days = parseInt(different_times / (1000 * 3600 * 24));

    var different_hours = parseInt(different_times / (1000 * 3600));

    var different_minutes = parseInt(different_times / (1000 * 60));

    var different_seconds = parseInt(different_times / (1000));

    if (different_years > 0) {
        return different_years + ' năm trước';
    } else if (different_months > 0) {
        return different_months + ' tháng trước';
    } else if (different_days > 0) {
        return different_days + ' ngày trước';
    } else if (different_hours > 0) {
        return different_hours + ' giờ trước';
    } else if (different_minutes > 0) {
        return different_minutes + ' phút trước';
    } else if (different_seconds > 0) {
        return different_seconds + ' giây trước';
    }
};

export function isLoggedIn() {
    var logged_in = false;
    fetch(server + '/auth/get_user')
        .then((response) => response.json())
        .then((responseJson) => {
            logged_in = responseJson.loggedIn;
        })
        .catch((error) => {
            console.error(error);
        });

    return logged_in;
}

//export const server = 'http://192.168.43.3:3000';
//export const server = 'http://172.20.10.2:3000';
//export const server = 'http://192.168.1.103:3000';
export const server = 'http://192.168.1.101:3000';