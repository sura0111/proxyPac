<template>
  <vBanner lines="one" border="none" density="compact" bg-color="transparent">
    <template #text v-if="$slots.text">
      <slot name="text"></slot>
    </template>
    <template #actions v-if="$slots.actions">
      <slot name="actions"></slot>
    </template>
  </vBanner>
</template>