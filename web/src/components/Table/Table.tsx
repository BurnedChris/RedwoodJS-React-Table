import Pagination from './subs/Pagination'
import { PAGE_CHANGED, PAGE_SIZE_CHANGED } from './subs/pagenationFetch'
import clsx from 'clsx'
import React, {
  Dispatch,
  forwardRef,
  MutableRefObject,
  Ref,
  useEffect,
  useRef,
} from 'react'
import { useRowSelect, useTable, usePagination } from 'react-table'
import TwTable from './subs/TwTable'

interface IIndeterminateInputProps {
  indeterminate?: boolean
  name: string
}

const useCombinedRefs = (
  ...refs: Array<Ref<HTMLInputElement> | MutableRefObject<null>>
): MutableRefObject<HTMLInputElement | null> => {
  const targetRef = useRef(null)

  useEffect(() => {
    refs.forEach((ref: Ref<HTMLInputElement> | MutableRefObject<null>) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IIndeterminateInputProps
>(({ indeterminate, ...rest }, ref: Ref<HTMLInputElement>) => {
  const defaultRef = useRef(null)
  const combinedRef = useCombinedRefs(ref, defaultRef)

  useEffect(() => {
    if (combinedRef?.current) {
      combinedRef.current.indeterminate = indeterminate ?? false
    }
  }, [combinedRef, indeterminate])

  return (
    <>
      <input
        title="Select Row"
        className={clsx(
          'h-4 w-4 bg-gray-300 text-monty-600 focus:ring-monty-500 dark:bg-nord-1 checked:bg-monty-400 checked:dark:bg-monty-400 ring-offset-white dark:ring-offset-nord-3 border-transparent rounded'
        )}
        type="checkbox"
        ref={combinedRef}
        {...rest}
      />
    </>
  )
})

type TableProps = {
  columns?: any[]
  data?: Record<string, any>
  isSuccess?: boolean
  page?: number
  limit?: number
  dispatch?: Dispatch<{
    type: string
    payload: Record<string, any>
  }>
  selectType?: 'single' | 'multiple'
  preSelectedRows?: Record<string, boolean>
  hidePagination?: boolean
  tableClassName?: string
  tableVariables: {
    page: number
    limit: number
  }
}

const Table = ({
  columns,
  data,
  isSuccess,
  tableVariables,

  dispatch,
  selectType,
  preSelectedRows,
  hidePagination,
  tableClassName,
}: TableProps) => {
  // const [_, send] = exportMachine
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state,
  } = useTable(
    {
      initialState: {
        pageIndex: tableVariables.page,
        pageSize: tableVariables.limit,
        selectedRowIds: preSelectedRows || [],
      },
      manualPagination: true,
      pageCount:
        isSuccess && data?.paginate?.totalPages
          ? data?.paginate?.totalPages + 1
          : null,
      stateReducer: (newState, action) => {
        if (selectType === 'single') {
          if (action.type === 'toggleRowSelected') {
            // set hook here for toggles

            newState.selectedRowIds = {
              [action.id]: true,
            }
          }

          return newState
        }
      },
      columns,
      data: isSuccess ? data.data : [],
      autoResetSelectedRows: false,
      getRowId: (row) => row.id,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      selectType &&
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) =>
              selectType === 'multiple' ? (
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              ) : null,
            Cell: ({ row }) => (
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ])
    }
  )

  useEffect(() => {
    dispatch({ type: PAGE_CHANGED, payload: state.pageIndex })

    const params = new URLSearchParams(location.search)
    params.set('page', state.pageIndex)
    params.toString() // => test=123&cheese=yummy
    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${params.toString()}`
    )
  }, [dispatch, state.pageIndex])

  useEffect(() => {
    if (state.pageSize !== data.paginate.pageSize) {
      dispatch({ type: PAGE_SIZE_CHANGED, payload: state.pageSize })
      gotoPage(0)
    }
  }, [data.paginate.pageSize, dispatch, gotoPage, state.pageSize])

  return (
    <>
      <div
        className={clsx(
          tableClassName,
          'p-4 mb-4 bg-white sm:rounded-lg overflow-hidden'
        )}
      >
        <TwTable.table {...getTableProps()}>
          <TwTable.thead>
            {headerGroups.map((headerGroup, index) => (
              <TwTable.tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column) => {
                  return (
                    <TwTable.th
                      key={column.accessor}
                      {...column.getHeaderProps()}
                      type="left"
                    >
                      {column.render('Header')}
                    </TwTable.th>
                  )
                })}
              </TwTable.tr>
            ))}
          </TwTable.thead>
          <TwTable.tbody {...getTableBodyProps()} x-max="1">
            {page.map((row) => {
              prepareRow(row)
              return (
                <TwTable.tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TwTable.td key={cell.column.id}>
                        {cell.render('Cell')}
                      </TwTable.td>
                    )
                  })}
                </TwTable.tr>
              )
            })}
          </TwTable.tbody>
        </TwTable.table>
      </div>

      {!hidePagination && (
        <Pagination
          {...{
            paginate: data.paginate,
            canPreviousPage,
            canNextPage,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
          }}
        />
      )}
    </>
  )
}
export default Table
