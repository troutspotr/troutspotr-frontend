import { Theme } from 'ui/core/Core.redux'
export interface IPageLayoutDispatchProps {
  fetchTableOfContents?(): any
  resetMinimap(): void
  handleError(error: any): any
}

export interface IPageLayoutStateProps {
  theme: Theme
  readonly isExpanded: boolean
}

export interface IPageLayoutProps extends IPageLayoutDispatchProps, IPageLayoutStateProps {
  readonly header: React.ReactNode
  readonly content: React.ReactNode
  readonly footer: React.ReactNode
  readonly legend: React.ReactNode | null
}
