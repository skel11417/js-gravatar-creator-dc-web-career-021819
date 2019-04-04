document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded")
  const form = document.querySelector("#identicon-form")
  const identicon = document.querySelector('#identicon')
  form.addEventListener("submit", handleSubmit)

  function handleSubmit(e) {
    e.preventDefault()
    let text = e.target.firstElementChild.firstElementChild.value
    if (text){
      e.target.firstElementChild.firstElementChild.value = ""
      renderGravatar(text)
    }
  }

  // renderGravatar
  function renderGravatar(text){
    // a hashed array from the input text
    const hashedArray = md5.array(text)
    // creates a function to set a square's color
    const colorSquare = setColor(hashedArray)
    const markUncolored = setColor([0,0,0])
    // put this somewhere else
    let gridArray = []
    for (y = 0; y < 5; y++) {
      for (x = 0; x < 5; x++){
        gridArray.push([x,y])
      }
    }
    // /////////////////////////

    // coloring squares
    for (i = 0; i < 15; i++) {
      if (isEven(hashedArray[i])) {
        let square = getSquare(gridArray[i])
        colorSquare(square)
        if (i < 10) {
          colorSquare(squareMirror(gridArray[i]))
        }
      }
    }
  }

  // returns a square node opposite the given coordinates
  function squareMirror([x,y]) {
    if (y === 0){
      return getSquare([x, y+4])
    } else {
      return getSquare([x, y+2])
    }
  }

  // Helper Function
  function isEven(num){
    return parseInt(num) % 2 === 0 ? true : false
  }

  // this makes a function
  function setColor(array){
    const squareColor = getHexColorFromArray(array)
    return function(square){
      square.style.backgroundColor = squareColor
    }
  }

  // returns
  function getSquare([r, c]){
    return document.getElementById(`${r}-${c}`)
  }

  // takes in array and returns rgb values
  function getHexColorFromArray(a){
    return rgbToHex(a[0],a[1],a[2])
  }

  // helper function for
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  renderGravatar("c")

})
