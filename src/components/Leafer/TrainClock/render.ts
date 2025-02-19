import { Ellipse, Group, Leafer, Path, Polygon, Rect } from 'leafer-ui'
import '@leafer-in/animate'
import '@leafer-in/motion-path'
export const render = (leafer: Leafer) => {
  renderBg(leafer)

  const secondsGroup = new Group()
  renderSeconds(secondsGroup)
  renderSecondsPointer(secondsGroup)
  leafer.add(secondsGroup)

  const minuteGroup = new Group()
  renderMinutes(minuteGroup)
  renderMinutesPointer(minuteGroup)
  leafer.add(minuteGroup)

  const hourGroup = new Group()
  renderHours(hourGroup)
  renderHoursPointer(hourGroup)
  leafer.add(hourGroup)
}

const renderBg = (leafer: Leafer) => {
  const bg = new Ellipse({
    x: 25,
    y: 25,
    width: 550,
    height: 550,
    innerRadius: 1,
    fill: {
      type: 'radial',
      stops: [
        { offset: 0, color: 'rgb(0, 255, 0)' },
        { offset: 0.2, color: 'rgb(0, 255, 0)' },
        { offset: 1, color: 'rgb(0, 0, 0)' }
      ]
    }
  })
  leafer.add(bg)
}

const renderSeconds = (group: Group) => {
  renderBase(group, 250, -180 - 18, 180 - 18)

  for (let i = 0; i < 120; i++) {
    if (i % 2 === 0) {
      const result = computedPoint(i * 3 - 1.5, (i + 1) * 3 - 1.5, 205, 265, 300, 300)
      const polygon = new Polygon({
        points: result,
        fill: '#d2b48c'
      })
      group.add(polygon)
    }
  }
}
const renderMinutes = (group: Group) => {
  const date = new Date()
  const seconds = date.getSeconds()
  const minute = date.getMinutes()
  const totalSeconds = seconds + minute * 60

  renderBase(group, 170, -180 + totalSeconds / 10 - 27, 180 + totalSeconds / 10 - 27)
  for (let i = 0; i < 60; i++) {
    if (i % 2 === 0) {
      const result = computedPoint(i * 6 - 3, (i + 1) * 6 - 3, 125, 185, 300, 300)

      const polygon = new Polygon({
        points: result,
        fill: '#d2b48c'
      })

      group.add(polygon)
    }
  }
}
const renderHours = (group: Group) => {
  const date = new Date()
  const seconds = date.getSeconds()
  const minutes = date.getMinutes()
  const hour = date.getHours() - 12
  const totalSeconds = seconds + minutes * 60 + hour * 60 * 60

  renderBase(group, 100, -180 + totalSeconds / 120 - 50, 180 + totalSeconds / 120 - 50)
  for (let i = 0; i < 24; i++) {
    if (i % 2 === 0) {
      const result = computedPoint(i * 15 - 7.5, (i + 1) * 15 - 7.5, 60, 110, 300, 300)
      const polygon = new Polygon({
        points: result,
        fill: '#d2b48c'
      })

      group.add(polygon)
    }
  }
}

const renderBase = (group: Group, radius: number, startAngle: number, endAngle: number) => {
  const minutesBg = new Path({
    stroke: 'rgb(102, 102, 102)',
    strokeWidth: 30
  })
  minutesBg.pen.drawArc(300, 300, radius - 15)
  group.add(minutesBg)

  const minutesWrapper = new Path({
    stroke: '#fff',
    strokeWidth: 5
  })
  group.add(minutesWrapper)
  minutesWrapper.rotateOf({ x: 300, y: 300 }, 90)
  minutesWrapper.pen.drawArc(300, 300, radius)

  const innerWrapper = new Path({
    stroke: '#fff',
    strokeWidth: 5
  })
  group.add(innerWrapper)
  innerWrapper.rotateOf({ x: 300, y: 300 }, 90)
  innerWrapper.pen.drawArc(300, 300, radius - 30)

  const animateLine = new Path({
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 5,
    motionPath: true
  })
  group.add(animateLine)

  animateLine.rotateOf({ x: 300, y: 300 }, 90)
  animateLine.pen.drawArc(300, 300, radius - 35, startAngle, endAngle)
}

const renderSecondsPointer = (group: Group) => {
  const wrapperGroup = new Group({
    motionRotation: 6,
    animation: {
      // 沿 path 运动至 100%
      style: { motion: { type: 'percent', value: 1 } },
      duration: 60,
      easing: 'linear',
      loop: true
    }
  })
  group.add(wrapperGroup)
  const oneGroup = new Group()
  wrapperGroup.add(oneGroup)
  const path1 = new Path({
    path: 'X 0 0 45 33 7',
    fill: 'rgb(254, 50, 66)'
  })
  oneGroup.add(path1)
  const path2 = new Path({
    path: 'X 5 30 38 30 7',
    fill: 'rgb(254, 50, 66)'
  })
  oneGroup.add(path2)
  const path4 = new Path({
    path: 'P 23 52 17',
    fill: 'rgb(254, 50, 66)'
  })
  oneGroup.add(path4)
  const path3 = new Path({
    path: 'X 7.5 35 30 25 7',
    fill: 'rgb(255, 239, 50)'
  })
  oneGroup.add(path3)
  const path5 = new Path({
    path: 'P 23 55 12',
    fill: 'rgb(168, 168, 168)'
  })
  oneGroup.add(path5)
  const path6 = new Path({
    path: 'P 23 55 7',
    fill: 'rgb(85, 85, 85)'
  })
  oneGroup.add(path6)
  const pointer = new Rect({
    x: -18,
    y: -60,
    width: 40,
    height: 60,
    stroke: 'rgb(254, 105, 50)',
    strokeWidth: 10,
    fill: 'rgb(204, 86, 40)',
    rotation: -18
  })
  wrapperGroup.add(pointer)
  const pointer1 = new Rect({
    x: -50,
    y: -115,
    width: 40,
    height: 60,
    stroke: 'rgb(254, 105, 50)',
    strokeWidth: 10,
    fill: 'rgb(204, 86, 40)',
    rotation: -32
  })
  wrapperGroup.add(pointer1)
  const pointer2 = new Rect({
    x: -95,
    y: -160,
    width: 40,
    height: 60,
    stroke: 'rgb(254, 105, 50)',
    strokeWidth: 10,
    fill: 'rgb(204, 86, 40)',
    rotation: -47
  })
  wrapperGroup.add(pointer2)
}

const renderMinutesPointer = (group: Group) => {
  const wrapperGroup = new Group({
    motionRotation: 12,
    animation: {
      // 沿 path 运动至 100%
      style: { motion: { type: 'percent', value: 1 } },
      duration: 3600,
      easing: 'linear',
      loop: true
    }
  })
  group.add(wrapperGroup)
  const oneGroup = new Group()
  wrapperGroup.add(oneGroup)
  const path1 = new Path({
    path: 'X 0 0 45 33 7',
    fill: 'rgb(254, 50, 66)'
  })
  oneGroup.add(path1)
  const path2 = new Path({
    path: 'X 5 30 38 30 7',
    fill: 'rgb(254, 50, 66)'
  })
  oneGroup.add(path2)
  const path4 = new Path({
    path: 'P 23 52 17',
    fill: 'rgb(254, 50, 66)'
  })
  oneGroup.add(path4)
  const path3 = new Path({
    path: 'X 7.5 35 30 25 7',
    fill: 'rgb(255, 239, 50)'
  })
  oneGroup.add(path3)
  const path5 = new Path({
    path: 'P 23 55 12',
    fill: 'rgb(168, 168, 168)'
  })
  oneGroup.add(path5)
  const path6 = new Path({
    path: 'P 23 55 7',
    fill: 'rgb(85, 85, 85)'
  })
  oneGroup.add(path6)
  const pointer = new Rect({
    x: -26,
    y: -60,
    width: 40,
    height: 60,
    stroke: 'rgb(254, 105, 50)',
    strokeWidth: 10,
    fill: 'rgb(204, 86, 40)',
    rotation: -26
  })
  wrapperGroup.add(pointer)
  const pointer1 = new Rect({
    x: -80,
    y: -100,
    width: 40,
    height: 60,
    stroke: 'rgb(254, 105, 50)',
    strokeWidth: 10,
    fill: 'rgb(204, 86, 40)',
    rotation: -55
  })
  wrapperGroup.add(pointer1)
}

const renderHoursPointer = (group: Group) => {
  const wrapperGroup = new Group({
    motionRotation: 25,
    animation: {
      // 沿 path 运动至 100%
      style: { motion: { type: 'percent', value: 1 } },
      duration: 3600 * 12,
      easing: 'linear',
      loop: true
    }
  })
  group.add(wrapperGroup)
  const oneGroup = new Group()
  wrapperGroup.add(oneGroup)
  const path1 = new Path({
    path: 'X 0 0 45 33 7',
    fill: 'rgb(254, 50, 66)'
  })
  oneGroup.add(path1)
  const path2 = new Path({
    path: 'X 5 30 38 30 7',
    fill: 'rgb(254, 50, 66)'
  })
  oneGroup.add(path2)
  const path4 = new Path({
    path: 'P 23 52 17',
    fill: 'rgb(254, 50, 66)'
  })
  oneGroup.add(path4)
  const path3 = new Path({
    path: 'X 7.5 35 30 25 7',
    fill: 'rgb(255, 239, 50)'
  })
  oneGroup.add(path3)
  const path5 = new Path({
    path: 'P 23 55 12',
    fill: 'rgb(168, 168, 168)'
  })
  oneGroup.add(path5)
  const path6 = new Path({
    path: 'P 23 55 7',
    fill: 'rgb(85, 85, 85)'
  })
  oneGroup.add(path6)
  const pointer = new Rect({
    x: 24,
    y: -38,
    width: 40,
    height: 60,
    stroke: 'rgb(254, 105, 50)',
    strokeWidth: 10,
    fill: 'rgb(204, 86, 40)',
    rotation: 125
  })
  wrapperGroup.add(pointer)
}

const computedPoint = (
  startAngle: number,
  endAngle: number,
  startRadius: number,
  endRadius: number,
  baseX: number,
  baseY: number
) => {
  const startRadian = (startAngle * Math.PI) / 180
  const endRadian = (endAngle * Math.PI) / 180
  return [
    baseX + startRadius * Math.cos(startRadian),
    baseY + startRadius * Math.sin(startRadian),
    baseX + startRadius * Math.cos(endRadian),
    baseY + startRadius * Math.sin(endRadian),

    baseX + endRadius * Math.cos(endRadian),
    baseY + endRadius * Math.sin(endRadian),
    baseX + endRadius * Math.cos(startRadian),
    baseY + endRadius * Math.sin(startRadian)
  ]
}
