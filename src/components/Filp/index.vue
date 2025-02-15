<template>
  <div class="wrapper">
    <div class="clock">
      <div class="flip">
        <div class="digital front" data-number="0"></div>
        <div class="digital back" data-number="1"></div>
      </div>
      <div class="flip">
        <div class="digital front" data-number="0"></div>
        <div class="digital back" data-number="1"></div>
      </div>
      <em class="divider">:</em>
      <div class="flip">
        <div class="digital front" data-number="0"></div>
        <div class="digital back" data-number="1"></div>
      </div>
      <div class="flip">
        <div class="digital front" data-number="0"></div>
        <div class="digital back" data-number="1"></div>
      </div>
      <em class="divider">:</em>
      <div class="flip">
        <div class="digital front" data-number="0"></div>
        <div class="digital back" data-number="1"></div>
      </div>
      <div class="flip">
        <div class="digital front" data-number="0"></div>
        <div class="digital back" data-number="1"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

class Flipper {
  private isFlipping: boolean = false
  private duration: number = 600
  private flipNode: HTMLElement
  private frontNode: HTMLElement
  private backNode: HTMLElement

  constructor(node: HTMLElement, currentTime: string, nextTime: string) {
    this.flipNode = node
    this.frontNode = node.querySelector('.front') as HTMLElement
    this.backNode = node.querySelector('.back') as HTMLElement
    this.setFrontTime(currentTime)
    this.setBackTime(nextTime)
  }

  setFrontTime(time: string): void {
    this.frontNode.dataset.number = time
  }

  setBackTime(time: string): void {
    this.backNode.dataset.number = time
  }

  flipDown(currentTime: string, nextTime: string): void {
    if (this.isFlipping) return
    this.isFlipping = true
    this.setFrontTime(currentTime)
    this.setBackTime(nextTime)
    this.flipNode.classList.add('running')
    setTimeout(() => {
      this.flipNode.classList.remove('running')
      this.isFlipping = false
      this.setFrontTime(nextTime)
    }, this.duration)
  }
}

const getTimeFromDate = (date: Date): string => {
  return date.toTimeString().slice(0, 8).split(':').join('')
}

onMounted(() => {
  const flips = document.querySelectorAll('.flip') as NodeListOf<HTMLElement>
  const now = new Date()
  const nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000))
  const nextTimeStr = getTimeFromDate(now)
  const flippers = Array.from(flips).map((flip, i) => {
    return new Flipper(flip, nowTimeStr[i], nextTimeStr[i])
  })

  setInterval(() => {
    const now = new Date()
    const nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000))
    const nextTimeStr = getTimeFromDate(now)
    for (let i = 0; i < flippers.length; i++) {
      if (nowTimeStr[i] === nextTimeStr[i]) {
        continue
      }
      flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i])
    }
  }, 1000)
})
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh !important;
}
.clock {
  display: flex;
}

/* 时钟的分隔 */
.clock .divider {
  font-size: 66px;
  line-height: 102px;
  font-style: normal;
  color: rgb(51, 50, 50);
}

/* 时钟的卡片 */
.clock .flip {
  position: relative;
  width: 60px;
  height: 100px;
  margin: 2px;
  font-size: 70px;
  font-weight: 700;
  line-height: 100px;
  text-align: center;
  background: rgb(46, 45, 45);
  border: 1px solid rgb(34, 33, 33);
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(54, 54, 54, 0.5);
}

/* 时钟上的数字 */
.clock .flip .digital::before,
.clock .flip .digital::after {
  position: absolute;
  content: attr(data-number);
  left: 0;
  right: 0;
  color: white;
  background: rgb(51, 50, 50);
  overflow: hidden;
  -webkit-perspective: 160px;
  perspective: 160px;
}

/* 翻页前的数字 */
.clock .flip .digital::before {
  top: 0;
  bottom: 50%;
  border-bottom: 1px solid #666;
  border-radius: 10px 10px 0 0;
}

/* 翻页后的数字 */
.clock .flip .digital::after {
  top: 50%;
  bottom: 0;
  line-height: 0;
  border-radius: 0 0 10px 10px;
}

.clock .flip .back::before,
.clock .flip .front::after {
  z-index: 1;
}
.clock .flip .back::after {
  z-index: 2;
}
.clock .flip .front::before {
  z-index: 3;
}

.clock .flip .back::after {
  transform-origin: center top;
  transform: rotateX(0.5turn);
}

.clock .flip.running .front::before {
  transform-origin: center bottom;
  animation: frontFlipDown 0.6s ease-in-out;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.clock .flip.running .back::after {
  animation: backFlipDown 0.6s ease-in-out;
}

@-webkit-keyframes frontFlipDown {
  to {
    transform: rotateX(0.5turn);
  }
}

@keyframes frontFlipDown {
  to {
    transform: rotateX(0.5turn);
  }
}

@-webkit-keyframes backFlipDown {
  to {
    transform: rotateX(0);
  }
}

@keyframes backFlipDown {
  to {
    transform: rotateX(0);
  }
}
</style>
