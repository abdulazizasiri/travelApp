let button = document.getElementById("add_City")
let inputField = document.getElementById("name")
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

    if (code === 1) {
        console.log("Event " + event)
        document.getElementsByClassName("modal-bg")[0].classList.add("bg-active")
        console.log("Button " + button.innerText)

        if (button.disabled === true) {
            console.log("Disabled")
            button.addEventListener("mousedown", function() {
                button.background = 'red'
            })

            // button.style.background = 
        }

    }
    if (code === 2) {
        console.log("Close")
        document.getElementsByClassName("modal-bg")[0].classList.remove("bg-active")

    }

    if (code === 3) {
        // let value = document.getElementById("modal-bg")
        console.log("Clicked addd trips")
    }


    // element.classList.toggle("active")
}

function changeAttributes() {
    console.log("Hello")
}


export { showPopup }