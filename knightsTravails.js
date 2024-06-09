function Movement(location, path) {
  const x = location[0];
  const y = location[1];

  return { x, y, path};
}

function getNextMoveList(movement) {
  const result = [];
  const operations = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  operations.forEach((op) => {
    const nextX = movement.x + op[0];
    const nextY = movement.y + op[1];
    if (nextX < 8 && nextY < 8 && nextX >= 0 && nextY >= 0) {
      result.push([nextX, nextY]);
    }
  });

  return result;
}

function inRange(location) {
  return (
    location[0] < 8 && location[1] < 8 && location[0] >= 0 && location[1] >= 0
  );
}

function knightMoves(start, end) {
  if (!inRange(start) || !inRange(end)) {
    throw new Error("Location out of range");
  }

  let path = [start];
  const queue = [];
  const startingMove = Movement(start, path);
  queue.push(startingMove);

  while (queue[0].x !== end[0] || queue[0].y !== end[1]) {
    const nextList = getNextMoveList(queue[0]);
    nextList.forEach((next) => {
      const nextPath = [...queue[0].path, next];
      const nextMove = Movement(next, nextPath);
      queue.push(nextMove);
    });
    queue.shift();
    path = queue[0].path;
  }

  return path;
}
