import {StackRouter} from '@react-navigation/native';
import {
  ParamListBase,
  RouterConfigOptions,
  StackActionType,
  StackNavigationState,
  StackRouterOptions,
} from '@react-navigation/routers';
import {Action} from '@react-navigation/routers/lib/typescript/src/CommonActions';

export const MyStackRouter = (options: StackRouterOptions) => {
  const router = StackRouter(options);

  return {
    ...router,
    getStateForAction(
      state: StackNavigationState<ParamListBase>,
      action: Action | StackActionType,
      options: RouterConfigOptions,
    ) {
      const result = router.getStateForAction(state, action, options);

      if (result != null && (result.index ?? 0) > state.index) {
        // Returning the current state means that the action has been handled, but we don't have a new state
        return state;
      }

      return result;
    },
  };
};
