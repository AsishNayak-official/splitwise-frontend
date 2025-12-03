import GroupDashboard from '@/components/group/GroupDashboard'
import React from 'react'

interface GroupPageProps {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: GroupPageProps) => {
    const { id } = await params;
  return (
    <GroupDashboard groupId={id}/>
  )
}

export default page