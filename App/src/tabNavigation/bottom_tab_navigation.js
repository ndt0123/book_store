
/*
 Điều hướng bottom tab navigation cho các màn hình chính:
        - Trang chủ
        - Đăng bài
        - Tin nhắn
        - Tài khoản
 */


import * as React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/Entypo';

import NewBookScreen from '../screens/new_book_screen';
import MessageScreen from '../screens/message_screen';
import AccountScreen from '../screens/account_screen';
import HomeScreen from '../screens/home_screen';
import LogInScreen from '../screens/login_screen';

import {server_socket_io, server, storeConversation} from '../../config';

const Tab = createBottomTabNavigator();

function IconWithBadge({ name, badgeCount, color, size }) {
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Icon name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
}
  
function HomeIconWithBadge(props) {
    // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
    return <IconWithBadge {...props} />;
}

class MyTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            logged_in: false,
            number_of_new_message: 0
        }
    }

    componentDidMount() {
        // Gọi hàm kiểm tra xem đã đăng nhập chưa (tức là user_id đã được lưu trong AsyncStorage chưa)
        this.isLoggedIn();

        // Hàm kiểm tra tin nhắn mới
        // Kiểm tra xem đã có dữ liệu tin nhắn trong AsyncStorage chưa
        // Lấy dữ liệu tin nhắn trên sever và đối chiếu với dữ liệu tin nhắn trong AsyncStorage
        // Nếu hai dữ liệu về tin mới nhất khác nhau thì là có tin mới
        this.newMessage();
        

        // Hàm kiểm tra thông báo mới
        // Lấy dữ liệu về thông báo của người dùng trên server và đối chiếu với dữ liệu trong AsyncStorage
        // Nếu hai dữ liệu khác nhau tức là có thông báo mới
    }

    newMessage = async () => {
        try {
            let userData = await AsyncStorage.getItem("user_id");
            let user_id = JSON.parse(userData);

            // Nếu người dùng đã đăng nhập - tức là có user_id
            if(user_id != null) {
                // Dữ liệu về conversation của người dùng được lưu trong storage
                let conversationStorage = await AsyncStorage.getItem("conversations");
                let conversations_in_storage = JSON.parse(conversationStorage);

                // Lấy dữ liệu về conversation hiện tại của người dùng
                fetch(server + '/message/all-conversation/' + user_id)
                .then((response) => response.json())
                .then((responseJson) => {

                    let conversations_of_user = []; // Biến lưu dữ liệu hiện tại của người dùng
                    // Lấy conversation_id, time của tin nhắn mới nhất của từng cuộc trò chuyện
                    for(var i=0; i<responseJson.conversations.length; i++) { 
                        conversations_of_user.push({
                            conversation_id: responseJson.conversations[i].conversation_id,
                            sending_id: responseJson.conversations[i].sending_id,
                            time: responseJson.conversations[i].time
                        })
                    }

                    if(conversations_in_storage == null) {
                        // Set biến state.number_of_new_message để lưu số tin nhắn mới
                        this.setState({
                            number_of_new_message: 0
                        })

                        // Gọi hàm lưu conversation vào AsyncStorage
                        storeConversation(conversations_of_user);
                    } else {

                        let num_of_new_message = 0; // Số tin nhắn mới
                        // Tính toán số tin nhắn mới
                        for(var i=0; i<conversations_of_user.length; i++) {
                            let equal = false;

                            for(var j=0; j<conversations_in_storage.length; j++) {
                                if(conversations_in_storage[j].conversation_id == conversations_of_user[i].conversation_id) {
                                    if(conversations_in_storage[j].sending_id == conversations_of_user[i].sending_id ||
                                        conversations_in_storage[j].time == conversations_of_user[i].time) {
                                        equal = true;
                                        j = conversations_in_storage.length;
                                    }
                                }
                            }

                            if(equal == false) {
                                num_of_new_message += 1;
                            }
                        }

                        // Set biến state.number_of_new_message để lưu số tin nhắn mới
                        this.setState({
                            number_of_new_message: num_of_new_message
                        })
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Kiểm tra xem người dùng đã từng đăng nhập trên máy này chưa
    // Tức là kiểm tra xem trong AsyncStorage có user_id không
    // Nếu đã từng đăng nhập thì set biến state.logged_in = true
    isLoggedIn = async () => {
        try {
            let userData = await AsyncStorage.getItem("user_id");
            let user_id = JSON.parse(userData);
            if(user_id != null) {
                this.setState({
                    logged_in: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Trang chủ') {
                            iconName = focused ? 'home' : 'home'
                            return <Icon name={iconName} size={size} color={color} />;
                        } else if (route.name === 'Đăng bài') {
                            iconName = focused ? 'edit' : 'edit'
                            return <Icon name={iconName} size={size} color={color} />;
                        } else if (route.name === 'Chat') {
                            iconName = focused ? 'chat' : 'chat'
                            return <HomeIconWithBadge name={iconName} size={size} color={color} badgeCount={this.state.number_of_new_message} />;
                        } else if (route.name === 'Tài khoản') {
                            iconName = focused ? 'user' : 'user'
                            return <Icon name={iconName} size={size} color={color} />;
                        } else if (route.name === 'Đăng nhập') {
                            iconName = focused ? 'login' : 'login'
                            return <Icon name={iconName} size={size} color={color} />;
                        }

                    },
                })}

                tabBarOptions={{
                    activeTintColor: '#D96704',
                    inactiveTintColor: '#616161'
                }}
            >
                <Tab.Screen name="Trang chủ" component={HomeScreen} />
                {
                    this.state.logged_in == false ? 
                        (
                            <Tab.Screen name="Đăng nhập">
                                {props => (<LogInScreen logged_in={() => this.setState({logged_in: true})} navigation={this.props.navigation}/>)}
                            </Tab.Screen>
                        ) :
                        (
                            <>
                                <Tab.Screen name="Đăng bài" component={NewBookScreen} />
                                <Tab.Screen name="Chat" >
                                    {props => (<MessageScreen number_of_new_message={(number) => {
                                        this.setState({
                                            number_of_new_message: number
                                        })
                                    }} 
                                    navigation={this.props.navigation}/>)}
                                </Tab.Screen>
                                <Tab.Screen name="Tài khoản">
                                    {props => (<AccountScreen log_out={() => this.setState({logged_in: false})} navigation={this.props.navigation}/>)}
                                </Tab.Screen>
                            </>
                        )
                }
            </Tab.Navigator>
        );
    }
}

export default MyTabs;
