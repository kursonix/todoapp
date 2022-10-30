import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { Button, ButtonProps } from "./Button"
import { useMemo } from "react"
import { formatDate } from "../utils/formatDate"
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons"
import { translate } from "../i18n"

export interface ButtonCalendarProps extends ButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Date label
   */
  date: Date
}

/**
 * Button with date
 */
export const ButtonCalendar = function ButtonCalendar(props: ButtonCalendarProps) {
  const { style, onPress, date } = props
  const $styles = [$container, style]

  const formatedDate = useMemo(() => {
    const selected = formatDate(date.toISOString())
    const current = formatDate(new Date().toISOString())
    return selected === current ? translate("buttonCalendar.currentDay") : selected
  }, [date])

  return (
    <Button
      onPress={onPress}
      style={$styles}
      preset="outline"
      text={formatedDate}
      LeftAccessory={(props) => <Ionicons {...props} name="calendar" size={30} color="white" />}
    ></Button>
  )
}

const $container: ViewStyle = {
  width: 200,
}
