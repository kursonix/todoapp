import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text, TextProps } from "./Text"

export interface SectionHeaderProps extends TextProps {}

/**
 * Describe your component here
 */
export const SectionHeader = observer(function SectionHeader(props: SectionHeaderProps) {
  return <Text size="sm" style={$text} {...props} />
})

const $text: TextStyle = {
  color: colors.palette.primary200,
  letterSpacing: 3,
}
