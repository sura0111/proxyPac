<template>
  <vBanner lines="one" border="none" density="compact" bg-color="transparent">
    <template v-if="$slots.text" #text>
      <slot name="text"></slot>
    </template>
    <template v-if="$slots.actions" #actions>
      <slot name="actions"></slot>
    </template>
  </vBanner>
</template>