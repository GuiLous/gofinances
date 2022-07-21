import React, { useCallback, useState } from 'react'

import { Button } from '../../components/Form/Button'
import { Input } from '../../components/Form/Input'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles'

export function Register() {

  const [transactionType, setTransactionType] = useState('')

  const handleSelectTransactionType = useCallback((type: 'up' | 'down') => {
    setTransactionType(type)
  }, [])

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>


      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />

          <Input
            placeholder="Preço"
          />

          <TransactionsTypes>
            <TransactionTypeButton
              title='Income'
              type='up'
              isActive={transactionType === 'up'}
              onPress={() => handleSelectTransactionType('up')}
            />

            <TransactionTypeButton
              title='Outcome'
              type='down'
              isActive={transactionType === 'down'}
              onPress={() => handleSelectTransactionType('down')}
            />
          </TransactionsTypes>

        </Fields>

        <Button title="Enviar"/>
      </Form>
    </Container>
  )
}