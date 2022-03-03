export const schema = gql`
  input TableInput {
    limit: Int
    page: Int
  }
  type PaginateResult {
    totalItems: Int
    currentPage: Int
    pageSize: Int
    totalPages: Int
    startPage: Int
    endPage: Int
    startIndex: Int
    endIndex: Int
    pages: [Int]
  }
`
