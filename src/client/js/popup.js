// button.disabled = false
// inputField.addEventListener("keydown", function(e) {
//     let input = ""
//     input.concat(e.key)
//     console.log("Keyboard " + input)
//     if (inputField.value === "") {
//         button.style.background = "red"
//         button.disabled = false
//     }
// })


function showPopup(event, code) {
    let button = document.getElementById("add_City")

    if (code === 1) {
        console.log("Event " + event)

        document.getElementsByClassName("modal-bg")[0].classList.add("bg-active")
        console.log("Button " + button.innerText)


    }
    if (code === 2) {
        console.log("Close")
        document.getElementsByClassName("modal-bg")[0].classList.remove("bg-active")

    }

    if (code === 3) {
        // let value = document.getElementById("modal-bg")
        console.log("Clicked addd trips")
        let inputField = document.getElementById("name")
        let result = document.getElementById("result")
        if (inputField.value === "") {
            result.innerText = "You have to enter a city"
            result.style.marginBottom = "5px"
            result.style.color = "red"
        }
        console.log(inputField.value)

    }


    // element.classList.toggle("active")
}

// function changeAttributes() {
//     console.log("Hello")
// }


export { showPopup }