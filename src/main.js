import * as THREE from "three"
import WindowContext from "./js/WindowContext"
import SceneBouncingBubbles from "./js/scenarios/BouncingBubbles/SceneBouncingBubbles"
import { askMotionAccess } from "./js/utils/device/DeviceAccess"
import SceneScenario3D from "./js/scenarios/Scenario3D/SceneScenario3D"

/** device access */
const btn = document.getElementById("btn-access")
btn.addEventListener("click", askMotionAccess(), false)

/** reload */
const btnReload = document.getElementById("btn-reload")
btnReload.addEventListener("click", function () {
    window.location.reload()
}, false)

/** scenarios */
const scene1 = new SceneBouncingBubbles(10)
const scene2 = new SceneScenario3D("canvas-scene-3d")
const scene3 = new SceneBouncingBubbles(10, "canvas-scene-2")

const windowContext = new WindowContext()
console.log(windowContext.scenes)
const time = windowContext.time

const update = () => {

    /** 1 -> check des bulles dans les différents scénarios */
    const outFromScene1 = scene1.bubbles.filter(b => { return b.x < scene1.height / 5 }) // remove bubbles
    const outFromScene2 = scene2.bubbles.filter(b => { return b.y > scene2.height / 2 })
    const outFromScene3 = scene3.bubbles.filter(b => { return b.x < scene3.height / 5 }) // remove bubbles

    /** 2 -> mise à jour des scénarios */
    outFromScene1.forEach(b => {
        scene1.removeBubble(b)

        scene2.addBubble(b.x, b.y)
    })
    outFromScene2.forEach(b => {
        scene2.removeBubble(b)

        scene1.addBubble(b.x, b.y, b.vx, b.vy)
        console.log("outFromScene2")
    })
    outFromScene3.forEach(b => {
        scene3.removeBubble(b)

        scene2.addBubble(b.x, b.y)
    })

    
}

time.on('update', update)

