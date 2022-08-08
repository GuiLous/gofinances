import React, { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { VictoryPie } from 'victory-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { RFValue } from 'react-native-responsive-fontsize'
import { addMonths, format, subMonths } from 'date-fns'

import { HistoryCard } from '../../components/HistoryCard'
import { TransactionData } from '../../components/TransactionCard'
import { categories } from '../../utils/categories'

import theme from '../../global/styles/theme'

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles'
import { ptBR } from 'date-fns/locale'
import { LoadContainer } from '../Dashboard/styles'
import { ActivityIndicator } from 'react-native'

interface TotalByCategoryData {
  key: string
  name: string
  total: number
  totalFormatted: string
  color: string
  percent: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<
    TotalByCategoryData[]
  >([])

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)
    }
  }

  async function loadTransactions() {
    setIsLoading(true)

    const dataKey = '@gofinances:transactions'

    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expenses = responseFormatted.filter(
      (expense: TransactionData) =>
        expense.type === 'negative' &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear(),
    )

    const expensesTotal = expenses.reduce(
      (acm: number, expense: TransactionData) => {
        return acm + Number(expense.amount)
      },
      0,
    )

    const totalByCategory: TotalByCategoryData[] = []

    categories.forEach((category) => {
      let categorySum = 0

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount)
        }
      })

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const percent = `${((categorySum / expensesTotal) * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          totalFormatted,
          total: categorySum,
          percent,
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, [selectedDate]),
  )

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        {isLoading ? (
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadContainer>
        ) : (
          <>
            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                x="percent"
                y="total"
                colorScale={totalByCategories.map((category) => category.color)}
                labelRadius={100}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape,
                  },
                }}
              />
            </ChartContainer>
            {totalByCategories?.map((item) => (
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            ))}
          </>
        )}
      </Content>
    </Container>
  )
}
