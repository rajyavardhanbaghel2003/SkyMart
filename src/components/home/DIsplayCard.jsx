import React from 'react'

const DIsplayCard = ({card}) => {
    
    return (
        <div className="bg-[#111] border border-white/80 rounded-3xl p-6 flex items-start gap-4">
            <div className={`w-8 h-8 p-2 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${card.iconStyle}`}>
                {card.svg}
            </div>
            <div>
                <p className="font-heading font-bold text-xl md:text-2xl text-white">{card.heroText}</p>
                <p className="text-white/50 text-sm font-body">{card.text1}</p>
                <p className="text-white/25 text-xs font-body mt-0.5">{card.text2}</p>
            </div>
        </div>
    )
}

export default DIsplayCard
