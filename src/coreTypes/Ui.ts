export enum LoadingStatus {
  NotStarted = 'notStarted',
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
  Offline = 'offline',
}

export enum SelectionStatus {
  Disabled = 'disabled',
  Inactive = 'inactive',
  Active = 'active',
  Selected = 'selected',
}

export interface ISelectable {
  readonly selectionStatus: SelectionStatus
}

export interface ILoadable {
  readonly loadingStatus: LoadingStatus
  readonly isCached: boolean
}
