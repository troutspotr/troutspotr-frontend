import * as React from 'react'
const classes = require('./Search.scss')

export interface IBackButtonProps {
  readonly updateSearchText: (t: string) => void
  readonly searchText: string
}

export class SearchComponent extends React.PureComponent<IBackButtonProps> {
  constructor(props) {
    super(props)
    this.onTextChange = this.onTextChange.bind(this)
  }

  private onTextChange(e) {
    const text = e.target.value
    this.props.updateSearchText(text)
  }

  public render() {
    return (
      <span className={classes.streamSearch}>
        <label htmlFor="streamSearch" className={classes.hidden}>
          Search Streams
        </label>
        <input
          id="streamSearch"
          type="search"
          placeholder="Search Streams"
          value={this.props.searchText}
          onChange={this.onTextChange}
          role="search"
        />
      </span>
    )
  }
}
