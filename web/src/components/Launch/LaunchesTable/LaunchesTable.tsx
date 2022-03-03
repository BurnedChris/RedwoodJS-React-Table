import type { FindLaunches } from 'types/graphql'
import type { CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import TwTable from 'src/components/Table/subs/TwTable'
import { useCustomQuery } from 'src/libs/ReactQueryProvider'
import { useReducer } from 'react'
import { paginationReducer } from 'src/components/Table/subs/pagenationFetch'
import Table from 'src/components/Table/Table'

export const QUERY = gql`
  query FindLaunches($table: TableInput) {
    launches(table: $table) {
      data {
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
      paginate {
        totalItems
        currentPage
        pages
        pageSize
        totalItems
        totalPages
        startPage
        startIndex
        endPage
        endIndex
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userExamples yet. '}
      <Link to={routes.newUserExample()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

const LaunchesTable = () => {
  const [tableVariables, dispatch] = useReducer(paginationReducer, {
    page: 0,
    limit: 15,
  })

  const { data, error, isLoading, isSuccess } = useCustomQuery(QUERY, {
    variables: {
      table: tableVariables,
      variables: {},
    },
  })

  console.log(data)
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
    ],
    []
  )

  if (error) {
    console.log('ERROR', error)
    return Empty
  }

  if (isLoading) {
    return (
      <>
        <TwTable.table>
          <TwTable.thead>
            <TwTable.tr className="animate-pulse" key="table-header">
              <TwTable.th key="table-header"></TwTable.th>
              {[...Array(7).keys()].map((column, index) => {
                return (
                  <TwTable.th
                    key={`${index}-th`}
                    // key={column.accessor}
                  >
                    <div className="py-0.5 h-4 w-20 bg-gray-300  dark:bg-nord-3 rounded-md"></div>
                  </TwTable.th>
                )
              })}
              <TwTable.th type="empty" key="end-th">
                <div className="py-0.5 float-right h-4 w-20 bg-gray-300  dark:bg-nord-3 rounded-md"></div>
              </TwTable.th>
            </TwTable.tr>
          </TwTable.thead>

          <TwTable.tbody x-max="1">
            {[...Array(tableVariables.limit).keys()].map((_, rowIndex) => (
              <TwTable.tr
                className="animate-pulse"
                key={`${rowIndex}-table-row`}
              >
                <TwTable.td key="empty-td"></TwTable.td>
                {[...Array(7).keys()].map((_, colIndex) => (
                  <TwTable.td key={`${colIndex}-col`}>
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-500 rounded-md my-0.5"></div>
                  </TwTable.td>
                ))}
                <TwTable.td key="end-td">
                  <div className="float-right h-6 w-20 bg-gray-200  dark:bg-gray-500 rounded-md my-0.5"></div>
                </TwTable.td>
              </TwTable.tr>
            ))}
          </TwTable.tbody>
        </TwTable.table>
      </>
    )
  }

  const { launches }: FindLaunches = data

  if (launches?.data.length === 0) {
    return Empty
  }

  return (
    <>
      <Table
        {...{
          // setValue,
          hidePagination: false,
          columns,
          data: launches,
          isSuccess,
          tableVariables,
          dispatch,
          liveModeSwitchRoute: (props) => routes.links(props),
          tableClassName: 'sm:shadow',
        }}
      />
    </>
  )
}

export default LaunchesTable
