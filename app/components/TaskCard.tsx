import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { PanGestureHandlerProps } from "react-native-gesture-handler"
import { useCategoryColor } from "../hooks/useCategoryColor"
import { Task } from "../models"
import { colors, spacing, typography } from "../theme"
import { RemovableCard } from "./RemovableCard"
import { Toggle } from "./Toggle"

export interface TaskCardProps extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  /**
   * Task data
   */
  task: Task
  /**
   * On dismiss callback
   */
  onDismiss: (taskId: string) => void
}

/**
 * Task item
 */
export const TaskCard = observer(function TaskCard(props: TaskCardProps) {
  const { task, onDismiss, simultaneousHandlers } = props

  const $taskText = [$text, task.done && $textTaskDone]

  const setTaskStatus = () => {
    task.setStatus(!task.done)
  }

  const hanleOnDimiss = () => {
    onDismiss(task.id)
  }

  const { color } = useCategoryColor(task.category)

  return (
    <RemovableCard simultaneousHandlers={simultaneousHandlers} onDismiss={hanleOnDimiss}>
      <View style={$task}>
        <Toggle
          containerStyle={$toogle}
          variant="radio"
          value={task.done}
          onPress={setTaskStatus}
          label={task.task}
          labelStyle={$taskText}
          inputOuterStyle={{
            borderColor: color,
          }}
        />
      </View>
    </RemovableCard>
  )
})

const $toogle: ViewStyle = {
  marginRight: spacing.medium,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.text,
  flexShrink: 1,
}

const $textTaskDone: TextStyle = {
  textDecorationLine: "line-through",
}

const $task: ViewStyle = {}
