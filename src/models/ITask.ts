export interface ITask {
  ID: number;
  PROJECT: string;
  TASK: string;
  COMMENT: string;
  STATE: string;
  START_AT: string | null;
  STOP_AT: string | null;

  CREATED_AT: string | null;
  UPDATED_AT: string | null;
}

export interface ITasks {
  ID: number | null;
  DATE: string | null;
  COUNT: number | null;
  PAGE: number | null;
  DATA: ITask[];
}

export interface INewTask {
  ID?: number | null;
  PROJECT: string;
  TASK: string;
  COMMENT?: string;
  STATE?: string;
  START_AT?: string | null;
  STOP_AT?: string | null;
}

export interface ITooltip {
  isOpen: boolean;
  position?: {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
  };
  startTask?: ITask;
  task?: ITask;
  rightTooltip?: boolean;
}

export interface IAlert {
  title?: string;
  text?: string | undefined;
  icon?: string;
  isOpen: boolean;
}
