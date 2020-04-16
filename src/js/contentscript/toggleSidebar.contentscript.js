let sidebar = document.getElementById('sidebar')

let show = () => {
    sidebar.style.marginRight = '400px'
}

function hide(e) {
    let x = sidebar.getBoundingClientRect().x
    let w = sidebar.getBoundingClientRect().width
    let rightSide = x + w

    // if mouse is not inbetween the sidebar and right side of screen gap, then close the sidebar
    if (e.clientX < rightSide) sidebar.style.marginRight = '0px'
}

sidebar.addEventListener('mouseover', show)
sidebar.addEventListener('mouseout', function (e) { hide(e) })