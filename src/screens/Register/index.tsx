import React, { useCallback, useEffect, useState } from 'react'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useForm } from 'react-hook-form'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native'
import * as Yup from 'yup'

import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { InputForm } from '../../components/Form/InputForm'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'
import { useAuth } from '../../hooks/auth'

interface FormData {
  name: string
  amount: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório!'),
  amount: Yup.number()
    .typeError('Informe um valor numérico!')
    .positive('O valor não pode ser negativo!')
    .required('O valor é obrigatório!'),
})

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  const { user } = useAuth()

  const { navigate }: NavigationProp<ParamListBase> = useNavigation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleSelectTransactionType = useCallback(
    (type: 'positive' | 'negative') => {
      setTransactionType(type)
    },
    [],
  )

  const handleCloseSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(false)
  }, [])

  const handleOpenSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(true)
  }, [])

  async function handleRegister(form: Partial<FormData>) {
    if (!transactionType) return Alert.alert('Selecione o tipo da transação')

    if (category.key === 'category')
      return Alert.alert('Selecione uma categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`

      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      const formattedData = [...currentData, newTransaction]

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData))

      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria',
      })
      reset()

      navigate('Listagem')
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível salvar!')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                isActive={transactionType === 'positive'}
                onPress={() => handleSelectTransactionType('positive')}
              />

              <TransactionTypeButton
                title="Outcome"
                type="down"
                isActive={transactionType === 'negative'}
                onPress={() => handleSelectTransactionType('negative')}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
