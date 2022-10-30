import * as React from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text, TextProps } from "./Text"
import { translate } from "../i18n"
import { Button } from "./Button"

export interface TextFieldNoBordersProps extends Omit<TextInputProps, "ref"> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
}

/**
 * Describe your component here
 */
export const TextFieldNoBorders = observer(function TextFieldNoBorders(
  props: TextFieldNoBordersProps,
) {
  const { style, placeholderTx, placeholder, ...TextInputProps } = props
  const $styles = [$text, style]
  const placeholderContent = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <TextInput
      style={$styles}
      placeholder={placeholderContent}
      placeholderTextColor={colors.placeholder}
      {...TextInputProps}
    />
  )
})

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 26,
  color: colors.text,
}
