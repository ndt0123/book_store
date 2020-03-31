import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyTabs from './src/tabNavigation/bottom_tab_navigation';
import ConversationScreen from './src/screens/conversation_screen';
import BookDetailScreen from './src/screens/book_detail_screen';
import SearchingResultsScreen from './src/screens/searching_results_screen';
import NotificationScreen from './src/screens/notification_screen';

const Stack = createStackNavigator();

//global.server = 'http://192.168.43.3:3000';
//global.server = 'http://172.20.10.2:3000';
//global.server = 'http://192.168.1.11:3000';


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name='Home'
                    component={MyTabs}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='Conversation'
                    component={ConversationScreen}
                    options={{
                        headerBackTitleVisible: false,
                        headerTitle: 'Nguyễn Duy Tâm',
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: '#D96704'
                        },
                        headerTitleStyle: {
                            color: 'black'
                        }
                    }}
                />
                <Stack.Screen
                    name='Book Detail'
                    component={BookDetailScreen}
                    options={{
                        headerBackTitleVisible: false,
                        headerTitle: null,
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='Searching results'
                    component={SearchingResultsScreen}
                    options={{
                        headerBackTitleVisible: false,
                        headerTitle: null,
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='Notification'
                    component={NotificationScreen}
                    options={{
                        headerBackTitleVisible: false,
                        headerTitle: "Thông báo",
                        headerStyle: {
                            backgroundColor: '#D96704',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                            color: 'black'
                        }
                        
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
  );
}
