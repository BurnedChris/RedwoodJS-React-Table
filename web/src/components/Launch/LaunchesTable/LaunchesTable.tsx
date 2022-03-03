import type { FindLaunches } from 'types/graphql'
import type { CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'
import ReactTooltip from 'react-tooltip'

import TwTable from 'src/components/Table/subs/TwTable'
import { useCustomQuery } from 'src/libs/ReactQueryProvider'
import { ReactElement, useReducer } from 'react'
import { paginationReducer } from 'src/components/Table/subs/pagenationFetch'
import Table from 'src/components/Table/Table'
import clsx from 'clsx'

export const QUERY = gql`
  query FindLaunches($table: TableInput) {
    launches(table: $table) {
      data {
        id
        name
        launchpad
        net
        details
        upcoming
        success
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

export const Loading = ({ tableVariables }): ReactElement => (
  <div className="p-4 mb-4 bg-nord-3 sm:rounded-lg overflow-hidden">
    <TwTable.table>
      <TwTable.thead>
        <TwTable.tr className="animate-pulse" key="table-header">
          <TwTable.th key="table-header"></TwTable.th>
          {[...Array(5).keys()].map((column, index) => {
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
          <TwTable.tr className="animate-pulse" key={`${rowIndex}-table-row`}>
            <TwTable.td key="empty-td"></TwTable.td>
            {[...Array(5).keys()].map((_, colIndex) => (
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
  </div>
)

export const Empty = (): ReactElement => {
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

const RedditIcon = ({ className }: { className?: string }): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    className={clsx('h-6 w-6 text-white', className)}
  >
    <path d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z" />
  </svg>
)

const LaunchesTable = (): ReactElement => {
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Success',
        Cell: ({ row: { original } }) => {
          console.log(original?.success)
          return original?.success ? (
            <div className="flex pl-1">
              <ReactTooltip
                id={original.id + '-success'}
                aria-haspopup="true"
                place="top"
                type="dark"
                effect="solid"
              >
                Lauch was Successful
              </ReactTooltip>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="h-6 w-6 text-green-500 opacity-75"
                data-tip
                data-for={original.id + '-success'}
              >
                <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
              </svg>
            </div>
          ) : (
            <div className="flex pl-1">
              <ReactTooltip
                id={original.id + '-failure'}
                aria-haspopup="true"
                place="top"
                type="dark"
                effect="solid"
              >
                Lauch was Aborted / Failed
              </ReactTooltip>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="h-6 w-6 text-red-500 opacity-75"
                data-tip
                data-for={original.id + '-failure'}
              >
                <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z" />
              </svg>
            </div>
          )
        },
      },
      // {
      //   Header: 'Upcoming',
      //   Cell: ({ row: { original } }) => {
      //     return original?.upcoming ? 'Yes' : 'No'
      //   },
      // },
      {
        Header: 'Details',

        Cell: ({ row: { original } }) => {
          return original?.details
            ? `${original?.details.substring(0, 80)}...`
            : 'No details'
        },
      },
      {
        Header: 'Patch',
        Cell: ({ row: { original } }) => {
          console.log(original.links.patch.large)
          return (
            <div>
              {original.links.patch.small ? (
                <img
                  src={original.links.patch.small}
                  alt={`${original.name} patch`}
                  className="object-cover h-6 w-6"
                />
              ) : (
                'No Patch'
              )}
            </div>
          )
        },
      },
      {
        Header: 'Links',
        Cell: ({ row: { original } }) => {
          return (
            <ul className="space-x-8 flex flex-row justify-end">
              <li>
                <ReactTooltip
                  id={original.id + '-reddit-launch'}
                  aria-haspopup="true"
                  place="top"
                  type="dark"
                  effect="solid"
                >
                  Lauch Reddit Thread
                </ReactTooltip>
                {original?.links?.reddit?.launch ? (
                  <a
                    target="_blank"
                    href={original?.links?.reddit?.launch}
                    rel="noreferrer"
                    data-tip
                    data-for={original.id + '-reddit-launch'}
                  >
                    <span className="sr-only"> Open Reddit </span>
                    <RedditIcon />
                  </a>
                ) : (
                  <div data-tip data-for={original.id + '-reddit-launch'}>
                    <span className="sr-only"> Open Reddit </span>
                    <RedditIcon className="opacity-50 cursor-not-allowed" />
                  </div>
                )}
              </li>
              <li>
                <ReactTooltip
                  id={original.id + '-reddit-campaign'}
                  aria-haspopup="true"
                  place="top"
                  type="dark"
                  effect="solid"
                >
                  Campaign Reddit Thread
                </ReactTooltip>
                {original?.links?.reddit?.campaign ? (
                  <a
                    target="_blank"
                    href={original?.links?.reddit?.campaign}
                    rel="noreferrer"
                    data-tip
                    data-for={original.id + '-reddit-campaign'}
                  >
                    <span className="sr-only"> Open Reddit </span>
                    <RedditIcon />
                  </a>
                ) : (
                  <div data-tip data-for={original.id + '-reddit-campaign'}>
                    <span className="sr-only"> Open Reddit </span>
                    <RedditIcon className="opacity-50 cursor-not-allowed" />
                  </div>
                )}
              </li>
              <li>
                <ReactTooltip
                  id={original.id + '-reddit-media'}
                  aria-haspopup="true"
                  place="top"
                  type="dark"
                  effect="solid"
                >
                  Media Reddit Thread
                </ReactTooltip>
                {original?.links?.reddit?.media ? (
                  <a
                    target="_blank"
                    href={original?.links?.reddit?.media}
                    rel="noreferrer"
                    data-tip
                    data-for={original.id + '-reddit-media'}
                  >
                    <span className="sr-only">Media Reddit Thread</span>
                    <RedditIcon />
                  </a>
                ) : (
                  <div data-tip data-for={original.id + '-reddit-media'}>
                    <span className="sr-only">Media Reddit Thread</span>
                    <RedditIcon className="opacity-50 cursor-not-allowed" />
                  </div>
                )}
              </li>
              <li>
                <ReactTooltip
                  id={original.id + '-reddit-recovery'}
                  aria-haspopup="true"
                  place="top"
                  type="dark"
                  effect="solid"
                >
                  Recovery Reddit Thread
                </ReactTooltip>
                {original?.links?.reddit?.recovery ? (
                  <a
                    target="_blank"
                    href={original?.links?.reddit?.recovery}
                    rel="noreferrer"
                    data-tip
                    data-for={original.id + '-reddit-recovery'}
                  >
                    <span className="sr-only">Open Recovery Reddit Thread</span>
                    <RedditIcon />
                  </a>
                ) : (
                  <div data-tip data-for={original.id + '-reddit-recovery'}>
                    <span className="sr-only">Open Recovery Reddit Thread</span>
                    <RedditIcon className="opacity-50 cursor-not-allowed" />
                  </div>
                )}
              </li>
              <li>
                <ReactTooltip
                  id={original.id + '-youtube'}
                  aria-haspopup="true"
                  place="top"
                  type="dark"
                  effect="solid"
                >
                  Youtube Video
                </ReactTooltip>
                {original.links.youtube_id ? (
                  <a
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${original.links.youtube_id}`}
                    rel="noreferrer"
                    data-tip
                    data-for={original.id + '-youtube'}
                  >
                    <span className="sr-only">Open Youtube</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="h-6 w-6 text-white"
                      fill="currentColor"
                    >
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                  </a>
                ) : (
                  <div data-tip data-for={original.id + '-youtube'}>
                    <span className="sr-only">Open Youtube</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="h-6 w-6 text-white opacity-50 cursor-not-allowed"
                      fill="currentColor"
                    >
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                  </div>
                )}
              </li>
              <li>
                <ReactTooltip
                  id={original.id + '-wikipida'}
                  aria-haspopup="true"
                  place="top"
                  type="dark"
                  effect="solid"
                >
                  Wikipida Article
                </ReactTooltip>
                {original.links.wikipedia ? (
                  <a
                    target="_blank"
                    href={original.links.wikipedia}
                    rel="noreferrer"
                    data-tip
                    data-for={original.id + '-wikipida'}
                  >
                    <span className="sr-only">Open Wikipida</span>
                    <svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="h-6 w-6 text-white"
                    >
                      <path d="M640 51.2l-.3 12.2c-28.1.8-45 15.8-55.8 40.3-25 57.8-103.3 240-155.3 358.6H415l-81.9-193.1c-32.5 63.6-68.3 130-99.2 193.1-.3.3-15 0-15-.3C172 352.3 122.8 243.4 75.8 133.4 64.4 106.7 26.4 63.4.2 63.7c0-3.1-.3-10-.3-14.2h161.9v13.9c-19.2 1.1-52.8 13.3-43.3 34.2 21.9 49.7 103.6 240.3 125.6 288.6 15-29.7 57.8-109.2 75.3-142.8-13.9-28.3-58.6-133.9-72.8-160-9.7-17.8-36.1-19.4-55.8-19.7V49.8l142.5.3v13.1c-19.4.6-38.1 7.8-29.4 26.1 18.9 40 30.6 68.1 48.1 104.7 5.6-10.8 34.7-69.4 48.1-100.8 8.9-20.6-3.9-28.6-38.6-29.4.3-3.6 0-10.3.3-13.6 44.4-.3 111.1-.3 123.1-.6v13.6c-22.5.8-45.8 12.8-58.1 31.7l-59.2 122.8c6.4 16.1 63.3 142.8 69.2 156.7L559.2 91.8c-8.6-23.1-36.4-28.1-47.2-28.3V49.6l127.8 1.1.2.5z" />
                    </svg>
                  </a>
                ) : (
                  <div data-tip data-for={original.id + '-wikipida'}>
                    <span className="sr-only">Open Wikipida</span>
                    <svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="h-6 w-6 text-white opacity-50 cursor-not-allowed"
                    >
                      <path d="M640 51.2l-.3 12.2c-28.1.8-45 15.8-55.8 40.3-25 57.8-103.3 240-155.3 358.6H415l-81.9-193.1c-32.5 63.6-68.3 130-99.2 193.1-.3.3-15 0-15-.3C172 352.3 122.8 243.4 75.8 133.4 64.4 106.7 26.4 63.4.2 63.7c0-3.1-.3-10-.3-14.2h161.9v13.9c-19.2 1.1-52.8 13.3-43.3 34.2 21.9 49.7 103.6 240.3 125.6 288.6 15-29.7 57.8-109.2 75.3-142.8-13.9-28.3-58.6-133.9-72.8-160-9.7-17.8-36.1-19.4-55.8-19.7V49.8l142.5.3v13.1c-19.4.6-38.1 7.8-29.4 26.1 18.9 40 30.6 68.1 48.1 104.7 5.6-10.8 34.7-69.4 48.1-100.8 8.9-20.6-3.9-28.6-38.6-29.4.3-3.6 0-10.3.3-13.6 44.4-.3 111.1-.3 123.1-.6v13.6c-22.5.8-45.8 12.8-58.1 31.7l-59.2 122.8c6.4 16.1 63.3 142.8 69.2 156.7L559.2 91.8c-8.6-23.1-36.4-28.1-47.2-28.3V49.6l127.8 1.1.2.5z" />
                    </svg>
                  </div>
                )}
              </li>
            </ul>
          )
        },
      },
    ],
    []
  )

  if (error) {
    // console.log('ERROR', error)
    return <>{Empty}</>
  }

  if (isLoading) {
    return Loading({ tableVariables })
  }

  const { launches }: FindLaunches = data

  if (launches?.data.length === 0) {
    return <>{Empty}</>
  }

  console.log(launches)
  return (
    <>
      <Table
        {...{
          hidePagination: false,
          columns,
          data: launches,
          isSuccess,
          tableVariables,
          dispatch,
          tableClassName: 'sm:shadow',
        }}
      />
    </>
  )
}

export default LaunchesTable
