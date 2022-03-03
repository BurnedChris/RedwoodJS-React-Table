import clsx from 'clsx'
import { ReactNode, ReactElement } from 'react'

const td = (props: {
  children?: ReactNode
  className?: string
  type?: 'middle' | 'first' | 'last'
  key: string
}): ReactElement => {
  switch (props.type) {
    case 'first':
      return (
        <td
          {...props}
          key={props.key}
          className={clsx(
            props.className,
            'text-left pr-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 first-of-type:text-left last:text-right'
          )}
        />
      )
    case 'last':
      return (
        <td
          {...props}
          key={props.key}
          className={clsx(
            props.className,
            'pl-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right first-of-type:text-left last:text-right'
          )}
        />
      )

    default:
      return (
        <td
          {...props}
          key={props.key}
          className={clsx(
            props.className,
            'px-6 py-4 whitespace-nowrap text-left text-sm font-medium first-of-type:text-left last:text-right'
          )}
        />
      )
  }
}

const th = (props: {
  children?: ReactNode
  type?: 'empty'
  className?: string
  rounded?: 'left' | 'right'
  key: string
}): ReactElement => {
  switch (props.type) {
    case 'empty':
      return (
        <th
          scope="col"
          {...props}
          key={props.key}
          className={clsx(
            props.className,
            'relative px-6 py-3 bg-gray-100  first-of-type:rounded-l-lg last:rounded-r-lg'
          )}
        />
      )

    default:
      return (
        <th
          scope="col"
          {...props}
          key={props.key}
          className={clsx(
            props.className,
            'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 first-of-type:text-left last:text-right first-of-type:rounded-l-lg last:rounded-r-lg'
          )}
        />
      )
  }
}

const tbody = (props: {
  children: ReactNode
  className?: string
}): ReactElement => (
  <tbody {...props} className={clsx(props.className, 'border-none')} />
)

const tr = (props: {
  children: ReactNode
  noBorder?: boolean
  className?: string
  key: string
}): ReactElement => {
  if (props.noBorder) {
    return <tr key={props.key} {...{ ...props, noBorder: undefined }} />
  }

  return (
    <tr
      {...props}
      className={clsx(
        props.className,
        'border-b border-gray-200 -7 last:border-0'
      )}
      key={props.key}
    />
  )
}

const table = (props: {
  children: ReactNode
  className?: string
}): ReactElement => (
  <table
    {...props}
    className={clsx(
      props.className,
      'min-w-full table w-full overflow-x-scroll lg:table lg:overflow-x-auto'
    )}
  />
)

const thead = (props: {
  children: ReactNode
  className?: string
}): ReactElement => (
  <thead {...props} className={clsx(props.className, 'bg-gray-50')} />
)

export default { td, tbody, tr, th, thead, table }
