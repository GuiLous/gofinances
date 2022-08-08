import React from 'react'

import { Container, Title, Amount } from './styles'

interface HistoryCardProps {
  title: string
  amount: string
  color: string
}

export function HistoryCard({ amount, title, color }: HistoryCardProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}
