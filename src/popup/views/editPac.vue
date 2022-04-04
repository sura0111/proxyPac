<template>
  <v-row no-gutters class="editPac">
    <v-col cols="12">
      <v-text-field
        v-model.trim="name"
        label="Name"
        aria-label="Name"
        placeholder="Name"
        outlined
        dense
        flat
        filled
        @change="edited = true"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <pac-input v-model="url" @change="edited = true"></pac-input>
    </v-col>
    <v-col cols="12" class="d-flex justify-center" v-if="isLoadingPacValue">
      <v-icon class="ma-3">mdi-spin mdi-loading</v-icon>
    </v-col>
    <v-col cols="12" v-else>
      <span class="text-body-2">Loaded info</span>
      <pre v-html="value" class="mb-2"></pre>
    </v-col>
    <v-col cols="12">
      <v-btn class="mr-1" @click="savePac" elevation="0" color="primary" :disabled="!canSave" small>Save</v-btn>
      <v-btn class="mr-1" @click="deletePac" elevation="0" color="error" small>Delete</v-btn>
      <v-btn @click="goToSettingsTop" elevation="0" text small>Cancel</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { PAGE } from '@/constants'
import { computed, defineComponent, onMounted, PropType, ref } from '@vue/composition-api'
import { Pac } from '../definitions/pac'
import { usePacService } from '../services/pacService'
import { useRouter } from '../../vendors/vue-router'
import pacInput from '../components/pacInput.vue'

export default defineComponent({
  name: 'EditPacPage',
  components: {
    pacInput: pacInput,
  },
  props: {
    pac: {
      type: Object as PropType<Pac | null>,
      default: () => null,
    },
  },
  setup(props) {
    const router = useRouter()
    const privateUrl = ref('')
    const isLoadingPacValue = ref(false)
    const lazyTimer = ref<number | undefined>(undefined)
    const edited = ref(false)
    const name = ref('')
    const value = ref('')

    const { getPacValue, editPac, deletePac: deletePacSetting } = usePacService()

    const url = computed<string>({
      get() {
        return privateUrl.value
      },
      set(v) {
        privateUrl.value = v
        clearTimeout(lazyTimer.value)
        isLoadingPacValue.value = true
        lazyTimer.value = window.setTimeout(async () => {
          value.value = await getPacValue(privateUrl.value)
          isLoadingPacValue.value = false
        }, 1000)
      },
    })

    const canSave = computed(() => {
      return name.value && url.value && edited.value
    })

    const goToSettingsTop = () => {
      return router.push({ name: PAGE.settings })
    }

    const savePac = async () => {
      editPac({ name: name.value, url: url.value }, { name: props.pac?.name })
      goToSettingsTop()
    }

    const deletePac = async () => {
      deletePacSetting(name.value)
      goToSettingsTop()
    }

    onMounted(async () => {
      console.log(props.pac)
      const pac = props.pac
      if (!pac) {
        goToSettingsTop()
        return
      }
      name.value = pac.name
      privateUrl.value = pac.url ?? ''
      value.value = await getPacValue(privateUrl.value)
    })

    return {
      name,
      isLoadingPacValue,
      url,
      edited,
      value,
      canSave,
      deletePac,
      savePac,
      goToSettingsTop,
    }
  },
})
</script>
<style lang="scss" scoped>
.editPac {
  pre {
    font-family: 'Osaka', 'Menlo', 'Courier New', Courier, monospace;
    width: 100%;
    max-height: 200px;
    overflow: scroll;
    background-color: #333;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>
