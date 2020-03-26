import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MyTabs from './src/tabNavigation/bottom_tab_navigation';
import ConversationScreen from './src/screens/conversation_screen';
import BookDetailScreen from './src/screens/book_detail_screen';
import SearchingScreen from './src/screens/searching_screen';

const Stack = createStackNavigator();

global.server = 'http://192.168.43.3:3000';
//global.server = 'http://172.20.10.2:3000';


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
                    name='Searching'
                    component={SearchingScreen}
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
