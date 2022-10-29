import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { SectionHeader } from "./SectionHeader"
import { CategoryCard } from "./CategoryCard"

export interface CategorySectionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CategorySection = observer(function CategorySection(props: CategorySectionProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={$textContainer}>
        <SectionHeader tx="categorySectionComponent.name"></SectionHeader>
      </View>
      <View style={$categoryList}>
        <CategoryCard style={$category} />
        <CategoryCard style={$category} />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $categoryList: ViewStyle = {
  flexDirection: "row",
}

const $category: ViewStyle = {
  marginTop: spacing.small,
  marginRight: spacing.small,
}

const $textContainer: TextStyle = {
  marginTop: spacing.medium,
}
