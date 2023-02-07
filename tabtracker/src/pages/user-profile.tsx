import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import type { FormEventHandler } from 'react'
import { useState } from 'react'
import { Layout } from '../components/layout/layout'
import { api } from '../utils/api'

const UserProfilePage: NextPage = () => {
  return (
    <Layout>
      <h1>Profile</h1>
    </Layout>
  )
}

export default UserProfilePage
