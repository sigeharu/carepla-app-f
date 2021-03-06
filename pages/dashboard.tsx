import React, { useState, VFC } from 'react'
import {
  Box,
  Button,
  Stack,
  Text,
  useDisclosure,
  Collapse,
  HStack,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import { DiaryEditFormMemo } from '../components/DiaryEditForm'
import { ScheduleCardListMemo } from '../components/ScheduleCardList'
import { ScheduleEditFormMemo } from '../components/ScheduleEditForm'
import { ScheduleCompletionListMemo } from '../components/ScheduleCompletionList'
import { useQuerySchedule } from '../hooks/useQuerySchedule'
import dayjs from 'dayjs'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../slices/userSlice'
import { PartnerApprovalCheckMemo } from '../components/PartnerApprovalCheck'
import { useQueryApplying } from '../hooks/useQueryApplying'

const Dashboard: VFC = () => {
  const User = useAppSelector(selectUser)
  const { isOpen, onToggle } = useDisclosure()
  const { data } = useQuerySchedule()
  const { data: applying } = useQueryApplying()
  const [openEdit, setOpenEdit] = useState(false)
  const [openIndex, setOpenIndex] = useState(false)
  const now = dayjs()

  const clickOpenCareplaEdit = () => {
    if (openEdit === false) {
      setOpenEdit(true)
    } else {
      setOpenEdit(false)
    }
  }
  const clickOpenCareplaIndex = () => {
    if (openIndex === false) {
      setOpenIndex(true)
    } else {
      setOpenIndex(false)
    }
  }

  const completionCount = data?.filter(
    (schedule) =>
      now.isSame(schedule.schedule_date, 'day') &&
      schedule.user_id === User?.id &&
      schedule.completion === true &&
      schedule
  )
  const partnerApprovalPresent = () => {
    console.log(applying)
    if (applying?.length) {
      return <PartnerApprovalCheckMemo />
    }
  }

  return (
    <Box>
      {partnerApprovalPresent()}
      <Box
        bgGradient="radial(orange.100,orange.200,orange.300)"
        p={2}
        borderRadius="md"
        shadow="md"
        autoFocus
      >
        <Stack spacing={2} py={2}>
          <Box>
            <Text className="font-bold mb-2">??????????????????...</Text>
            <ScheduleCardListMemo />
          </Box>
        </Stack>
        <Text className="font-bold my-2">??????????????????</Text>

        <Box>
          <HStack>
            <Button onClick={clickOpenCareplaIndex}>
              {openIndex === true ? '?????????' : '??????'}
            </Button>
            <Spacer />
            <Box p={2} bg="purple.600" rounded="md" shadow="md">
              <Text className="text-white" fontSize="sm">
                ??????????????????
              </Text>
              <Text className="text-white font-bold text-center">
                {completionCount?.length}??????
              </Text>
            </Box>
          </HStack>
          <Stack>
            <Collapse in={openIndex} animateOpacity>
              <Box mt="2" rounded="md" shadow="md">
                <ScheduleCompletionListMemo />
              </Box>
            </Collapse>
          </Stack>
        </Box>
      </Box>
      <Stack mt={4}>
        <Box
          bgGradient="radial(teal.400,teal.500,teal.600)"
          p={2}
          borderRadius="md"
          shadow="md"
        >
          <Text className="text-white font-bold my-2">?????????????????????</Text>
          <Button onClick={onToggle}>
            {isOpen === true ? '?????????' : '??????'}
          </Button>
          <Collapse in={isOpen} animateOpacity>
            <Box mt="2" rounded="md" shadow="md">
              <DiaryEditFormMemo />
            </Box>
          </Collapse>
        </Box>
      </Stack>
      <Stack mt={4}>
        <Box
          bgGradient="radial(purple.400,purple.500,purple.600)"
          p={2}
          borderRadius="md"
          shadow="md"
        >
          <Text className="text-white font-bold my-2">??????????????????</Text>
          <Button onClick={clickOpenCareplaEdit}>
            {openEdit === true ? '?????????' : '??????'}
          </Button>
          <Collapse in={openEdit} animateOpacity>
            <Box mt="2" rounded="md" shadow="md">
              <ScheduleEditFormMemo />
            </Box>
          </Collapse>
        </Box>
      </Stack>
    </Box>
  )
}
export default Dashboard
