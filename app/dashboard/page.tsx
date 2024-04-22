import { onBoardOauthUser } from '@/actions/auth'

const Dashboard = async () => {
  await onBoardOauthUser()
}

export default Dashboard
