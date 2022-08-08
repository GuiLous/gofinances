import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Icons, Title } from './styles'

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface TransactionTypeButtonProps extends RectButtonProps {
  title: string
  type: 'up' | 'down'
  isActive: boolean
}

export function TransactionTypeButton({
  title,
  type,
  isActive = false,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container isActive={isActive} type={type} {...rest}>
      <Icons name={icons[type]} type={type} />

      <Title>{title}</Title>
    </Container>
  )
}
