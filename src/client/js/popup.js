function showPopup(event, code) {
    if (code === 1) {
        console.log("Event " + event)
        document.getElementsByClassName("modal-bg")[0].classList.add("bg-active")
    }
    if (code === 2) {
        console.log("Close")
        document.getElementsByClassName("modal-bg")[0].classList.remove("bg-active")

    }

    // element.classList.toggle("active")
}


export { showPopup }