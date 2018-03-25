export enum LoadingStatus {
  NotStarted,
  Pending,
  Success,
  Failed,
  Offline,
}

export enum SelectionStatus {
  Disabled,
  Inactive,
  Active,
  Selected,
}

export interface ISelectable {
  selectionStatus: SelectionStatus
}

export interface ILoadable {
  loadingStatus: LoadingStatus
}
