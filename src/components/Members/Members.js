import React from 'react'
import MembersGrid from './MembersGrid/MembersGrid'
import MembersJoinUs from './MembersJoinUs/MembersJoinUs'
import HeaderBanner from '../Shared/HeaderBanner/HeaderBanner'
import MembersValues from './MembersValues/MembersValues'

function Members() {
  const headerTitle = 'Members'
  const headerMainText = ['RoBorrego’s community is made by students with different skills in robotics, logistics and networking, all joined with a passion for exploring new technologies and sharing their knowledge with everybody.']
  const headerSubText = ['Scroll down and meet us!']

  return (
    <>
      <HeaderBanner
        title={headerTitle}
        mainText={headerMainText}
        subText={headerSubText}
      />
      <MembersValues />
      <MembersGrid />
      <MembersJoinUs />
    </>
  )
}

export default Members
