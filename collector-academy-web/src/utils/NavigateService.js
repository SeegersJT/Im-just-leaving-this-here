let navigateFunction;

export const setNavigate = (navigate) => {
  navigateFunction = navigate;
};

export const navigateTo = (path) => {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    console.error('Navigation function is not set');
  }
};
