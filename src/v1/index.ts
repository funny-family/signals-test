export var createSignal = () => {
  var trackedCallback: Function = null as any;

  var track = (
    callback: VoidFunction,
    option?: {
      immediate?: boolean;
    }
  ) => {
    var immediate = option?.immediate == null ? true : option.immediate;

    if (immediate) {
      callback();
    }

    trackedCallback = callback;

    // (callback as any) = null;
  };

  var trigger = (callback: VoidFunction) => {
    var returnedCallbackValue = callback();

    if (trackedCallback != null) {
      trackedCallback();
    }

    return returnedCallbackValue;
  };

  return {
    track,
    trigger,
  };
};
