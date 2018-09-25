export const getPanpelPosition = (event: MouseEvent) => {
  let panelX: number
  let panelY: number
  let maxHeight: number
  let showPanelBeneathTheMouse: boolean = true

  const { clientX: mousePositionX, clientY: mousePositionY } = event
  const { innerHeight, innerWidth } = window

  const offsetX = innerWidth - mousePositionX - 550

  if (offsetX <= 0) {
    panelX = mousePositionX + offsetX - 30
  } else {
    panelX = mousePositionX - 10
  }

  // when the mouse in the area below the 60% height of window,
  // show result panel above the mouse,
  // otherwise beneath it.
  if (mousePositionY > innerHeight * 0.6) {
    showPanelBeneathTheMouse = false
    panelY = innerHeight - mousePositionY + 30
  } else {
    panelY = mousePositionY + 15
  }

  maxHeight = innerHeight - panelY - 10

  return {
    showPanelBeneathTheMouse,
    panelX,
    panelY,
    buttonX: mousePositionX,
    buttonY: mousePositionY + 15,
    panelMaxHeight: maxHeight
  }
}
