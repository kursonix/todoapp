import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, ViewStyle, Image, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, ButtonAccessoryProps, Icon, Screen, Text } from "../components"
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

export const isRTL = Localization.isRTL

const logo = require("../../assets/images/logo.png")

interface HomeScreenProps extends ToDoScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<DrawerLayout>()
  const progress = useSharedValue(0)
  const menuRef = useRef<FlatList>()
  const { authenticationStore } = useStores()

  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
      drawerRef.current?.openDrawer({ speed: 2 })
    } else {
      setOpen(false)
      drawerRef.current?.closeDrawer({ speed: 2 })
    }
  }

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={326}
      drawerType={"slide"}
      drawerPosition={isRTL ? "right" : "left"}
      drawerBackgroundColor={colors.palette.neutral100}
      overlayColor={colors.palette.overlay20}
      onDrawerSlide={(drawerProgress) => {
        progress.value = open ? 1 - drawerProgress : drawerProgress
      }}
      onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
        if (newState === "Settling") {
          setOpen(drawerWillShow)
        }
      }}
      renderNavigationView={() => {
        return (
          <SafeAreaView style={$drawer} edges={["top"]}>
            <View style={$logoContainer}>
              <Image source={logo} style={$logoImage} />
            </View>

            <FlatList<{ name: string; useCases: string[] }>
              ref={menuRef}
              contentContainerStyle={$flatListContentContainer}
              data={[]}
              keyExtractor={(item) => item.name}
              renderItem={({ item, index: sectionIndex }) => <View></View>}
            />
          </SafeAreaView>
        )
      }}
    >
      <Screen
        preset="fixed"
        safeAreaEdges={["top", "bottom"]}
        style={$root}
        contentContainerStyle={$rootInner}
      >
        <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />
        <View style={$content}>
          <Text
            tx="homeScreen.title"
            txOptions={{
              name: authenticationStore.user.displayName,
            }}
            preset="heading"
          />
          <CategorySection />
        </View>
        <AddTaskButton style={$addButton} />
      </Screen>
    </DrawerLayout>
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

const $drawer: ViewStyle = {
  flex: 1,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  height: 56,
  paddingHorizontal: spacing.large,
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $addButton: ViewStyle = {
  position: "absolute",
  bottom: 0,
  right: spacing.large,
}
