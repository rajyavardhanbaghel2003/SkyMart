import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useUser } from '../context/UserContext'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { toast } from 'sonner'

const Register = () => {
    const {  registerUser } = useUser();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onChange" 
    });

    const getStrength = (password) => {
        let score = 1;
        if (!password) return score;
        if (password.length >= 6) score++;
        if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };

    const password = watch("password", "");
    const strength = getStrength(password);

    const strengthMeta = [
        { label: "Weak", color: "bg-red-500", text: "text-red-500" },
        { label: "Medium", color: "bg-orange-500", text: "text-orange-500" },
        { label: "Strong", color: "bg-primary", text: "text-primary" },
    ];

    const passwordFieldValue = watch("password");

    const handleFormSubmit = (data) => {

        const firstLetter = data.name ? data.name.charAt(0).toUpperCase() : 'U';

        registerUser({
            name: data.name,
            email: data.email,
            password: data.password,
            joinedAt: Date.now(),
            id: nanoid(),
            avatar: firstLetter
        });
        toast.success("Account created! Welcome to SkyMart 🎉")
        reset()
        navigate("/")
    };

    return (
        <div className='bg-card/60 border border-border/30 p-8 rounded-3xl shadow-md shadow-black font-main'>
            <h2 className='font-heading font-bold text-2xl mb-1 text-white text-center'>
                Create Account
            </h2>
            <p className='text-muted text-center text-sm mb-8'>
                Join the next-generation shopping experience 
            </p>

            <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>

                <div>
                    <div className="relative">
                        <User className='absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50 w-4' />
                        <input
                            {...register("name", {
                                required: "Please enter your full name",
                                minLength: { value: 3, message: "Name too short" }
                            })}
                            type="text"
                            placeholder="Full name"
                            className="pl-10 rounded-xl border border-border/40 bg-white/5 w-full py-3 text-sm text-white outline-none focus:border-primary transition-all"
                        />
                    </div>
                    {errors.name && <p className='text-red-500 text-[10px] mt-1 ml-2'>{errors.name.message}</p>}
                </div>

                <div>
                    <div className="relative">
                        <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50 w-4' />
                        <input
                            {...register("email", {
                                required: "Email address is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Please enter a valid email format"
                                }
                            })}
                            type="text" 
                            placeholder="Email address"
                            className="pl-10 rounded-xl border border-border/40 bg-white/5 w-full py-3 text-sm text-white outline-none focus:border-primary transition-all"
                        />
                    </div>
                    {errors.email && <p className='text-red-500 text-[10px] mt-1 ml-2'>{errors.email.message}</p>}
                </div>

                <div>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50 w-4" />
                        <input
                            {...register("password", { required: "Password is required" })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="pl-10 pr-10 rounded-full border border-border/40 bg-white/5 w-full py-3 text-sm text-white outline-none focus:border-primary transition-all"
                        />

                        <button
                            type="button"  submit the form
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors cursor-pointer"
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {password && (
                        <div className="mt-3 px-1">
                            <div className="flex gap-2 h-1 mb-2">
                                {[0, 1, 2].map((step) => (
                                    <div
                                        key={step}
                                        className={`h-full flex-1 rounded-full transition-all duration-500 ${strength > step
                                                ? strengthMeta[strength - 1].color
                                                : "bg-white/10"
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-end">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${strengthMeta[strength - 1]?.text}`}>
                                    {strengthMeta[strength - 1]?.label}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <div className="relative">
                        <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50 w-4' />
                        <input
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === passwordFieldValue || "Passwords do not match"
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="pl-10 rounded-xl border border-border/40 bg-white/5 w-full py-3 text-sm text-white outline-none focus:border-primary transition-all"
                        />
                    </div>
                    {errors.confirmPassword && <p className='text-red-500 text-[10px] mt-1 ml-2'>{errors.confirmPassword.message}</p>}
                </div>

                <button
                    type="submit"
                    className='bg-primary w-full flex items-center justify-center gap-2 py-3.5 mt-4 font-heading font-bold rounded-2xl text-bg hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer'
                >
                    Sign up
                    <ArrowRight className='w-5' />
                </button>

                <p className='text-center text-white/30 text-xs mt-6'>
                    Already have an account?
                    <NavLink className="text-primary hover:underline ml-1 font-semibold" to="/login">Sign in</NavLink>
                </p>
            </form>
        </div>
    )
}

export default Register