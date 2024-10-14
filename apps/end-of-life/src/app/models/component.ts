export interface Component {
  // Release Cycle
  cycle: number | string;

  // Whether this release cycle has long-term-support (LTS). Can be a date instead in YYYY-MM-DD format as well if the release enters LTS status on a given date.
  lts: boolean | string;

  // Release Date for the first release in this cycle
  releaseDate: string;

  // Whether this release cycle has active support
  support: boolean | string;

  // End of Life Date for this release cycle
  eol: boolean | string;

  // Latest release in this cycle
  latest: string;

  // Link to changelog for the latest release, if available
  link: string | null;
}
