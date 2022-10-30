import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { MenuContext } from "./MainMenu"
import { DrawerIconButton } from "./DrawerIconButton"

export interface MainMenuActionButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const MainMenuActionButton = function MainMenuActionButton(
  props: MainMenuActionButtonProps,
) {
  const { style } = props
  const $styles = [$container, style]
  const { open, toggleMenu, progress } = React.useContext(MenuContext)

  return <DrawerIconButton onPress={toggleMenu} {...{ open, progress }} />
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
