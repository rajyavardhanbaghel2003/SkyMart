import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useUser } from '../context/UserContext'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const LoginForm = () => {
    const { login } = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    
    // 1. State to manage password visibility
    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = (data) => {
        const success = login(data.email, data.password)
        if (!success) {
            toast.error("Invalid credentials. Please check your email and password.")
        } else {
            toast.success(`Welcome back! 👋`)
            navigate("/");
        }
    }

    return (
        <div className='bg-card/60 border border-border/30 p-8 rounded-3xl shadow-md shadow-black '>
            <h2 className='font-heading font-bold text-2xl mb-1'>
                Sign in
            </h2>
            <p className='text-muted text-sm mb-8'>
                Enter your credentials to continue
            </p>

            <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
                <div>
                    <div className="relative">
                        <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50 w-4' />
                        <input
                            {...register("email", { required: "Email is Required" })}
                            type="email"
                            placeholder="Email address"
                            className="pl-10 rounded-xl border border-border/40 bg-white/5 w-full py-3 text-sm outline-none focus:border-primary "
                        />
                    </div>
                    {errors.email && <p className='text-red-500 text-xs my-1.5 mx-2'>{errors.email.message}</p>}
                </div>

                <div>
                    <div className="relative">
                        <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50 w-4' />
                        <input
                            {...register("password", { required: "Password is Required" })}
                            // 2. Dynamic type based on showPassword state
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="pl-10 pr-12 rounded-xl border border-border/40 bg-white/5 w-full py-3 text-sm outline-none focus:border-primary " 
                        />

                        {/* 3. Toggle Button */}
                        <button
                            type='button' // CRITICAL: Changed from 'submit' to 'button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors cursor-pointer'
                        >
                            {showPassword ? <EyeOff className='w-4' /> : <Eye className='w-4' />}
                        </button>
                    </div>
                    {errors.password && <p className='text-red-500 text-xs mx-2 my-1.5'>{errors.password.message}</p>}
                </div>

                <button 
                    type="submit"
                    className='bg-primary w-full flex items-center justify-center gap-2 py-3.5 mt-2 font-heading font-bold rounded-2xl text-bg hover:bg-buttonHover cursor-pointer transition-all active:scale-[0.98]'
                >
                    Sign in
                    <ArrowRight className='w-5' />
                </button>

                <p className='text-center text-white/30 text-sm font-body mt-6'>
                    Don't have an account?
                    <NavLink className="text-primary hover:text-buttonHover font-semibold transition-colors ml-1" to="/register">Create one</NavLink>
                </p>
            </form>
        </div>
    )
}

export default LoginForm