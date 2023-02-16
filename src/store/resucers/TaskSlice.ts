import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { WritableDraft } from "immer/dist/internal";
import { IAlert, INewTask, ITask, ITasks, ITooltip } from "../../models/ITask";

interface TaskState {
  tasks: ITasks[];
  currentTasks: ITask[];
  editTask: INewTask;
  tooltip: ITooltip;
  alert: IAlert;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: TaskState = {
  tasks: [
    {
      ID: 1,
      DATE: "2023-02-03T08:38:55.600Z",
      COUNT: 2,
      PAGE: 1,
      DATA: [
        {
          ID: 108,
          PROJECT: "LENDO VELOLIA",
          TASK: "MARKET PLACE",
          COMMENT: "xozircha nimadurni oylavoman bilmiman 111",
          STATE: "START",
          START_AT: "2023-02-03T08:23:49.620Z",
          STOP_AT: "2023-02-03T08:23:49.620Z",
          CREATED_AT: "2023-02-03T08:23:49.620Z",
          UPDATED_AT: null,
        },
        {
          ID: 107,
          PROJECT: "LENDO VELOLIA2",
          TASK: "MARKET PLACE2",
          COMMENT: "xozircha nimadurni oylavoman bilmiman",
          STATE: "CREATE",
          START_AT: "2023-02-03T11:16:28.684Z",
          STOP_AT: "2023-02-03T11:16:28.684Z",
          CREATED_AT: null,
          UPDATED_AT: null,
        },
        {
          ID: 105,
          PROJECT: "LENDO VELOLIA3",
          TASK: "MARKET PLACE3",
          COMMENT: "xozircha nimadurni oylavoman bilmiman",
          STATE: "CREATE",
          START_AT: "2023-02-03T11:16:28.684Z",
          STOP_AT: "2023-02-03T11:16:28.684Z",
          CREATED_AT: null,
          UPDATED_AT: null,
        },
        {
          ID: 106,
          PROJECT: "LENDO VELOLIA",
          TASK: "MARKET PLACE",
          COMMENT: "xozircha nimadurni oylavoman bilmiman",
          STATE: "STOP",
          START_AT: "2023-02-03T11:16:06.303Z",
          STOP_AT: "2023-02-03T11:16:28.684Z",
          CREATED_AT: null,
          UPDATED_AT: null,
        },
      ],
    },
    {
      ID: 2,
      DATE: "2023-02-02T08:38:55.600Z",
      COUNT: 2,
      PAGE: 1,
      DATA: [
        {
          ID: 107,
          PROJECT: "LENDO VELOLIA",
          TASK: "MARKET PLACE",
          COMMENT:
            "xozircha nimadurni oylavoman bilmiman sdfsfs sdfsfs sdf dddddddddd sdfsdf s",
          STATE: "STOP",
          START_AT: "2023-02-03T11:16:28.684Z",
          STOP_AT: "2023-02-03T11:16:28.684Z",
          CREATED_AT: "2023-02-03T08:23:49.620Z",
          UPDATED_AT: null,
        },
        {
          ID: 108,
          PROJECT: "LENDO VELOLIA2",
          TASK: "MARKET PLACE2",
          COMMENT: "xozircha nimadurni oylavoman bilmiman",
          STATE: "STOP",
          START_AT: "2023-02-03T11:16:28.684Z",
          STOP_AT: "2023-02-03T11:16:28.684Z",
          CREATED_AT: null,
          UPDATED_AT: null,
        },
        {
          ID: 109,
          PROJECT: "LENDO VELOLIA3",
          TASK: "MARKET PLACE3",
          COMMENT: "xozircha nimadurni oylavoman bilmiman",
          STATE: "STOP",
          START_AT: "2023-02-03T11:16:06.303Z",
          STOP_AT: "2023-02-03T11:16:28.684Z",
          CREATED_AT: null,
          UPDATED_AT: null,
        },
        {
          ID: 110,
          PROJECT: "LENDO VELOLIA",
          TASK: "MARKET PLACE",
          COMMENT: "xozircha nimadurni oylavoman bilmiman",
          STATE: "STOP",
          START_AT: "2023-02-03T11:16:06.303Z",
          STOP_AT: "2023-02-03T11:16:28.684Z",
          CREATED_AT: null,
          UPDATED_AT: null,
        },
      ],
    },
  ],
  currentTasks: [
    {
      ID: 107,
      PROJECT: "LENDO VELOLIA",
      TASK: "MARKET PLACE",
      COMMENT: "xozircha nimadurni oylavoman bilmiman 111",
      STATE: "START",
      START_AT: "2023-02-03T08:23:49.620Z",
      STOP_AT: "2023-02-03T08:23:49.620Z",
      CREATED_AT: "2023-02-03T08:23:49.620Z",
      UPDATED_AT: null,
    },
    {
      ID: 108,
      PROJECT: "LENDO VELOLIA3",
      TASK: "MARKET PLACE3",
      COMMENT: "xozircha nimadurni oylavoman bilmiman",
      STATE: "CREATE",
      START_AT: null,
      STOP_AT: null,
      CREATED_AT: null,
      UPDATED_AT: null,
    },
  ],
  editTask: {
    ID: null,
    PROJECT: "",
    TASK: "",
    COMMENT: "",
  },
  tooltip: {
    isOpen: false,
    position: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    },
  },
  alert: {
    title: "",
    text: "",
    icon: "",
    isOpen: false,
  },
  isLoading: false,
  error: null,
};

const successAlert = (
  state: WritableDraft<TaskState>,
  action: PayloadAction<
    ITasks[],
    string,
    { arg: INewTask; requestId: string; requestStatus: "fulfilled" },
    never
  >
) => {
  state.alert = {
    title: "Таск создан",
    text: "Все хорошо!",
    icon: "icon-checked",
    isOpen: true,
  };
};

const errorAlert = (
  state: WritableDraft<TaskState>,
  action: PayloadAction<
    string | undefined,
    string,
    {
      arg: undefined | INewTask | number | { WORK_ID: number; STATE: string };
      requestId: string;
      requestStatus: "rejected";
      // state.error = action.payload;
      aborted: boolean;
      condition: boolean;
    } & ({ rejectedWithValue: true } | ({ rejectedWithValue: false } & {})),
    SerializedError
  >
) => {
  state.alert = {
    title: "Ошибка",
    text: action.payload,
    icon: "icon-error",
    isOpen: true,
  };

  // setTimeout(() => {
  //   debugger;
  //   state.alert = {
  //     title: "Ошибка",
  //     text: action.payload,
  //     icon: "icon-error",
  //     isOpen: false,
  //   };
  // }, 5000);
};

export const fetchTasks = createAsyncThunk<
  ITasks[],
  undefined,
  { rejectValue: string }
>("tasks/fetchTasks", async function (_, { rejectWithValue, dispatch }) {
  try {
    const response = await axios.get("/task/all");

    // console.log(response.data.BODY);

    const activeTask = response.data.BODY.find(
      (task: ITask) => task.STATE === "START"
    );
    console.log("activeTask", activeTask);

    dispatch(setCurrTask(activeTask));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addNewTask = createAsyncThunk<
  ITasks[],
  INewTask,
  { rejectValue: string }
>("task/addNewTask", async function (newTask, { rejectWithValue }) {
  try {
    const response = await axios.post("/task/created", newTask);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const editTask = createAsyncThunk<
  ITasks[],
  INewTask,
  { rejectValue: string }
>("task/editTask", async function (task, { rejectWithValue }) {
  try {
    const response = await axios.put("/task/updated", task);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const removeTask = createAsyncThunk<
  {
    CODE: number;
    MSG: string;
  },
  number,
  { rejectValue: string }
>("task/removeTask", async function (id, { rejectWithValue }) {
  try {
    const response = await axios.delete(`/task/delete?WORK_ID=${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const startStopTask = createAsyncThunk<
  ITasks[],
  {
    WORK_ID: number;
    STATE: string;
  },
  { rejectValue: string }
>("task/startStopTask", async function (data, { rejectWithValue }) {
  try {
    // debugger;
    const response = await axios.put("/task/updated/state", data);

    console.log(response);

    if (response.data.CODE === 1) {
      return rejectWithValue(response.data.MSG);
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCurrTask(state, action: PayloadAction<ITask>) {
      const currentTask = action.payload;
      const startTask = state.currentTasks.find(
        (task) => task.STATE === "START"
      );

      if (currentTask.STATE === "CREATE" && startTask) {
        state.currentTasks[1] = currentTask;
      } else if (currentTask.STATE === "START" && startTask) {
        state.currentTasks.splice(1, 1);
      } else {
        state.currentTasks[0] = currentTask;
      }
    },
    setEditTask(state, action: PayloadAction<INewTask>) {
      state.editTask = action.payload;
    },
    setTooltip(state, action: PayloadAction<ITooltip>) {
      // state.tooltip = {isOpen: false}
      state.tooltip = action.payload;
    },
    setAlert(state, action: PayloadAction<IAlert>) {
      state.alert = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        // state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        // state.error = action.payload;
        errorAlert(state, action);
      })
      .addCase(addNewTask.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        console.log("action", action);
        debugger;

        // state.tasks = action.payload
        successAlert(state, action);
      })
      .addCase(addNewTask.rejected, (state, action) => {
        errorAlert(state, action);
      })
      .addCase(editTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        // state.tasks = action.payload
        state.isLoading = false;
      })
      .addCase(editTask.rejected, (state, action) => {
        errorAlert(state, action);
      })
      .addCase(removeTask.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removeTask.rejected, (state, action) => {
        errorAlert(state, action);
      })
      .addCase(startStopTask.pending, (state) => {
        // debugger;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startStopTask.fulfilled, (state, action) => {
        // state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(startStopTask.rejected, (state, action) => {
        // debugger;
        errorAlert(state, action);
      });
  },
});

export const { setCurrTask, setEditTask, setTooltip, setAlert } =
  taskSlice.actions;

export default taskSlice.reducer;
