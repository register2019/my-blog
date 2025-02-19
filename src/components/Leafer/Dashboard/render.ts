import { Leafer, Ellipse, Text, Line, Polygon } from 'leafer-ui'

const startAngle = -230
const endAngle = 50

const render = (leafer: Leafer, val: number) => {
  renderBg(leafer)
  renderScale(leafer)
  val = val > 100 ? 100 : val
  renderNum(leafer, val)
  renderPointer(leafer, val)
  renderDynamicText(leafer, val)
}

const renderBg = (leafer: Leafer) => {
  const bg = new Ellipse({
    x: 300,
    y: 300,
    width: 400,
    height: 400,
    startAngle,
    endAngle,
    innerRadius: 1,
    stroke: 'rgb(91,107,97)',
    strokeWidth: 10,
    strokeAlign: 'center',
    strokeCap: 'round'
  })
  leafer.add(bg)
}
const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180
}
type PointStyle = {
  textAlign: 'left' | 'center' | 'right'
  verticalAlign: 'top' | 'middle' | 'bottom'
}

type NumPoint = {
  [key: string]: PointStyle
}
const renderScale = (leafer: Leafer) => {
  const numPoint: NumPoint = {
    '0': {
      textAlign: 'left',
      verticalAlign: 'middle'
    },
    '10': {
      textAlign: 'left',
      verticalAlign: 'middle'
    },
    '20': {
      textAlign: 'left',
      verticalAlign: 'middle'
    },
    '30': {
      textAlign: 'left',
      verticalAlign: 'middle'
    },
    '40': {
      textAlign: 'center',
      verticalAlign: 'top'
    },
    '50': {
      textAlign: 'center',
      verticalAlign: 'top'
    },
    '60': {
      textAlign: 'center',
      verticalAlign: 'top'
    },
    '70': {
      textAlign: 'right',
      verticalAlign: 'middle'
    },
    '80': {
      textAlign: 'right',
      verticalAlign: 'middle'
    },
    '90': {
      textAlign: 'right',
      verticalAlign: 'middle'
    },
    '100': {
      textAlign: 'right',
      verticalAlign: 'middle'
    }
  }
  for (let i = 0; i <= 10; i++) {
    const scaleNumAngle = 40 + i * 28
    const radian = degreesToRadians(scaleNumAngle)

    const width = 160 * Math.sin(radian)
    const height = 160 * Math.cos(radian)
    const x = 500 - width
    const y = 500 + height
    const text = (i * 10).toString()
    const scale = new Text({
      x,
      y,
      textAlign: numPoint[text].textAlign,
      verticalAlign: numPoint[text].verticalAlign,
      fontSize: 14,
      fill: '#FFFFFF',
      text
    })
    leafer.add(scale)
  }

  for (let i = 0; i < 51; i++) {
    const scaleAngle = -140 + i * (28 / 5)
    const radian = degreesToRadians(scaleAngle)

    const startX = 500 - 190 * Math.sin(radian)
    const startY = 500 - 190 * Math.cos(radian)
    const endX = 500 - 170 * Math.sin(radian)
    const endY = 500 - 170 * Math.cos(radian)
    const line = new Line({
      points: [startX, startY, endX, endY],
      strokeWidth: i % 5 === 0 ? 5 : 1,
      stroke: '#FFFFFF'
    })
    leafer.add(line)
  }
}

const renderNum = (leafer: Leafer, val: number) => {
  val = startAngle + val * 2.8
  const num = new Ellipse({
    x: 300,
    y: 300,
    width: 400,
    height: 400,
    startAngle,
    animation: {
      keyframes: [{ endAngle: startAngle }, { endAngle: val }],
      easing: 'ease-in-out',
      duration: 1
    },
    innerRadius: 1,
    stroke: 'rgb(50,205,121)',
    strokeWidth: 10,
    strokeAlign: 'center',
    strokeCap: 'round'
  })
  leafer.add(num)
}

const renderPointer = (leafer: Leafer, val: number) => {
  val = -140 + val * 2.8
  const pointer = new Polygon({
    x: 500,
    y: 500,
    points: [-10, 10, 0, -70, 10, 10, 0, 20],
    fill: 'rgb(50,205,121)',
    animation: {
      keyframes: [
        {
          rotation: -140
        },
        {
          rotation: val
        }
      ],
      easing: 'ease-in-out',
      duration: 1
    }
  })
  leafer.add(pointer)
}

const renderDynamicText = (leafer: Leafer, val: number) => {
  const scale = new Text({
    x: 500,
    y: 540,
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: 20,
    fill: '#EFEFEF',
    text: 'SCORE'
  })
  leafer.add(scale)
  let i = 0
  const text = new Text({
    x: 500,
    y: 580,
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: 30,
    fill: '#FFFFFF',
    animation: {
      keyframes: [{ text: '0' }, { text: val.toString() }],
      event: {
        update: () => {
          const dynamicText = i++
          dynamicText <= val && (text.text = dynamicText.toString())
        }
      },
      easing: 'ease-in-out',
      duration: 1
    }
  })
  leafer.add(text)
}

export default render
