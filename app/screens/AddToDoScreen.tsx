import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, View, ViewStyle } from "react-native"
import {
  Button,
  DatePicker,
  Header,
  Screen,
  Text,
  TextField,
  TextFieldNoBorders,
} from "../components"
import { ToDoScreenProps } from "../navigators/ToDoNavigator"
import { colors, spacing } from "../theme"
import Icon from "@expo/vector-icons/FontAwesome5"

interface AddToScreenProps extends ToDoScreenProps<"AddToDo"> {}

export const AddToDoScreen: FC<AddToScreenProps> = observer(function AddToDoScreen(_props) {
  const { navigation } = _props
  const [date, setDate] = useState(new Date())
  const [task, setTask] = useState("")
  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["bottom"]} contentContainerStyle={$root}>
      <Header rightIcon="x" onRightPress={() => navigation.goBack()} rightIconColor={colors.text} />
      <View style={$content}>
        <View style={$form}>
          <TextFieldNoBorders
            value={task}
            onChange={(values) => setTask}
            placeholderTx="addToDoScreen.input.placeholder"
            multiline={true}
          />
          <DatePicker style={$datePicker} value={date} onChange={setDate} />
        </View>
        <Button
          style={$button}
          preset="default"
          tx="addToDoScreen.button.add"
          RightAccessory={(props) => (
            <Icon {...props} name="chevron-up" size={20} color={colors.palette.neutral900} />
          )}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingBottom: spacing.medium,
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
