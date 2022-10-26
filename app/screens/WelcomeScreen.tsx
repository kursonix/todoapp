import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { useStores } from "../models"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}
export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  // Pull in one of our MST stores
  const { authenticationStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <Text text={authenticationStore.user.displayName} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
