import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import {
  AddTaskButton,
  MainMenu,
  MainMenuActionButton,
  MainMenuWrapper,
  Screen,
  Text,
} from "../components"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `TestScroll: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="TestScroll" component={TestScrollScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const TestScrollScreen: FC<StackScreenProps<AppStackScreenProps, "TestScroll">> = observer(
  function TestScrollScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <MainMenu>
        <MainMenuWrapper>
          <Screen
            style={$root}
            contentContainerStyle={$rootInner}
            preset="fixed"
            safeAreaEdges={["top", "bottom"]}
          >
            <Text text="testScroll" />
            <Text text="testScroll" />
            <Text text="testScroll" />
            <Text text="testScroll" />
            <Text text="testScroll" />
            <View style={{ flex: 1 }}>
              <MainMenuActionButton />
              <AddTaskButton style={$addButton} />
              <ScrollView>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
                <View
                  style={{ height: 100, width: 300, backgroundColor: "red", marginTop: 10 }}
                ></View>
              </ScrollView>
            </View>
          </Screen>
        </MainMenuWrapper>
      </MainMenu>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $rootInner: ViewStyle = {
  flex: 1,
}

const $addButton: ViewStyle = {
  position: "absolute",
  bottom: spacing.large,
  right: spacing.large,
}
