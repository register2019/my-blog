export const boundary = {
  x: 100,
  y: 50,
};
export const getRandomCoordinate = (): { x: number; y: number } => {
  const randomChoiceX = Math.random();
  const randomChoiceY = Math.random();

  let x: number;
  let y: number;

  if (randomChoiceX < 0.2) {
    // X > 0 && X < boundary.x
    x = Math.random() * boundary.x;
  } else if (randomChoiceX < 0.4) {
    // X > window.innerWidth - boundary.x * 2 && X < window.innerWidth - boundary.x
    x = window.innerWidth - boundary.x * 2 + Math.random() * boundary.x;
  } else if (randomChoiceX < 0.6) {
    // X > boundary.x && X < window.innerWidth - boundary.x * 2
    x = boundary.x + Math.random() * (window.innerWidth - boundary.x * 3);
  } else if (randomChoiceX < 0.8) {
    // X > window.innerWidth - boundary.x * 3 && X < window.innerWidth - boundary.x * 2
    x = window.innerWidth - boundary.x * 3 + Math.random() * boundary.x;
  } else {
    // X > window.innerWidth - boundary.x && X < window.innerWidth
    x = window.innerWidth - boundary.x + Math.random() * boundary.x;
  }

  if (randomChoiceY < 0.2) {
    // Y > 0 && Y < boundary.y
    y = Math.random() * boundary.y;
  } else if (randomChoiceY < 0.4) {
    // Y > window.innerHeight - boundary.y * 2 && Y < window.innerHeight - boundary.y
    y = window.innerHeight - boundary.y * 2 + Math.random() * boundary.y;
  } else if (randomChoiceY < 0.6) {
    // Y > boundary.y && Y < window.innerHeight - boundary.y * 2
    y = boundary.y + Math.random() * (window.innerHeight - boundary.y * 3);
  } else if (randomChoiceY < 0.8) {
    // Y > window.innerHeight - boundary.y * 3 && Y < window.innerHeight - boundary.y * 2
    y = window.innerHeight - boundary.y * 3 + Math.random() * boundary.y;
  } else {
    // Y > window.innerHeight - boundary.y && Y < window.innerHeight
    y = window.innerHeight - boundary.y + Math.random() * boundary.y;
  }

  return { x, y };
};

export const getRandomColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};
