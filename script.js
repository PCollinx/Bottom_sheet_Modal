const showModalBtn = document.querySelector(".show-modal")
const bottomSheet = document.querySelector(".bottom-sheet")
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay")
const sheetContent = bottomSheet.querySelector(".content")
const dragIcon = bottomSheet.querySelector(".drag-icon")

// Global variables for tracking drag events
let isDragging = false, startY, startHeight

const showBottomSheet = () => {
    bottomSheet.classList.add("show")
    document.body.style.overflowY = "hidden"
    updateSheetHeight(50)
}

const hideBottomSheet = () => {
    bottomSheet.classList.remove("show")
    document.body.style.overflowY = "auto"
}

const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}vh` //updates the height of the sheet content
    // Toggles the fullscreen class to bottomSheet if the height is equal to 100
    bottomSheet.classList.toggle("fullscreen", height === 100)
}

// Sets initial drag position and sheetContent height
const dragStart = (e) => {
    isDragging = true
    startY = e.pageY || e.touches?.[0].pageY
    startHeight = parseInt(sheetContent.style.height)
    bottomSheet.classList.add("dragging")
}

//  Calculate the new height for the sheet content and call the updateSheetHeight funtion
const dragging = (e) => {
    if(!isDragging) return
    const delta = startY - (e.pageY || e.touches?.[0].pageY)
    const newHeight = startHeight + delta / window.innerHeight * 100
    updateSheetHeight(newHeight)
}
// Determine whether to hide, set to fullscreen, or set to default height based on the current height of the sheet content
const dragStop = () => {
    isDragging = false
    bottomSheet.classList.remove("dragging")
    const sheetHeight = parseInt(sheetContent.style.height)
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50)
}

document.addEventListener("mouseup", dragStop)
dragIcon.addEventListener("mousedown", dragStart)
document.addEventListener("mousemove", dragging)

document.addEventListener("touchend", dragStop)
dragIcon.addEventListener("touchstart", dragStart)
document.addEventListener("touchmove", dragging)

showModalBtn.addEventListener("click", showBottomSheet)
sheetOverlay.addEventListener("click", hideBottomSheet)

