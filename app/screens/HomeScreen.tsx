import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, ViewStyle, Image, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { MainMenu, MainMenuActionButton, MainMenuWrapper, Screen, Text } from "../components"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import * as Localization from "expo-localization"
import { colors, spacing } from "../theme"
import { useSharedValue } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { DrawerIconButton } from "../components/DrawerIconButton"
import { ToDoScreenProps } from "../navigators/ToDoNavigator"
import { useStores } from "../models"
import { CategorySection } from "../components/CategorySection"
import { AddTaskButton } from "../components/AddTaskButton"
import { useNavigation } from "@react-navigation/native"
import { TaskSection } from "../components/TaskSection"

interface HomeScreenProps extends ToDoScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const { navigation } = _props
  const { authenticationStore } = useStores()

  const navigateToAddToDo = () => {
    navigation.navigate("AddToDo")
  }

  return (
    <MainMenu>
      <MainMenuWrapper>
        <Screen
          preset="fixed"
          safeAreaEdges={["top", "bottom"]}
          style={$root}
          contentContainerStyle={$rootInner}
        >
          <MainMenuActionButton />
          <View style={$content}>
            <Text
              tx="homeScreen.title"
              txOptions={{
                name: authenticationStore.user.displayName,
              }}
              preset="heading"
            />
            <CategorySection />
            <TaskSection />
          </View>
          <AddTaskButton style={$addButton} onPress={navigateToAddToDo} />
        </Screen>
      </MainMenuWrapper>
    </MainMenu>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $rootInner: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $addButton: ViewStyle = {
  position: "absolute",
  bottom: 0,
  right: spacing.large,
}
