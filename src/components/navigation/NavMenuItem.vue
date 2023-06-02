<template>
  <div>
    <v-list-item v-if="!(menuItem.children && menuItem.children.length > 0)" :to="menuItem.routePath"
                 density="comfortable" link>
      <template #prepend>
        <v-icon :size="small ? 'x-small' : 'default'" :class="{ 'same-size': small }">
          {{ menuItem.icon || "mdi-circle-medium" }}
        </v-icon>
      </template>
      <v-list-item-title>
        {{ $t(menuItem.label) }}
      </v-list-item-title>
    </v-list-item>

    <v-list-group v-else active-color="primary" :subgroup="subgroup" collapse-icon="mdi-menu-up"
                  expand-icon="mdi-menu-down">
      <template #activator="{ props }">
        <v-list-item density="comfortable" v-bind="props" :title="$t(menuItem.label)">
          <template #prepend>
            <v-icon v-if="!subgroup" :size="small ? 'x-small' : 'default'" :class="{ 'same-size': small }">
              {{ menuItem.icon || "mdi-circle-medium" }}
            </v-icon>
          </template>
        </v-list-item>
      </template>

      <slot></slot>
    </v-list-group>
  </div>
</template>

<script setup>

defineProps({
  menuItem: {
    type: Object,
    default: () => {
    },
  },
  subgroup: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "scss/settings";

.same-size {
  width: calc(var(--v-icon-size-multiplier) * #{map.get(settings.$icon-sizes, "default")});
}

.v-list-group :deep(.v-list-item) {
  padding-inline-start: settings.$spacer !important;
}

.v-list-group--subgroup :deep(.v-list-group__items .v-list-item) {
  padding-inline-start: settings.$spacer * 5 !important;
}
</style>
