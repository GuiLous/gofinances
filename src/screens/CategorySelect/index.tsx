import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { Button } from '../../components/Form/Button'
import { categories } from '../../utils/categories'

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles'

interface CategoryData {
  key: string
  name: string
}

interface CategorySelectProps {
  category: CategoryData
  setCategory: (category: CategoryData) => void
  closeSelectCategory: () => void
}

export function CategorySelect({
  category,
  closeSelectCategory,
  setCategory,
}: CategorySelectProps) {
  const handleSelectCategory = useCallback(
    (category: CategoryData) => {
      setCategory(category)
    },
    [setCategory],
  )

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleSelectCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  )
}
