let exitCount = 0
let enterCount = 0
let exitDetected = false
let enterDetected = false
Microbit.init()
// 是否检测到离开
basic.forever(function () {
    // 外侧传感器检测到距离小于阈值，表示有人靠近门
    if (Microbit.farState(Write_pin.w0) == 0) {
        enterDetected = true
    }
    // 内侧传感器检测到距离小于阈值，表示有人通过门进入或离开
    if (Microbit.farState(Write_pin.w2) == 0) {
        exitDetected = true
    }
    // 如果先检测到进入，增加进入人次
    if (enterDetected && exitDetected) {
        enterCount += 1
        // 重置进入检测状态
        enterDetected = false
    }
    // 如果先检测到离开，增加离开人次
    if (exitDetected && !(enterDetected)) {
        exitCount += 1
        // 重置离开检测状态
        exitDetected = false
    }
    Microbit.showNumber(Oled.oled1, enterCount)
    Microbit.showNumber(Oled.oled51, exitCount)
    basic.pause(2000)
})
