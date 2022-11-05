import { FontAwesome5 } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Dimensions, StyleProp, TextStyle, ViewStyle } from "react-native"
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler"
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { Task } from "../models"
import { colors, spacing, typography } from "../theme"
import { TaskDoneButton } from "./TaskDoneButton"
import { Text } from "./Text"

const TASK_CARD_HEIGHT = 60

const { width: SCREEN_WIDTH } = Dimensions.get("window")

const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.2

export interface TaskCardProps extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
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
  const { style, task, onDismiss, simultaneousHandlers } = props
  const $styles = [$container, style]
  const translateX = useSharedValue(0)
  const itemHeight = useSharedValue(TASK_CARD_HEIGHT)
  const marginVertical = useSharedValue(8)
  const opacity = useSharedValue(1)

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX
    },
    onEnd: () => {
      const shouldBeDismised = translateX.value < TRANSLATE_X_THRESHOLD
      if (shouldBeDismised) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        itemHeight.value = withTiming(0)
        marginVertical.value = withTiming(0)
        opacity.value = withTiming(0)
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(onDismiss)(task.id)
          }
        })
      } else {
        translateX.value = withTiming(0)
      }
    },
  })

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }))

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0)
    return { opacity }
  })

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginTop: marginVertical.value,
      opacity: opacity.value,
    }
  })

  const $taskText = [$text, task.done && $textTaskDone]

  const setTaskStatus = (value: boolean) => {
    task.setStatus(value)
  }

  return (
    <Animated.View style={[$styles, rTaskContainerStyle]}>
      <Animated.View style={$iconWrapper}>
        <Animated.View style={[$iconContainer, rIconContainerStyle]}>
          <FontAwesome5 name="trash-alt" size={TASK_CARD_HEIGHT * 0.4} color={"red"} />
        </Animated.View>
      </Animated.View>
      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
        <Animated.View style={[$task, rStyle]}>
          <TaskDoneButton value={task.done} setValue={setTaskStatus} />
          <Text style={$taskText} size="md">
            {task.task}
          </Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $task: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  height: TASK_CARD_HEIGHT,
  backgroundColor: colors.cardBackground,
  borderRadius: 20,
  paddingLeft: spacing.medium,
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

const $iconContainer: ViewStyle = {
  height: TASK_CARD_HEIGHT,
  width: TASK_CARD_HEIGHT,
  position: "absolute",
  right: "5%",
  justifyContent: "center",
  alignItems: "center",
}

const $iconWrapper: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  position: "absolute",
  height: TASK_CARD_HEIGHT,
  width: "100%",
  borderRadius: 20,
}
