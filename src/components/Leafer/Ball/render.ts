import { Ellipse, Group, Leafer, Line } from 'leafer-ui';
import '@leafer-in/animate';
import '@leafer-in/motion-path';
import { v4 as uuid } from 'uuid';
import { getRandomColor, getRandomCoordinate } from './utils.ts';

const ballMap = new Map();
export const render = (leafer: Leafer) => {
  renderCenter(leafer);
  createRandomBall(leafer);
  setInterval(() => {
    createRandomBall(leafer);
  }, 3000);
};

const createRandomBall = (leafer: Leafer) => {
  const { x: startX, y: startY } = getRandomCoordinate();
  const { x, y, radians } = getRadians(startX, startY);

  const distanceCenter =
    Math.sqrt(
      Math.abs(x - startX) * Math.abs(x - startX) +
      Math.abs(y - startY) * Math.abs(y - startY)
    ) - 50;
  let endX = 0;
  let endY = 0;
  if (startX < x && startY < y) {
    endX = startX + distanceCenter * Math.cos(radians);
    endY = startY + distanceCenter * Math.sin(radians);
  } else if (startX < x && startY > y) {
    endX = startX + distanceCenter * Math.cos(radians);
    endY = startY - distanceCenter * Math.sin(radians);
  } else if (startX > x && startY < y) {
    endX = startX - distanceCenter * Math.cos(radians);
    endY = startY + distanceCenter * Math.sin(radians);
  } else {
    endX = startX - distanceCenter * Math.cos(radians);
    endY = startY - distanceCenter * Math.sin(radians);
  }
  const id = uuid();
  const group = new Group();
  leafer.add(group);
  const line = new Line({
    id,
    points: [startX, startY, endX, endY],
    stroke: 'rgba(255,255,255,0)',
    strokeWidth: 2,
    motionPath: true,
  });
  group.add(line);

  const ball = new Ellipse({
    id,
    x: startX,
    y: startY,
    width: 20,
    height: 20,
    fill: getRandomColor(),
    around: 'center',
    animation: {
      // 沿 path 运动至 100%
      style: { motion: { type: 'percent', value: 1 } },
      duration: 3,
      easing: 'linear',
      event: {
        completed() {
          line.destroy();
          ball.destroy();
        },
      },
    },
  });
  group.add(ball);
  ballMap.set(id, ball);
};

const calculateSlope = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  if (x2 === x1) {
    throw new Error('直线垂直，斜率不存在');
  }
  return Math.abs(y2 - y1) / Math.abs(x2 - x1);
};

const getRadians = (clickX: number, clickY: number) => {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  const slope = calculateSlope(x, y, clickX, clickY);
  const radians = Math.atan(slope);

  return { x, y, radians };
};
const getPoint = (clickX: number, clickY: number) => {
  const { x, y, radians } = getRadians(clickX, clickY);
  let height = window.innerHeight / 2;
  let width = height / Math.tan(radians);

  if (x < width) {
    width = x;
    height = width * Math.tan(radians);
  }
  const point = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  };
  if (clickX > x && clickY > y) {
    point.startX = x + 50 * Math.cos(radians);
    point.startY = y + 50 * Math.sin(radians);
    point.endX = x + width;
    point.endY = y + height;
  } else if (clickX > x && clickY < y) {
    point.startX = x + 50 * Math.cos(radians);
    point.startY = y - 50 * Math.sin(radians);
    point.endX = x + width;
    point.endY = y - height;
  } else if (clickX < x && clickY > y) {
    point.startX = x - 50 * Math.cos(radians);
    point.startY = y + 50 * Math.sin(radians);
    point.endX = x - width;
    point.endY = y + height;
  } else {
    point.startX = x - 50 * Math.cos(radians);
    point.startY = y - 50 * Math.sin(radians);
    point.endX = x - width;
    point.endY = y - height;
  }

  return {
    ...point,
  };
};
const renderCenter = (leafer: Leafer) => {
  const x = window.innerWidth / 2 - 50;
  const y = window.innerHeight / 2 - 50;
  const ellipse = new Ellipse({
    x,
    y,
    width: 100,
    height: 100,
    fill: 'rgb(50,205,121)',
  });

  leafer.add(ellipse);

  ellipse.on('click', (e: PointerEvent) => {
    const { x: clickX, y: clickY } = e;
    const { startX, startY, endX, endY } = getPoint(clickX, clickY);
    const group = new Group();

    leafer.add(group);

    const line = new Line({
      points: [startX, startY, endX, endY],
      stroke: 'rgba(255,255,255,0)',
      strokeWidth: 2,
      motionPath: true,
    });
    group.add(line);
    const ellipse1 = new Ellipse({
      x: clickX,
      y: clickY,
      width: 20,
      height: 20,
      fill: getRandomColor(),
      around: 'center',
      animation: {
        // 沿 path 运动至 100%
        style: { motion: { type: 'percent', value: 1 } },
        duration: 3,
        easing: 'linear',
        event: {
          update(val) {
            if (val) {
              const targetX = val.target.x;
              const targetY = val.target.y;
              if (targetX && targetY) {
                ballMap.forEach((ball, key) => {
                  if (
                    Math.sqrt(
                      (targetX - ball.x) * (targetX - ball.x) +
                      (targetY - ball.y) * (targetY - ball.y)
                    ) < 20
                  ) {
                    ball.destroy();
                    group.destroy();
                    ballMap.delete(key);
                  }
                });
              }
            }
          },
          completed() {
            group.destroy();
          },
        },
      },
    });
    group.add(ellipse1);
  });
};
