import { Menu, Transition } from '@headlessui/react'
import {
  ChevronLeftIcon,
  DotsHorizontalIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid'
import clsx from 'clsx'
import React, { Fragment } from 'react'

const Pagination = ({
  paginate,
  canPreviousPage,
  canNextPage,
  gotoPage,
  nextPage,
  previousPage,
}) => {
  const endPageMenuArray = Array(paginate.totalPages - paginate.endPage)

  const startPageMenuArray =
    paginate.currentPage >= 3 ? Array(paginate.currentPage - 3) : []

  return (
    <div className="flex items-center justify-between relative">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
          className="relative inline-flex items-center px-4 py-2 rounded text-sm font-medium text-white  bg-black-500 hover:bg-leafy-600 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          disabled={!canNextPage}
          onClick={() => nextPage()}
          className="ml-3 relative inline-flex items-center px-4 py-2 rounded text-sm font-medium text-white hover:bg-leafy-600 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white">
            Showing{' '}
            <span className="font-medium">{paginate.startIndex || 1}</span> to{' '}
            <span className="font-medium"> {paginate.endIndex + 1} </span> of{' '}
            <span className="font-medium">{paginate.totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px"
            aria-label="Pagination"
          >
            {paginate.currentPage !== 1 && (
              <button
                disabled={!canPreviousPage}
                onClick={() => previousPage()}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-white hover:bg-leafy-600 border-none"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}

            <>
              {!paginate.pages.includes(1) && (
                <button
                  onClick={() => gotoPage(1)}
                  className="transition flex items-center justify-center group text-white relative px-4 py-2  text-sm font-medium border-none"
                >
                  <span className="h-8 w-8 rounded absolute group-hover:bg-amber-600 group-hover:text-white transition" />
                  <span className="transition text-white group-hover:text-white z-10">
                    1
                  </span>
                </button>
              )}

              {paginate.currentPage >= 4 && (
                <>
                  <Menu>
                    {({ open }) => (
                      <>
                        <Menu.Button className="transition flex items-center justify-center  group text-white relative px-4 py-2  text-sm font-medium focus:outline-none">
                          <span
                            className={clsx(
                              'h-8 w-8  absolute rounded group-hover:bg-amber-600 group-hover:text-white transition',
                              open && 'bg-amber-500 bg-opacity-50!'
                            )}
                          />
                          <span
                            className={clsx(
                              'transition group-hover:text-white z-10',
                              open && ''
                            )}
                          >
                            <DotsHorizontalIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            className={clsx(
                              'bg-white sm:rounded-lg dark:bg-nord-3 z-20 origin-bottom absolute bottom-0 px-4 pt-2 pb-1 mb-10 shadow-lg grid ring-1 ring-black ring-opacity-5 focus:outline-none',
                              startPageMenuArray.length === 1 &&
                                'grid-cols-1 w-[2.8rem] left-[4.8rem]',
                              startPageMenuArray.length === 2 &&
                                'grid-cols-2 w-[5.6rem] left-[3.35rem]',
                              startPageMenuArray.length === 3 &&
                                'grid-cols-3 w-[8.4rem] left-8',
                              startPageMenuArray.length === 4 &&
                                'grid-cols-4 w-[11.2rem] left-2',
                              startPageMenuArray.length >= 5 &&
                                'grid-cols-5 w-56 left-[-1rem]'
                            )}
                          >
                            {[...startPageMenuArray.keys()].map(
                              (i) => (
                                // i  && (
                                <Menu.Item key={i}>
                                  {() => (
                                    <button
                                      onClick={() => gotoPage(i + 2)}
                                      className={clsx(
                                        // active
                                        //   ? 'bg-gray-100 text-gray-900'
                                        //   : 'text-gray-700',
                                        'flex group justify-center items-center text-sm py-2 '
                                      )}
                                    >
                                      <span
                                        className={clsx(
                                          'h-8 w-8  rounded absolute group-hover:bg-amber-600 group-hover:text-white transition'
                                        )}
                                      />
                                      <span className="transition group-hover:text-white z-10">
                                        {i + 2}
                                      </span>
                                    </button>
                                  )}
                                </Menu.Item>
                              )
                              // )
                            )}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </>
              )}
            </>
            {paginate.pages.map((index) => {
              return (
                <button
                  onClick={() => gotoPage(index)}
                  key={index}
                  className={clsx(
                    'transition flex items-center justify-center group text-white relative px-4 py-2  text-sm font-medium border-none'
                  )}
                >
                  <span
                    className={clsx(
                      'h-8 w-8 rounded absolute group-hover:bg-amber-600 group-hover:text-white transition',
                      paginate.currentPage === index && 'bg-amber-500'
                    )}
                  />
                  <span
                    className={clsx(
                      'transition rounded group-hover: z-10',
                      paginate.currentPage === index && '!'
                    )}
                  >
                    {index}
                  </span>
                </button>
              )
            })}

            <>
              {paginate.totalPages - paginate.currentPage >= 3 && (
                <Menu>
                  {({ open }) => (
                    <>
                      <Menu.Button className="transition flex items-center justify-center  group text-white relative px-4 py-2  text-sm font-medium focus:outline-none">
                        <span
                          className={clsx(
                            'h-8 w-8  absolute rounded group-hover:bg-amber-600 group-hover:text-white transition',
                            open && 'bg-amber-500 bg-opacity-50 !'
                          )}
                        />
                        <span
                          className={clsx(
                            'transition group-hover:text-white z-10',
                            open && ''
                          )}
                        >
                          <DotsHorizontalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          className={clsx(
                            'bg-white sm:rounded-lg dark:bg-nord-3 z-20 origin-bottom absolute bottom-0 px-4 pt-2 pb-1 mb-10 shadow-lg grid ring-1 ring-black ring-opacity-5 focus:outline-none',
                            endPageMenuArray.length === 2 &&
                              'grid-cols-1 w-[2.8rem] right-[4.8rem]',
                            endPageMenuArray.length === 3 &&
                              'grid-cols-2 w-[5.6rem] right-[3.35rem]',
                            endPageMenuArray.length === 4 &&
                              'grid-cols-3 w-[8.4rem] right-8',
                            endPageMenuArray.length === 5 &&
                              'grid-cols-4 w-[11.2rem] right-2',
                            endPageMenuArray.length >= 6 &&
                              'grid-cols-5 w-56 right-0'
                          )}
                        >
                          {[...endPageMenuArray.keys()].map(
                            (i) =>
                              i + paginate.endPage !== paginate.endPage && (
                                <Menu.Item key={i}>
                                  {() => (
                                    <button
                                      onClick={() =>
                                        gotoPage(i + paginate.endPage)
                                      }
                                      className={clsx(
                                        // active
                                        //   ? 'bg-gray-100 text-gray-900'
                                        //   : 'text-gray-700',
                                        'flex group justify-center items-center text-sm py-2 '
                                      )}
                                    >
                                      <span
                                        className={clsx(
                                          'h-8 w-8 rounded absolute group-hover:bg-amber-600 group-hover:text-white transition'
                                        )}
                                      />
                                      <span className="transition text-white group-hover:text-white z-10">
                                        {i + paginate.endPage}
                                      </span>
                                    </button>
                                  )}
                                </Menu.Item>
                              )
                          )}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              )}

              {paginate.totalPages - paginate.currentPage >= 2 && (
                <button
                  onClick={() => {
                    gotoPage(paginate.totalPages)
                  }}
                  className="transition flex items-center justify-center  group text-text-white relative px-4 py-2  text-sm font-medium border-none"
                >
                  <span className="h-8 w-8 absolute rounded group-hover:bg-amber-600 group-hover:text-white transition" />
                  <span className="text-white transition group-hover:text-white  z-10">
                    {paginate.totalPages}
                  </span>
                </button>
              )}
            </>

            {paginate.currentPage !== paginate.totalPages && (
              <button
                disabled={!canNextPage}
                onClick={() => nextPage()}
                className="relative inline-flex items-center rounded px-2 py-2 text-sm font-medium text-white hover:bg-leafy-600 cursor-pointer"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
