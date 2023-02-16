import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FormikState } from "formik";
import "./createTask.scss";
import { INewTask } from "../../models/ITask";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addNewTask,
  editTask,
  removeTask,
  setEditTask,
} from "../../store/resucers/TaskSlice";

export default function CreateTask() {
  const dispatch = useAppDispatch();

  const initialValues = useAppSelector((state) => state.taskReducer.editTask);
  console.log(initialValues);

  const validate = (values: string) => {
    if (!values) {
      return "Required";
    }
    // else if (values.length > 15) {
    //   return "Must be 15 characters or less";
    // }

    // if (!values.email) {
    //   errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address';
    // }

    // return errors;
  };

  const submitHandler = (
    task: INewTask,
    resetForm: (nextState?: Partial<FormikState<INewTask>> | undefined) => void
  ) => {
    console.log(task);
    if (initialValues.ID) {
      const { ID, PROJECT, TASK, COMMENT } = task;

      const data = {
        WORK_ID: ID,
        PROJECT,
        TASK,
        COMMENT,
      };

      dispatch(editTask(data));
    } else {
      dispatch(addNewTask(task));
    }
    resetFormHandler(resetForm);
  };

  const resetFormHandler = (
    resetForm: (nextState?: Partial<FormikState<INewTask>> | undefined) => void
  ) => {
    if (initialValues.ID) {
      dispatch(
        setEditTask({
          ID: null,
          PROJECT: "",
          TASK: "",
          COMMENT: "",
        })
      );
    } else {
      resetForm();
    }
  };

  const removeTaskHandler = (
    resetForm: (nextState?: Partial<FormikState<INewTask>> | undefined) => void
  ) => {
    if (initialValues.ID) {
      dispatch(removeTask(initialValues.ID));
      resetFormHandler(resetForm);
    }
  };

  return (
    <div className="createTask">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(task, { resetForm }) => submitHandler(task, resetForm)}
      >
        {({ values, isValid, resetForm }) => (
          <Form>
            <div className="fieldWrap">
              <Field
                className="field fieldProject"
                placeholder="Какой проект делаете?"
                name="PROJECT"
                type="text"
                validate={validate}
              />

              <div className="separate"></div>

              <Field
                className="field fieldTask"
                placeholder="Какую задачу решаете?"
                name="TASK"
                type="text"
                validate={validate}
              />

              <Field
                className="field fieldComment"
                placeholder="Комментарии"
                name="COMMENT"
                component="textarea"
                rows={1}
                validate={validate}
              />

              {/* {props.errors.project && props.touched.project && (
              <div className="error">{props.errors.project}</div>
            )} */}
            </div>

            <div className="btns">
              <div>
                {initialValues.ID && (
                  <button
                    onClick={() => removeTaskHandler(resetForm)}
                    type="button"
                    className="btn"
                  >
                    Удалить
                  </button>
                )}
              </div>
              <div className="formBtns">
                <button
                  onClick={() => resetFormHandler(resetForm)}
                  type="button"
                  className="btn"
                >
                  Отменить
                </button>

                <button className="btnBlue" disabled={!isValid} type="submit">
                  {initialValues.ID ? "Сохранить" : "Добавить"}
                </button>
              </div>
            </div>

            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(isValid, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(initialValues, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
}
