import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { PanGestureHandlerProps } from "react-native-gesture-handler"
import { Task } from "../models"
import { colors, typography } from "../theme"
import { RemovableCard } from "./RemovableCard"
import { TaskDoneButton } from "./TaskDoneButton"
import { Text } from "./Text"

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

  const setTaskStatus = (value: boolean) => {
    task.setStatus(value)
  }

  const hanleOnDimiss = () => {
    onDismiss(task.id)
  }

  return (
    <RemovableCard simultaneousHandlers={simultaneousHandlers} onDismiss={hanleOnDimiss}>
      <View style={$task}>
        <TaskDoneButton value={task.done} setValue={setTaskStatus} />
        <Text style={$taskText} size="md">
          {task.task}
        </Text>
      </View>
    </RemovableCard>
  )
})

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.text,
  flexShrink: 1,
}

const $textTaskDone: TextStyle = {
  textDecorationLine: "line-through",
}

const $task: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
