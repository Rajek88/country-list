export function debounce(
  func: { (): Promise<void>; apply?: any },
  timeout = 400
) {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
      console.log("Debouncing");
    }, timeout);
  };
}
