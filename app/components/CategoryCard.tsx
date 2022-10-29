import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { CardWrapper } from "./CardWrapper"
import { ProgressBar } from "./ProgressBar"

export interface CategoryCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CategoryCard = observer(function CategoryCard(props: CategoryCardProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <CardWrapper style={$styles}>
      <Text style={$secondaryText}>40 Tasks</Text>
      <Text size="xl" preset="bold">
        Business
      </Text>
      <ProgressBar style={$progressBar} />
    </CardWrapper>
  )
})

const $container: ViewStyle = {
  padding: spacing.large,
}

const $text: TextStyle = {}

const $secondaryText: TextStyle = {
  color: colors.palette.primary300,
}

const $progressBar: ViewStyle = {
  marginTop: spacing.medium,
}
