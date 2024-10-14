// "array" implementation
export var createSignal1 = () => {
  var trackedCallbacks = new Array<Function>();

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

    trackedCallbacks.push(callback);
  };

  var trigger = (callback: VoidFunction) => {
    var returnedCallbackValue = callback();

    trackedCallbacks.forEach((trackedCallback) => {
      trackedCallback?.();
    });

    return returnedCallbackValue;
  };

  return {
    track,
    trigger,
  };
};

// "set" implementation
export var createSignal = () => {
  var trackedCallbackSet = new Set<Function>();

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

    trackedCallbackSet.add(callback);
  };

  var trigger = (callback: VoidFunction) => {
    var returnedCallbackValue = callback();

    trackedCallbackSet.forEach((trackedCallback) => {
      trackedCallback();
    });

    return returnedCallbackValue;
  };

  var clearTracked = () => {
    trackedCallbackSet.clear();
  };

  return {
    track,
    trigger,
    clearTracked,
  };
};
