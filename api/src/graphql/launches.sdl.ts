export const schema = gql`
  type Links {
    patch: LinksPatch
    reddit: LinksReddit
    flickr: LinksFlickr
    presskit: String
    webcast: String
    youtube_id: String
    article: String
    wikipedia: String
  }

  type LinksPatch {
    small: String
    large: String
  }

  type LinksReddit {
    campaign: String
    launch: String
    media: String
    recovery: String
  }

  type LinksFlickr {
    small: [String]
    original: [String]
  }

  type LaunchCores {
    core: String
    flight: Int
    gridfins: Boolean
    legs: Boolean
    reused: Boolean
    landing_attempt: Boolean
    landing_success: Boolean
    landing_type: String
    landpad: String
  }

  type Launch {
    links: Links
    static_fire_date_utc: String
    static_fire_date_unix: Int
    tdb: Boolean
    net: Boolean
    window: Int
    rocket: String
    success: Boolean
    failures: [String]
    details: String
    crew: [String]
    ships: [String]
    capsules: [String]
    payloads: [String]
    launchpad: String
    auto_update: Boolean
    flight_number: Int
    name: String
    date_utc: String
    date_unix: Int
    date_local: String
    date_precision: String
    upcoming: Boolean
    cores: [LaunchCores]
    id: String
  }

  type LaunchesTable {
    data: [Launch!]!
    paginate: PaginateResult
  }

  type Query {
    launches(table: TableInput): LaunchesTable @skipAuth
    launch(id: String!): Launch @skipAuth
  }
`
