
/*
 Điều hướng bottom tab navigation cho các màn hình chính:
        - Trang chủ
        - Đăng bài
        - Tin nhắn
        - Tài khoản
 */


import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Entypo';

import NewBookScreen from '../screens/new_book_screen';
import MessageScreen from '../screens/message_screen';
import AccountScreen from '../screens/account_screen';
import HomeScreen from '../screens/home_screen';
import LogInScreen from '../screens/login_screen';

import { isLoggedIn} from '../../config';

const Tab = createBottomTabNavigator();

class MyTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            logged_in: false
        }
    }
    componentDidMount() {
        this.setState({
            logged_in: isLoggedIn()
        })
    }

    render() {
        const logInScreen = props => (<LogInScreen logged_in={() => this.setState({logged_in: true})}/>);
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
                            <Tab.Screen name="Đăng nhập" component={logInScreen} />
                        ) :                        
                        (
                            <>
                            <Tab.Screen name="Đăng bài" component={NewBookScreen} />
                            <Tab.Screen name="Chat" component={MessageScreen} />
                            <Tab.Screen name="Tài khoản" component={AccountScreen} />
                            </>
                        )
                }
            </Tab.Navigator>
        );
    }
}

export default MyTabs;
