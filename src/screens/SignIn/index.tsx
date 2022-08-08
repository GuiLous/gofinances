import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { useAuth } from '../../hooks/auth'
import { SignInSocialButton } from '../../components/SignInSocialButton'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles'

export function SignIn() {
  const { user } = useAuth()

  console.log(user)
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça login com {'\n'}
          umas das formas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Login com o Google" svg={GoogleSvg} />
          <SignInSocialButton title="Login com a Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
