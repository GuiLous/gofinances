import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import { HighlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionData,
} from '../../components/TransactionCard'
import theme from '../../global/styles/theme'

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
} from './styles'
import { ActivityIndicator } from 'react-native'

export interface DataListProps extends TransactionData {
  id: string
}

interface HighlightProps {
  amount: string
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expenses: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData,
  )

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative',
  ) {
    const lastTransaction = Math.max.apply(
      Math,
      collection
        .filter((transaction) => transaction.type === type)
        .map((transaction) => new Date(transaction.date).getTime()),
    )

    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
    }).format(new Date(lastTransaction))
  }

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensesTotal = 0

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensesTotal += Number(item.amount)
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const dateFormatted = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date: dateFormatted,
        }
      },
    )

    setData(transactionsFormatted)

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      'positive',
    )

    const lastTransactionExpenses = getLastTransactionDate(
      transactions,
      'negative',
    )

    const totalInterval = `01 a ${lastTransactionExpenses}`

    const total = entriesTotal - expensesTotal

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expenses: {
        amount: expensesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpenses}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    })

    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, []),
  )

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/61069251?v=4',
                  }}
                />

                <User>
                  <UserGreeting>Ola, </UserGreeting>
                  <UserName>Guilherme</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={() => console.log('')}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries?.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expenses?.amount}
              lastTransaction={highlightData.expenses.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total?.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  )
}
