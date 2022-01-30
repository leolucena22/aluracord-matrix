import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import React from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import appConfig from '../config.json'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ2OTczOSwiZXhwIjoxOTU5MDQ1NzM5fQ.uuUSGd1JZB7I1BHxZZRtDbf7vxDKgkd_Oqqk4FOcoNM'

const SUPABASE_URL = 'https://owigcsyzerigvhgkmhuc.supabase.co'

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', respostaLive => {
      adicionaMensagem(respostaLive.new)
    })
    .subscribe()
}

export default function ChatPage() {
  // Sua lógica vai aqui
  const roteamente = useRouter()
  const usuarioLogado = roteamente.query.username
  const [mensagem, setMensagem] = React.useState('')
  const [listaDeMensagens, setListaDeMensagens] = React.useState([])

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        // console.log('Dados da consulta:', data);
        setListaDeMensagens(data)
      })

    const subscription = escutaMensagensEmTempoReal(novaMensagem => {
      console.log('Nova mensagem:', novaMensagem)
      console.log('listaDeMensagens:', listaDeMensagens)
      // Quero reusar um valor de referencia (objeto/array)
      // Passar uma função pro setState

      // setListaDeMensagens([
      //     novaMensagem,
      //     ...listaDeMensagens
      // ])
      setListaDeMensagens(valorAtualDaLista => {
        console.log('valorAtualDaLista:', valorAtualDaLista)
        return [novaMensagem, ...valorAtualDaLista]
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // ./Sua lógica vai aqui
  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      // id: listaDeMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem
    }

    supabaseClient
      .from('mensagens')
      .insert([
        // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
        mensagem
      ])
      .then(({ data }) => {
        console.log('Criando mensagem: ', data)
      })

    setMensagem('')
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://lh3.googleusercontent.com/pw/AM-JKLXD6TcsjZl5iUlxHV_CcGjMR6zWoX2cl5iYfss1i-EN3QcDQZj-aXnet-0OOO_DhTgto0iIhs0aDnXltg0NhgSeqrG1_3wQwosY8wDDGH6jT8HhnpKqqnJaAeV-l6US9a_u8KjGx9D27v4qSovVlBRUpA=w1158-h652-no?authuser=0)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '15px',
          // backgroundColor: appConfig.theme.colors.neutrals[700],
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          height: '100%',
          maxWidth: '80%',
          maxHeight: '75vh',
          padding: '32px'
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '15px',
            padding: '16px'
          }}
        >
          <MessageList mensagens={listaDeMensagens} />

          {/* {listaDeMensagens.map(mensagemAtual => {
            console.log(mensagemAtual)
            return (
              <li key={mensagemAtual.id}>
                {mensagemAtual.de}: {mensagemAtual.texto}
              </li>
            )
          })} */}

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              value={mensagem}
              onChange={event => {
                const valor = event.target.value
                setMensagem(valor)
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleNovaMensagem(mensagem)
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200]
              }}
            />
            {/* CallBack */}
            <ButtonSendSticker
              onStickerClick={sticker => {
                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                handleNovaMensagem(':sticker: ' + sticker)
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          iconName="github"
          colorVariant="light"
          ButtonColorValues="green"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  //console.log(props)
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px'
      }}
    >
      {props.mensagens.map(mensagem => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700]
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px'
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px'
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300]
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {/* {mensagem.texto.startsWith(':sticker:').toString()} */}

            {mensagem.texto.startsWith(':sticker:') ? (
              <Image
                width="100px"
                height="100px"
                src={mensagem.texto.replace(':sticker:', '')}
              />
            ) : (
              mensagem.texto
            )}

            {/* {mensagem.texto} */}
          </Text>
        )
      })}
    </Box>
  )
}
