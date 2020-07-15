
import { AsyncStorage } from 'react-native';

//Hàm lấy thời gian từ lúc đăng sách đến bây giờ
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

//Hàm lưu user_id vào AsyncStorage
export async function storeUserId(user) {
    try {
        await AsyncStorage.setItem("user_id", JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
}

// Hàm remove user_id từ AsyncStorage
export async function removeUserFromAsyncStorage() {
    try {
        await AsyncStorage.removeItem("user_id");
    }
    catch(exception) {
        console.log(error)
    }
}

// Hàm lưu conversations vào AsyncStorage
export async function storeConversation(conversations) {
    try {
        await AsyncStorage.setItem("conversations", JSON.stringify(conversations));
    } catch (error) {
        console.log(error);
    }
}

// Hàm thay đổi giá trị conversations trong AsyncStorage
export async function setConversationInStorage(messageContent) {
    try {
        let conversationStorage = await AsyncStorage.getItem("conversations");
        let conversations_in_storage = JSON.parse(conversationStorage);

        if(conversations_in_storage != null) {
            var convresation_exist = false;
            for(var i=0; i<conversations_in_storage.length; i++) {
                if(messageContent.conversation_id == conversations_in_storage[i].conversation_id) {
                    conversations_in_storage[i].time = messageContent.time;
                    conversations_in_storage[i].sending_id = messageContent.sending_id;
                    convresation_exist = true;
                }
            }

            if(convresation_exist == false) {
                conversations_in_storage.push({
                    conversation_id: messageContent.conversation_id,
                    sending_id: messageContent.sending_id,
                    time: messageContent.time
                })
            }
    
            await AsyncStorage.setItem("conversations", JSON.stringify(conversations_in_storage));
        }
    } catch (error) {
        console.log(error);
    }
}

// Hàm remove conversations từ AsyncStorage
export async function removeConversationsFromAsyncStorage() {
    try {
        await AsyncStorage.removeItem("conversations");
    }
    catch(exception) {
        console.log(error)
    }
}

//export const server = 'http://192.168.43.3:3000';
//export const server = 'http://172.20.10.2:3000';
//export const server = 'http://192.168.1.103:3000';
export const server = 'http://192.168.81.102:3000';

export const server_socket_io = "http://192.168.81.102:8810";