export function lttb(data, threshold) {
  if (threshold >= data.length || threshold === 0) {
    return data;
  }

  const decimatedData = [];
  const n = data.length;
  const bucketSize = Math.floor((n - 2) / (threshold - 2));
  decimatedData.push(data[0]);

  let a = 0;
  let maxAreaPointIndex;
  let maxArea;
  let area;

  for (let i = 1; i < threshold - 1; i++) {
    let bucketStartIndex = Math.floor(i * bucketSize) + 1;
    let bucketEndIndex = Math.floor((i + 1) * bucketSize) + 1;
    if (bucketEndIndex > n - 1) {
      bucketEndIndex = n - 1;
    }

    const bucketAverageX = (bucketStartIndex + bucketEndIndex) / 2;

    maxArea = -1;
    maxAreaPointIndex = -1;

    for (let j = bucketStartIndex; j < bucketEndIndex; j++) {
      area = Math.abs(
        (data[a].x - data[bucketEndIndex].x) * (data[j].y - data[a].y) -
          (data[a].x - data[j].x) * (data[bucketEndIndex].y - data[a].y)
      );

      if (area > maxArea) {
        maxArea = area;
        maxAreaPointIndex = j;
      }
    }

    decimatedData.push(data[maxAreaPointIndex]);
    a = maxAreaPointIndex;
  }

  decimatedData.push(data[n - 1]);
  return decimatedData;
}
