import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"

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
