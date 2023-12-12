'use client'
import { Status } from '.prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const statusList: { label: string, value: Status }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },

]

const IssueStatusFilter = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder='Filter by status' />
            <Select.Content>
                <Select.Item value={'all'}>
                    All
                </Select.Item>
                {statusList.map(status => (
                    <Select.Item key={status.value} value={status.value}>
                        {status.label}
                    </Select.Item>
                ))}

            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter