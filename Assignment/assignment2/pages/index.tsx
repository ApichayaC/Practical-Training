import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  useEffect(()=>{
    const route = Router
    route.push('/market-diff')
  })
  return (
    <div>

    </div>
  )
}

export default Home
