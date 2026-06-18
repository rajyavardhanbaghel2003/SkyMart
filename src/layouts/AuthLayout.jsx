import { Zap } from 'lucide-react'
import React from 'react'
import Left from '../components/auth/Left'
import LoginForm from '../components/auth/LoginForm'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner'

const AuthLayout = () => {
    return (
        <div className='min-h-screen bg-bg flex'>
            <Toaster position="bottom-right" theme="dark" richColors closeButton />

            <Left />

            <div className='flex-1 flex items-center justify-center p-6'>
                <div className='w-full max-w-md '>
                    <div className='lg:hidden flex items-center gap-2 mb-8 justify-center '>
                        <div className='w-9 h-9 bg-primary rounded-xl flex items-center justify-center'>
                            <Zap className='w-4 text-bg fill-bg' />
                        </div>
                        <span className="font-heading font-bold text-xl">
                            Sky
                            <span class="text-primary">Mart</span>
                        </span>
                    </div>

                    <Outlet/>

                </div>


            </div>

        </div>
    )
}



export default AuthLayout
