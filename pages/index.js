import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react'
import { useRouter } from 'next/router'
import appConfig from '../config.json'

function Titulo(props) {
  console.log(props)
  const Tag = props.tag || 'h1'
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
          ${Tag} {
            color: ${appConfig.theme.colors.neutrals['000']};
            font-size: 24px;
            font-weight: 600;
            padding-bottom: 20px;
          }
        `}
      </style>
    </>
  )
}

// Componente React
// function HomePage() {
//   //JSX
//   return (
//     <div>
//       <GlobalStyle></GlobalStyle>
//       <Titulo tag="h2">Boas vindas de volta!</Titulo>
//       <h2>Discord - Alura Matrix</h2>
//     </div>
//   )
// }

// export default HomePage

export default function PaginaInicial() {
  //const username = 'leolucena22'
  const [username, setUsername] = React.useState('leolucena22')
  const roteamente = useRouter()

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            'url(https://lh3.googleusercontent.com/pw/AM-JKLXD6TcsjZl5iUlxHV_CcGjMR6zWoX2cl5iYfss1i-EN3QcDQZj-aXnet-0OOO_DhTgto0iIhs0aDnXltg0NhgSeqrG1_3wQwosY8wDDGH6jT8HhnpKqqnJaAeV-l6US9a_u8KjGx9D27v4qSovVlBRUpA=w1158-h652-no?authuser=0)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply'
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            // backgroundColor: appConfig.theme.colors.neutrals[800]
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault() //remove o comportamento padrão do site (redirecionar para outra página quando submete um form)
              console.log('Alguém submeteu o form')
              roteamente.push(`/chat?username=${username}`) //Forma de fazer roteamento de páginas com o next
              //window.location.href = '/chat' //Forma tradicional de fazer redirecionamente de páginas em JS
            }}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px'
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {appConfig.name}
            </Text>

            {/* <input
              type="text"
              value={username}
              onChange={function (event) {
                console.log('Usurário digitou', event.target.value)
                //Onde está o valor
                const valor = event.target.value
                //Trocar o valor da variável através do React e avisa quem precisa
                setUsername(valor)
              }}
            /> */}

            <TextField
              value={username}
              onChange={function (event) {
                console.log('Usurário digitou', event.target.value)
                //Onde está o valor
                const valor = event.target.value
                //Trocar o valor da variável através do React e avisa quem precisa
                setUsername(valor)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[500],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  // backgroundColor: appConfig.theme.colors.neutrals[800]
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }
              }}
            />

            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600]
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              borderColor: appConfig.theme.colors.neutrals[800],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px'
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                boxShadow: '5px 5px 10px #000000'
              }}
              src={`https://github.com/${username}.png`}
            />

            {username && (
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            )}
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  )
}
