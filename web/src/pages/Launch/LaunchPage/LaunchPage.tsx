import LaunchCell from 'src/components/Launch/LaunchCell'

type LauchPageProps = {
  id: string
}

const LauchPage = ({ id }: LauchPageProps) => {
  return <LaunchCell id={id} />
}

export default LauchPage
