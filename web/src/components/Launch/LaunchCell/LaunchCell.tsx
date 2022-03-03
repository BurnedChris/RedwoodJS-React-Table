import type { FindLaunchId } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Launch from 'src/components/Launch/Launch/Launch'

export const QUERY = gql`
  query FindLaunchId($id: String!) {
    launch(id: $id) {
      id
      name
      launchpad
      net
      links {
        youtube_id
        wikipedia
        presskit
        reddit {
          media
          campaign
          launch
          recovery
        }
        patch {
          small
          large
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserExample not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ launch }: CellSuccessProps<FindLaunchId>) => {
  return <Launch launch={launch} />
}
