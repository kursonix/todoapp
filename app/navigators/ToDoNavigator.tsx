import React from "react"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import { HomeScreen, WelcomeScreen } from "../screens"
import { CompositeScreenProps } from "@react-navigation/native"

export type ToDoNavigatorParamList = {
  Home: undefined
}

export type ToDoScreenProps<T extends keyof ToDoNavigatorParamList> = StackScreenProps<
  ToDoNavigatorParamList,
  T
>

const Stack = createStackNavigator<ToDoNavigatorParamList>()
export const ToDoNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}