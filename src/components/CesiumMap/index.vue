<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

defineOptions({ name: 'CesiumMap' })

const mapContainer = ref<HTMLDivElement | null>(null)
let viewer: InstanceType<typeof import('cesium').Viewer> | null = null

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN

onMounted(async () => {
  const tdtToken = import.meta.env.VITE_TDT_TOKEN

  viewer = new Cesium.Viewer(mapContainer.value!, {
    baseLayer: false,
    terrainProvider: await Cesium.createWorldTerrainAsync(),
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    navigationHelpButton: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    creditContainer: document.createElement('div'),
  })

  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url: `/tdt/img_w/wmts?tk=${tdtToken}`,
      format: 'tiles',
      layer: 'img',
      style: 'default',
      tileMatrixSetID: 'w',
      maximumLevel: 18,
      enablePickFeatures: false,
    }),
  )

  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url: `/tdt/cva_w/wmts?tk=${tdtToken}`,
      layer: 'cva',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'w',
      maximumLevel: 18,
      enablePickFeatures: false,
    }),
  )

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(110, 35, 12000000),
  })

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(104.49531490292091, 24.965421496782675, 3000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: Cesium.Math.toRadians(0),
    },
  })
})

onUnmounted(() => {
  if (viewer) {
    viewer.destroy()
    viewer = null
  }
})
</script>

<template>
  <div ref="mapContainer" class="cesium-map" />
</template>

<style scoped>
.cesium-map {
  width: 100%;
  height: 100%;
}
</style>
