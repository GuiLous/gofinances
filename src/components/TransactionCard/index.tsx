import React from 'react'
import { categories } from '../../utils/categories'

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styled'

export type TransactionData = {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

interface TransactionCardProps {
  data: TransactionData
}

export function TransactionCard({ data }: TransactionCardProps) {
  const { amount, category, name, date, type } = data

  const categoryData = categories.find((item) => item.key === category)

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categoryData?.icon} />
          <CategoryName>{categoryData?.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  )
}
