import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyTabs from './src/tabNavigation/bottom_tab_navigation';
import ConversationScreen from './src/screens/conversation_screen';
import BookDetailScreen from './src/screens/book_detail_screen';
import SearchingResultsScreen from './src/screens/searching_results_screen';
import NotificationScreen from './src/screens/notification_screen';
import LogInScreen from './src/screens/login_screen';
import BookEdittingScreen from './src/screens/book_editting_screen';
import AccountEditting from './src/screens/account_editting_screen';

const Stack = createStackNavigator();

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
                        headerTitle: null,
                        headerShown: false,
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
                <Stack.Screen
                    name='Log in'
                    component={LogInScreen}
                    options={{
                        headerBackTitleVisible: false,
                        headerTitle: null,
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='Book editting'
                    component={BookEdittingScreen}
                    options={{
                        headerBackTitleVisible: false,
                        headerTitle: null,
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='Account editting'
                    component={AccountEditting}
                    options={{
                        headerBackTitleVisible: false,
                        headerTitle: null,
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
  );
}
