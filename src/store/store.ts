import { combineReducers, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import taskReducer from "./resucers/TaskSlice";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJQVUFKRi00aUR1RjVsSkZpaFJCX1MyTnpiak04U19YcmNLUVU1NW1ERldRIn0.eyJleHAiOjE2NzY1NjQyMzMsImlhdCI6MTY3NjUyODIzMywianRpIjoiZmM3NmNhMDItZDIyNy00NTQxLWJkMTQtNjkwMDMxYjI0MWZmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9kZXZlbG9wZXItcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZWI2ODgzOTYtNjgzNy00ODNhLTg4ZGUtYjhmZjJkNzVmODY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid29ya2luZy1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNDc3N2E0NWMtNGEwYS00ZTM0LWI1MzAtMmYzMmQ1NzA3ZjkwIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWRldmVsb3Blci1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI0Nzc3YTQ1Yy00YTBhLTRlMzQtYjUzMC0yZjMyZDU3MDdmOTAiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJUZXN0IFRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0IiwiZ2l2ZW5fbmFtZSI6IlRlc3QiLCJmYW1pbHlfbmFtZSI6IlRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5ydSJ9.CqTqGYkAyQ5jU70TDeeixbT8s7YJk1yG_FJWi98iNRaPdqBKWvwY68i9bJoy5a-1QHGB8y50QkoF4BqAujFELV3UtmZ4fEaUuI546XtJpxvR6xxBY09N_RCopqK-9wwUNR5wyN_0Lr8wiJRuGtdLZodlGpAEfQ4XuZIu_1IH7duUyXFLj2w1YQBdTVARF-dSHHZn5wVkQBVklr6sKR-Wk-Bq4VzXIi-yPxYv3pgSMJw52zelXSm4XtUfVDT98L5Gpxm4RS6gEnpUrA_EVsM7_M-GZRpbbPiLBIHExXiABqaqpRSPskSugdpb6IqHhEAQ1iXG9jUlIyhdkd0zWrBAlg";

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
