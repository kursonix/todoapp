import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { Icon } from "./Icon"
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons"
import { ButtonProps } from "./Button"

export interface AddTaskButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Called when the button is pressed.
   */
  onPress?: ButtonProps["onPress"]
}

/**
 * Describe your component here
 */
export const AddTaskButton = observer(function AddTaskButton(props: AddTaskButtonProps) {
  const { style, onPress } = props
  const $styles = [$container, style]

  return (
    <TouchableOpacity style={$styles} onPress={onPress}>
      <Ionicons name="plus" size={30} color="white" />
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.accent500,
  width: 50,
  height: 50,
  borderRadius: 90,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
