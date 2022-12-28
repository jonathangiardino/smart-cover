export const isIphoneAspectRatio = (screenshot: HTMLImageElement) => {
  return (
    screenshot.height / screenshot.width >= 2.16 &&
    screenshot.height / screenshot.width <= 2.17
  );
};
