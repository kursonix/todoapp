import * as React from "react"
import { FlatList, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import { useRef, useState } from "react"
import { useSharedValue } from "react-native-reanimated"
import * as Localization from "expo-localization"
import { MenuContext } from "./MainMenu"
import { MainMenuContent } from "./MainMenuContent"

export const isRTL = Localization.isRTL

export interface AppMenuProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Main content
   */
  children: React.ReactNode
}

/**
 * Main app menu wrapper
 */
export const MainMenuWrapper = function MainMenuWrapper(props: AppMenuProps) {
  const { style, children } = props
  const $styles = [$container, style]

  const { progress, drawerRef, setOpen } = React.useContext(MenuContext)

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
        return <MainMenuContent />
      }}
    >
      {children}
    </DrawerLayout>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}
