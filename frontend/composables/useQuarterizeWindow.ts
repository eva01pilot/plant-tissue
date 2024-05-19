//import type {VNode} from "vue"
//type WindowPosition = {
//  x: number
//  y: number
//  xSpan: number
//  ySpan: number
//}
//type WindowQuarter = {
//  position: WindowPosition
//  slot: VNode
//}
//
//type QuarterizationConfig = {
//  quarters: WindowQuarter[]
//}
//
//export const useQuarterizeWindow = (initialConfig:QuarterizationConfig) => {
//  const config = ref<QuarterizationConfig>(initialConfig)
//
//  const addQuarter = (slot: WindowQuarter["slot"]) => {
//      const newQuarter: WindowQuarter = {
//        slot:slot,
//        position: calculatePosition()
//      }
//
//
//  }
//
//  const calculatePosition = () => {
//    switch (config.value.quarters.length) {
//      case 1: {
//        const pos:WindowPosition = {
//          x: 1,
//          xSpan:1,
//          y: 0,
//          ySpan: 2
//        }
//        return pos
//      }
//      case 2: {
//        const pos:WindowPosition = {
//          x: 0,
//          xSpan: 2,
//
//        }
//      }
//    }
//
//  }
//
//
//}
