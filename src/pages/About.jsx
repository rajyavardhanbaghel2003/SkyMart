import React from 'react'
import InfoCard from '../components/about/InfoCard'
import { Package, ShieldCheck, Star, Truck, Users, Zap } from 'lucide-react'

const cardData = [
  {
    icon: <Package />,
    text1: "20k+",
    text2: "Products"
  },
  {
    icon: <Users />,
    text1: "50k+",
    text2: "Happy customers"
  },
  {
    icon: <Star />,
    text1: "4.9",
    text2: "Avg Rating"
  },
  {
    icon: <Truck />,
    text1: "99%",
    text2: "Ontime Delivery"
  },
]

const About = () => {
  return (
    <div className='w-full justify-center items-center flex p-2'>
      <div className='w-full flex flex-col gap-8 '>
        <section className='w-full flex flex-col justify-center items-center gap-10'>

          <div className='w-full flex flex-col justify-center'>
            <div className='w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce '>
              <Zap className='w-7 h-7 text-[#0d0d0d] fill-[#0d0d0d]' />

            </div>

            <div className='flex justify-center flex-col items-center text-center'>
              <h1 className='font-heading font-bold text-4xl sm:text-5xl mb-5'>About <span className='text-primary'>SkyMart</span></h1>
              <p className='text-muted font-body text-lg max-w-2xl mx-auto leading-relaxed'>SkyMart is a next-generation e-commerce platform built to make online shopping fast, fair, and enjoyable — for everyone.</p>
            </div>
          </div>

          <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-5 md:px-25 py-5 '>
            {cardData.map((card) => <InfoCard card={card} />)}
          </div>
        </section>

        <section className='w-full md:p-10 flex flex-col gap-10'>
          {/* Our Story Section */}
          <div className="max-w-5xl w-full bg-card border border-border rounded-[2.5rem] p-8 md:p-12 flex justify-start flex-col">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-white">
              Our Story
            </h2>
            <div className="space-y-6 text-muted leading-relaxed text-sm md:text-base">
              <p>
                SkyMart started in 2022 as a small side project — two engineers tired of bloated, slow e-commerce experiences. 
                We asked ourselves: what if shopping online was actually <span className="italic">enjoyable</span>? 
              </p>
              <p>
                Three years later, SkyMart serves over 50,000 customers across the country.
                We stock electronics, fashion, jewelry, and everyday essentials — all at prices that don't require a second mortgage. 
              </p>
              <p>
                We're still the same team at heart: obsessed with speed, transparency, and making you feel good about every purchase you make here. 
              </p>
            </div>
          </div>

          {/* What We Stand For Section */}
          <div className="max-w-5xl w-full">
            <h2 className="font-heading text-3xl md:text-2xl font-bold pb-5 text-center text-white">
              What We Stand For
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trust Card */}
              <ValueCard
                icon={<ShieldCheck size={20} className="text-primary" />}
                title="Trust"
                description="Every product is verified for quality and authenticity before listing."
              />

              {/* Speed Card */}
              <ValueCard
                icon={<Zap size={20} className="text-primary" />}
                title="Speed"
                description="We obsess over delivery times so your orders arrive when promised."
              />

              {/* Community Card */}
              <ValueCard
                icon={<Users size={20} className="text-primary" />}
                title="Community"
                description="Built around real customer feedback, not just business metrics."
              />

              {/* Quality Card */}
              <ValueCard
                icon={<Star size={20} className="text-primary" />}
                title="Quality"
                description="We curate the best — no filler, no junk, just great products."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const ValueCard = ({ icon, title, description }) => (
  <div className="flex gap-5 bg-card border border-border rounded-3xl p-8 hover:border-primary/40 transition-colors duration-300">
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="font-heading text-xl font-bold text-white tracking-wide">
        {title}
      </h3>
      <p className="text-muted text-sm leading-snug">
        {description}
      </p>
    </div>
  </div>
);

export default About
