import { Zap } from 'lucide-react'
import React from 'react'

const Left = () => {
    return (
        <div className="hidden lg:flex flex-col w-1/2 bg-[#111] border-r border-border p-12 relative overflow-hidden">
            <div className='absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none'></div>

            <div className='absolute bottom-1/4 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none'></div>

            <div className='flex items-center gap-3 relative z-10'>
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                    <Zap className='text-bg fill-bg w-4.5' />
                </div>
                <span className='font-heading font-bold text-2xl'>
                    Sky
                    <span className='text-primary'>Mart</span>
                </span>
            </div>

            <div className='flex-1 flex flex-col justify-center relative z-10'>
                <p class="text-primary text-sm font-medium mb-4 tracking-widest uppercase">Welcome back</p>

                <h1 class="font-heading font-bold text-5xl leading-tight mb-6">Shop the future.
                    <br />
                    <span class="text-primary">Today.</span>
                </h1>

                <p class="text-muted max-w-sm leading-relaxed">Thousands of products, lightning-fast delivery, and prices that make your wallet happy.</p>
            </div>
            <div className='grid grid-cols-3 gap-4 mt-12'>
                <FeatureCard heading={"20K+"} desc={"Products"} />
                <FeatureCard heading={"50K+"} desc={"Users"} />
                <FeatureCard heading={"4.9★"} desc={"Rating"} />
            </div>
        </div>
    )
}

const FeatureCard = ({ heading, desc }) => {
    return <div className='bg-card border border-border/50 rounded-2xl p-4 text-center'>
        <div className='font-heading font-bold text-xl text-primary'>{heading} </div>
        <div className='text-muted text-xs mt-1'>{desc}</div>
    </div>
}

export default Left
