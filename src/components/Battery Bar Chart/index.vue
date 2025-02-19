<template>
  <div ref="chartRef" style="width: 600px; height: 600px; background-color: #06164a"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 获取 DOM 元素的引用
const chartRef = ref<HTMLDivElement | null>(null)

// 初始化图表
onMounted(() => {
  if (chartRef.value) {
    const myChart = echarts.init(chartRef.value)

    // 配置柱状图选项
    const option = {
      grid: {
        left: '4%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      yAxis: {
        inverse: true,
        type: 'category',
        data: ['React', 'Angular', 'Vue'],
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14,
            color: '#FFF'
          }
        }
      },
      series: [
        {
          // 背景
          type: 'pictorialBar',
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: 2, // 背景间隔
          symbol: 'rect',
          symbolSize: [10, 20],
          itemStyle: {
            normal: {
              color: '#EFEFEF'
            }
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              offset: [0, 2],
              distance: 30,
              textStyle: {
                color: '#409EFF',
                fontSize: 14
              },
              formatter: function (a: { value: number }) {
                return `${a.value}%`
              }
            }
          },
          data: [90, 70, 80],
          z: 0,
          animationEasing: 'elasticOut'
        },
        // 真实值
        {
          type: 'pictorialBar',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#1577FF' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#409EFF' // 100% 处的颜色
                }
              ]
            }
          },
          symbolRepeat: 'fixed',
          symbolMargin: 2, // 背景间隔
          symbol: 'rect',
          symbolSize: [10, 20],
          symbolClip: true,
          data: [90, 70, 80],
          z: 2,
          animationEasing: 'elasticOut'
        }
      ]
    }

    // 设置配置项并渲染图表
    myChart.setOption(option)

    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
      myChart.resize()
    })
  }
})

// 销毁图表实例
onUnmounted(() => {
  if (chartRef.value) {
    echarts.dispose(chartRef.value)
  }
})
</script>

<style scoped>
/* 样式可以根据需要自定义 */
</style>
