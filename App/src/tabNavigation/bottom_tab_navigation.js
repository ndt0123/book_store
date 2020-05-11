
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

import Icon from 'react-native-vector-icons/Entypo';

import NewBookScreen from '../screens/new_book_screen';
import MessageScreen from '../screens/message_screen';
import AccountScreen from '../screens/account_screen';
import HomeScreen from '../screens/home_screen';
import LogInScreen from '../screens/login_screen';

const Tab = createBottomTabNavigator();

class MyTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            logged_in: false
        }
    }

    componentDidMount() {
        // Gọi hàm kiểm tra xem đã đăng nhập chưa (tức là user_id đã được lưu trong AsyncStorage chưa)
        this.isLoggedIn();
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
        const logInScreen = props => (<LogInScreen logged_in={() => this.setState({logged_in: true})}/>);
        //const accountScreen = props => (<AccountScreen log_out={() => this.setState({logged_in: false})}/>);
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Trang chủ') {
                            iconName = focused ? 'home' : 'home'
                        } else if (route.name === 'Đăng bài') {
                            iconName = focused ? 'edit' : 'edit'
                        } else if (route.name === 'Chat') {
                            iconName = focused ? 'chat' : 'chat'
                        } else if (route.name === 'Tài khoản') {
                            iconName = focused ? 'user' : 'user'
                        } else if (route.name === 'Đăng nhập') {
                            iconName = focused ? 'login' : 'login'
                        }

                        return <Icon name={iconName} size={size} color={color} />;
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
                            <Tab.Screen name="Chat" component={MessageScreen} />
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
