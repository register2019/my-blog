<template>
  <div class="wrapper">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <div class="layer4"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@use "sass:list";

.wrapper {
  background-color: #000;
}

@function get-box-shadow($count) {
  $shadow: ();
  @for $i from 1 through $count {
    $shadow: list.append($shadow, math.random(100) + vw math.random(100) + vh, comma);
  }
  @return $shadow;
}

$durations: 1000s;
@for $i from 1 through 4 {
  $size: #{$i}px;
  $durations: math.div($durations, 2);
  $count: math.floor(math.div(200, (4 - $i + 1)));
  .layer#{$i} {
    position: fixed;
    left: 0;
    top: 0;
    width: $size;
    height: $size;
    border-radius: $size;
    box-shadow: get-box-shadow($count);
    animation: ball-move $durations linear infinite;
    &::after {
      content: '';
      position: fixed;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      box-shadow: inherit;
      left: 0;
      top: 100vh;
    }
  }
}

@keyframes ball-move {
  to {
    transform: translateY(-100vh);
  }
}
</style>

