/* eslint-disable @typescript-eslint/ban-ts-comment */
// import type { Prisma } from '@prisma/client'

import got from 'got'
import paginate from 'src/lib/paginate'

// not sure if we need node-fetch
// import fetch from 'node-fetch'

const ROWS_PER_PAGE = 25

export const launches = async ({
  table,
}: {
  table: { limit?: number; page?: number }
}) => {
  const launches = await got
    .post(`https://api.spacexdata.com/v4/launches/query`, {
      json: {
        options: {
          page: table.page || 1,
          limit: table.limit || 20,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    })
    .json()

  return {
    //@ts-ignore
    data: launches.docs,
    paginate: paginate(
      //@ts-ignore
      launches.totalDocs,
      table.page,
      table.limit || ROWS_PER_PAGE
    ),
  }
}

export const launch = async ({ id }) => {
  const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`, {
    method: 'GET',
  })
  return await response.json()
}
