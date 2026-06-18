import { Star } from 'lucide-react'
import React from 'react'

const InfoCard = ({card}) => {
  return (
    <div className='bg-card border border-border rounded-2xl p-5 flex flex-col text-center justify-center items-center '>
        <div className='text-primary'>{card.icon} </div>
        <p className='font-heading font-bold text-2xl '>{card.text1} </p>
        <p class="text-muted text-xs mt-1">{card.text2}</p>
    </div>
  )
}

export default InfoCard
