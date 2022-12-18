import React from 'react'

import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-identicon-sprites'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Container,
  Loader,
  Stack,
  Table,
  Title,
  Text,
} from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { generatePath } from 'react-router-dom'

import {
  getChats,
  deleteAllChats,
  deleteChat,
} from '../../services/api/models/chat/ChatApi'

const Chats = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['chats'],
    queryFn: getChats,
  })

  const deleteAll = useMutation(deleteAllChats, {
    onSuccess(response) {
      if (response.meta.result == 'OK') {
        queryClient.invalidateQueries(['chats'])
      }
    },
  })

  const deleteOneChat = useMutation(deleteChat, {
    onSuccess(response) {
      if (response.meta.result == 'OK') {
        queryClient.invalidateQueries(['chats'])
      }
    },
  })

  if (isLoading) {
    return (
      <Center sx={{ height: '100%', width: '100wh' }}>
        <Loader color="gray" size="xl" />
      </Center>
    )
  }

  const openModal = () =>
    openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to delete all conversations?. Please click one
          of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => deleteAll.mutate(),
    })

  const openDeleteChatModal = (receiverId: number) =>
    openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to delete this conversation?. Please click one
          of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => deleteOneChat.mutate({ receiverId: receiverId }),
    })

  const rows = data?.data.map(user => (
    <tr key={user.id}>
      <td width={60}>
        <Avatar
          radius="xl"
          size="lg"
          src={createAvatar(style, {
            seed: user.id.toString(),
            dataUri: true,
          })}
          sx={{ cursor: 'pointer', border: '1px solid lightgray' }}
          onClick={() =>
            (location.href = generatePath('/ChatPanel/:id', {
              id: user.id.toString(),
            }))
          }
        />
      </td>
      <td
        style={{ cursor: 'pointer' }}
        onClick={() =>
          (location.href = generatePath('/ChatPanel/:id', {
            id: user.id.toString(),
          }))
        }
      >
        <Text size="lg" color="#6B0000">
          {user.name + ' ' + user.surname}
        </Text>
      </td>
      <td width={20}>
        <ActionIcon variant="transparent">
          <FontAwesomeIcon
            icon={faTrash}
            size="lg"
            style={{ color: '#7E2020' }}
            onClick={() => openDeleteChatModal(user.id)}
          />
        </ActionIcon>
      </td>
    </tr>
  ))

  return (
    <Container size="xs" sx={{ height: '100%' }}>
      <Stack justify="flex-start" sx={{ height: '100%' }}>
        <Title color="#6B0000" pb="lg">
          Chats
        </Title>
        {data?.data.length === 0 ? (
          <Text color="dimmed" size="xl" align="center" mt="xl" fw={700}>
            No chats were found
          </Text>
        ) : (
          <>
            <Button
              variant="outline"
              color="red"
              compact
              sx={{ alignSelf: 'end' }}
              onClick={openModal}
            >
              Delete all conversations
            </Button>
            <Table>
              <tbody>{rows}</tbody>
            </Table>
          </>
        )}
      </Stack>
    </Container>
  )
}

export default Chats
