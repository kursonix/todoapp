import * as React from "react"
import { Platform, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { Button } from "./Button"
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useMemo, useState } from "react"
import { formatDate } from "../utils/formatDate"
import { translate } from "../i18n"
import { ButtonCalendar } from "./ButtonCalendar"

export interface DatePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * The currently selected date.
   */
  value: Date
  /**
   * Date change handler.
   */
  onChange: (dates: Date) => void
}

/**
 * Date picker componenet
 */
export const DatePicker = observer(function DatePicker(props: DatePickerProps) {
  const { style, value, onChange } = props
  const $styles = [$container, style]
  const [show, setShow] = useState(false)

  const onDateChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate.toDateString())
    setShow(false)
    onChange(currentDate)
  }

  const tooglePicker = () => {
    setShow((prev) => !prev)
  }

  return (
    <View style={$styles}>
      <ButtonCalendar date={value} onPress={tooglePicker} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          display={"inline"}
          mode={"date"}
          onChange={onDateChange}
          textColor="white"
          themeVariant="dark"
        />
      )}
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}
