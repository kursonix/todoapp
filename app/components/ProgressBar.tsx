import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import * as Progress from "react-native-progress"

export interface ProgressBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ProgressBar = observer(function ProgressBar(props: ProgressBarProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Progress.Bar
        progress={0.3}
        width={200}
        color={colors.palette.accent500}
        unfilledColor={colors.palette.primary100}
        borderWidth={0}
      />
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}
