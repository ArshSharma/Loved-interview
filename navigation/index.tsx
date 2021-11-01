import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Homescreen from '../screens/homeScreen/homeScreen';
import ScreenB from '../screens/screenB';
type Props = { }
const Stack = createNativeStackNavigator()

const Index = (props: Props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Homescreen} />
                <Stack.Screen name="Second" component={ScreenB} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Index;