import Icon from "@expo/vector-icons/FontAwesome5"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ActivityIndicator, Keyboard, View, ViewStyle } from "react-native"
import {
  Button,
  ButtonCalendar,
  DatePicker,
  Header,
  Screen,
  TextFieldNoBorders,
} from "../components"
import { useStores } from "../models"
import { ToDoScreenProps } from "../navigators/ToDoNavigator"
import { colors, spacing } from "../theme"

interface AddToScreenProps extends ToDoScreenProps<"AddToDo"> {}

export const AddToDoScreen: FC<AddToScreenProps> = observer(function AddToDoScreen(_props) {
  const { navigation } = _props
  const [date, setDate] = useState(new Date())
  const [task, setTask] = useState("")
  const [loading, setLoading] = useState(false)
  const {
    taskStore,
    authenticationStore: { user },
  } = useStores()

  async function onAddTask() {
    if (!task || !date) {
      return
    }
    setLoading(true)
    await taskStore.addTask({
      task,
      date,
      user: user.uid,
    })
    setLoading(false)
    navigation.goBack()
  }

  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["bottom"]} contentContainerStyle={$root}>
      <Header rightIcon="x" onRightPress={() => navigation.goBack()} rightIconColor={colors.text} />
      <View style={$content}>
        <View style={$form}>
          <TextFieldNoBorders
            value={task}
            onChangeText={setTask}
            placeholderTx="addToDoScreen.input.placeholder"
            multiline={true}
          />
          <DatePicker
            style={$datePicker}
            value={date}
            onChange={setDate}
            pressableCompoent={(value, toogle) => (
              <ButtonCalendar
                date={value}
                onPress={() => {
                  Keyboard.dismiss()
                  toogle()
                }}
              />
            )}
          />
        </View>
        <Button
          onPress={onAddTask}
          style={$button}
          preset="default"
          tx="addToDoScreen.button.add"
          RightAccessory={(props) => (
            <Icon {...props} name="chevron-up" size={20} color={colors.palette.neutral900} />
          )}
        />
        {loading && (
          <View style={$loading}>
            <ActivityIndicator size="large" color={colors.palette.neutral100} />
          </View>
        )}
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingBottom: spacing.large,
  flex: 1,
  justifyContent: "space-between",
}

const $button: ViewStyle = {
  width: 200,
  alignSelf: "flex-end",
}

const $form: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const $datePicker: ViewStyle = {
  marginTop: spacing.extraLarge,
}

const $loading: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
}
