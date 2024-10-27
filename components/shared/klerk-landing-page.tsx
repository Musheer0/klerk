'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Database, Key, LayoutTemplate, Lock, Repeat, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ModeToggle } from './theme-togler'
import SignInDisplay from '../auth/display/sigin-display'
import AuthCard from '../auth/auth-card'

const logos = [
  { src: "/placeholder.svg?text=Auth.js", alt: "Auth.js" },
  { src: "/placeholder.svg?text=shadcn/ui", alt: "shadcn/ui" },
  { src: "/placeholder.svg?text=Next.js", alt: "Next.js" },
  { src: "/placeholder.svg?text=Prisma", alt: "Prisma" },
  { src: "/placeholder.svg?text=JWT", alt: "JWT" },
]

export function KlerkLandingPageComponent() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const scrollAnimation = () => {
      setScrollPosition((prevPosition) => (prevPosition + 1) % (logos.length * 200))
    }

    const intervalId = setInterval(scrollAnimation, 50)

    return () => clearInterval(intervalId)
  }, [])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Lock className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold text-xl">Klerk</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#docs">
            Docs
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/sign-in">
            Sign-in
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-4 lg:py-2 xl:py-8">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Authentication Made Simple
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Klerk provides a powerful authentication boilerplate for Next.js, built on top of NextAuth, Resend, and shadcn/ui.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Get Started</Button>
                  <Button size="lg" variant="outline">Documentation</Button>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
              >
               <AuthCard className='p-0 pt-0 '
                   footerLink={
                    <>
                      <p className='text-sm py-3 text-muted-foreground'>Don&apos;t have an account? <Link href={'/sign-up'}><span className='text-primary font-semibold hover:underline hover:text-primary/80 cursor-pointer'>Sign up</span></Link></p>
                    </>
                  }
                  showcase
                  title=''
                  description=''
                  showSocialButton={false}
               >
               <SignInDisplay/>
               </AuthCard>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
            >
              Trusted Technologies
            </motion.h2>
            <div className="overflow-hidden">
              <div className="flex" style={{ transform: `translateX(-${scrollPosition}px)` }}>
                {[...logos, ...logos].map((logo, index) => (
                  <div key={index} className="flex-shrink-0 mx-12">
                    <Image src={logo.src} alt={logo.alt} width={150} height={50} className="opacity-80" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
            >
              Features
            </motion.h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                { icon: LayoutTemplate, title: "Pre-built Components", description: "Ready-to-use authentication UI components to speed up your development." },
                { icon: Zap, title: "Server Actions", description: "Seamless integration with Next.js server actions for secure operations." },
                { icon: Database, title: "Database Connectivity", description: "Connect to MySQL, MongoDB, PostgreSQL, and all databases supported by Prisma." },
                { icon: Key, title: "Full Customization", description: "Tailor the authentication flow and UI to match your project's specific needs." },
                { icon: Repeat, title: "Cron Jobs", description: "Automated cleanup of unused tokens to keep your database lean and efficient." },
                { icon: Lock, title: "Built-in Middleware", description: "Robust middleware for route protection and enhanced security." },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUpVariants}
                >
                  <Card className="group transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                    <CardContent className="p-6">
                      <feature.icon className="h-10 w-10 mb-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-500">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 items-center">
              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Built-in Admin Dashboard</h2>
                <p className="text-gray-500 md:text-xl">
                  Take control of your authentication system with our intuitive and feature-rich admin dashboard.
                </p>
                <ModeToggle/>
                <ul className="grid gap-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>User management and role assignment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Real-time analytics and usage statistics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Security settings and access control</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Customizable reports and exports</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
              >
                <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                  <CardHeader>
                    <CardTitle>Admin Dashboard Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <Lock className="h-16 w-16 text-gray-400 transition-transform duration-300 hover:scale-110" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
            >
              Pricing
            </motion.h2>
            <div className="flex justify-center w-full">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                className='w-full'
              >
                <Card className="w-full  transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                  <CardHeader>
                    <CardTitle className="text-2xl">Lifetime Free</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-4">$0</div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="text-primary mr-2 h-5 w-5" />
                        All features included
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="text-primary mr-2 h-5 w-5" />
                        Unlimited projects
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="text-primary mr-2 h-5 w-5" />
                        Community support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="text-primary mr-2 h-5 w-5" />
                        Regular updates
                      </li>
                    </ul>
                    <Button className="w-full">Get Started for Free</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 Klerk. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}