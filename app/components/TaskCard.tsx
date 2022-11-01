import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { CardWrapper } from "./CardWrapper"
import { Task } from "../models"

export interface TaskCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Task data
   */
  task: Task
}

/**
 * Task item
 */
export const TaskCard = observer(function TaskCard(props: TaskCardProps) {
  const { style, task } = props
  const $styles = [$container, style]

  return (
    <CardWrapper style={$styles}>
      <Text style={$text}>{task.task}</Text>
    </CardWrapper>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
