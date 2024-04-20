export const scrollToActiveLyric = (
  containerRef: React.RefObject<HTMLDivElement>,
  activeLyric: number
) => {
  if (containerRef.current && activeLyric !== -1) {
    const activeDiv = containerRef.current.childNodes[
      activeLyric
    ] as HTMLElement;
    if (activeDiv) {
      const containerHeight = containerRef.current.clientHeight;
      const activeDivHeight = activeDiv.clientHeight;
      const scrollTop =
        activeDiv.offsetTop - (containerHeight - activeDivHeight) / 2;
      containerRef.current.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  }
};
export const isActiveElementInViewport = (
  containerRef: React.RefObject<HTMLDivElement>,
  activeLyric: number
): boolean => {
  const container = containerRef.current;
  if (!container) return false;
  const activeElement = container.childNodes[activeLyric] as HTMLElement;
  if (!activeElement) return false;
  const containerRect = container.getBoundingClientRect();
  const elementRect = activeElement.getBoundingClientRect();

  return (
    elementRect.top >= containerRect.top &&
    elementRect.left >= containerRect.left &&
    elementRect.bottom <= containerRect.bottom &&
    elementRect.right <= containerRect.right
  );
};
export const getPrefixSum = (arr: Array<number>) => {
  const prefixSum: Array<number> = [];
  arr.forEach((n, i) => {
    if (i == 0) prefixSum.push(n);
    else prefixSum.push(prefixSum[i - 1] + n);
  });
  return prefixSum;
};

export function findIndexOfGreater(array: number[], target: number): number {
  const index = array.findIndex((num) => num > target);
  return index !== -1 ? index : array.length; // Return array length if no element is greater
}
