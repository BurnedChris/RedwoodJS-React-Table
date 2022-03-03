export const PAGE_CHANGED = 'PAGE_CHANGED'
export const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED'

export const paginationReducer = (state, { type, payload }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        page: payload,
      }
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        limit: payload,
      }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}
