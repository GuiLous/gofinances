import React from 'react';

import {HighlightCard} from '../../components/HighlightCard';
import { TransactionCard, TransactionData} from '../../components/TransactionCard';


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
  TransactionsList
} from './styles'

export interface DataListProps extends TransactionData {
  id: string;
}

export function Dashboard() {

  const data: DataListProps[] = [
    {
      id: '1',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      date: "20/02/2021",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      },
      type: "positive"
    },
    {
      id: '2',
      title: "Hamburgueria Pizza",
      amount: "R$ 59,00",
      date: "20/02/2021",
      category: {
        name: "Alimentação",
        icon: "coffee"
      },
      type: "negative"
    },
    {
      id: '3',
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      date: "20/02/2021",
      category: {
        name: "Casa",
        icon: "home"
      },
      type: "negative"
    },
  ]
  
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://avatars.githubusercontent.com/u/61069251?v=4" }} />

            <User>
              <UserGreeting>Ola, </UserGreeting>
              <UserName>Guilherme</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>    
      </Header>

      <HighlightCards
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 24}}
      >
        <HighlightCard 
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard 
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard 
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />

      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item}/>}
        />
      </Transactions>
    </Container>
  )
}
