import { configureStore, ActionCreatorsMapObject } from "@reduxjs/toolkit";
import { authorizationReducer } from "../features/Authorization/Authorization.slice";
import { useAppDispatch } from "./hooks";
import { BoundActions } from "./store.types";
import { useMemo } from "react";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";

export const store = configureStore({
  reducer: {
    authorizationReducer,
  },
});

export const useBoundActions = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  // @ts-ignore
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
