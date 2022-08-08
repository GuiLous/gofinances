import React from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'
import { TextInputProps } from 'react-native'

import { Input } from '../Input'
import { Container, Error } from './styles'

interface InputFormProps extends TextInputProps {
  control: Control
  name: string
  error?: FieldError
}

export function InputForm({
  control,
  name,
  error = undefined,
  ...rest
}: InputFormProps) {
  return (
    <Container>
      {error && <Error>{error.message}</Error>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
    </Container>
  )
}
