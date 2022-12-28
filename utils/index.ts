export const isIphoneAspectRatio = (screenshot: HTMLImageElement | null | undefined) => {
  return (
    screenshot &&
    screenshot.height / screenshot.width > 2.16 &&
    screenshot.height / screenshot.width < 2.17
  );
};
