import { combineReducers, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import taskReducer from "./resucers/TaskSlice";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJQVUFKRi00aUR1RjVsSkZpaFJCX1MyTnpiak04U19YcmNLUVU1NW1ERldRIn0.eyJleHAiOjE2NzY2NTE1NDIsImlhdCI6MTY3NjYxNTU0MiwianRpIjoiYmM2NTQ1ZjItM2Q5ZC00MmUyLWE5NzQtMGQ4OTEwZTJmZWZkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9kZXZlbG9wZXItcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZWI2ODgzOTYtNjgzNy00ODNhLTg4ZGUtYjhmZjJkNzVmODY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid29ya2luZy1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNzY1ZGMzZmYtZThmMS00MjlmLWExYjktNWIyYzcyZGFmZGViIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWRldmVsb3Blci1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI3NjVkYzNmZi1lOGYxLTQyOWYtYTFiOS01YjJjNzJkYWZkZWIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJUZXN0IFRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0IiwiZ2l2ZW5fbmFtZSI6IlRlc3QiLCJmYW1pbHlfbmFtZSI6IlRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5ydSJ9.Q0hfSCpbv44akIOJHpNV6Hvqs2IHdnPKPz_JbJbPz-n0jvWHu7yFLnBqnuG9oGsSveJOkbJDgr3YPdRAmAXAOUKjDSw_K-GWlTI0EPWV6YpvuzIZ1ogMEOoTRlj9dZPzYA_J_8vSjbw1TIUeMyqyvkt8KP2wz3ahlKRYKVaMGeYMtmf33bR13x5OsmVRLlNnjvnlpbAVZKBhE3YJW0WKnxJBtLc82uKr-DVjIcM60I_T3Iz9eAU-H_rF_19VmMwNxgDqvq5zgBASL50VxEaVNEaUnNCJnUFN-WoWGlGcsDN1OlW0SaJY5k0gT8pe2EQeAC0j-zRCIcPyHhy4WTsIog";

// const _axios = axios.create();
// _axios.interceptors.request.use((config) => {
//   if (UserService.isLoggedIn()) {
//     const cb = () => {
//       config.headers.Authorization = `Bearer ${UserService.getToken()}`;
//       return Promise.resolve(config);
//     };
//     return UserService.updateToken(cb);
//   }
// });

// const _axios = axios.create();
// _axios.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
axios.defaults.baseURL = "http://10.1.1.163:3000";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const rootReducer = combineReducers({
  taskReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMIddleware) =>
      getDefaultMIddleware().concat(axiosMiddleware(axios)),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
