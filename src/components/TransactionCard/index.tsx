import React from 'react'

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styled'

type Category = {
  name: string;
  icon: string
}

export type TransactionData = {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: Category;
  date: string
}

interface TransactionCardProps {
  data: TransactionData;
}

export function TransactionCard({ data }: TransactionCardProps) {
  const { amount, category, title, date, type } = data;
  
  return (
    <Container>
      <Title>{title}</Title>

      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon}/>  
          <CategoryName>{category.name}</CategoryName>
        </Category>  
        <Date>{date}</Date>
      </Footer> 
    </Container>
  )
}