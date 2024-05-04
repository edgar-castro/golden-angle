let next_button;
let prev_button;
let select_phase;
let label;
let slider;

const GOLDEN_ANGLE = 137.5
const START_RADIUS = 10

let selected_phase;
let phases = ['inicio', 'polares', 'angulo', 'propagacion', 'final', 'mono', 'verde', 'intercalado', 'colores']

let color_a = [217, 231, 247]
let color_b = [239, 214, 238]

//angulo
let angle_1 = 0;
let angle_iterations_1 = 0;
//propagacion
let angle_2 = 0;
let angle_iterations_2 = 0;
//mono
let angle_3 = 0;
let angle_iterations_3 = 0;
//mono
let angle_4 = 0;
let angle_iterations_4 = 0;
//verde
let angle_5 = 0;
let angle_iterations_5 = 0;
// colores
let angle_6 = 0;
let angle_iterations_6 = 0;
// colores 2 por si acaso jsjsjsjs
let angle_7 = 0;
let angle_iterations_7 = 0;


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0)
    setupSelect()
    slider = createSlider(0, 360, 90)
    slider.position(width / 2 - slider.width / 2, height - 50)  
    next_button = setupButton('>', nextButtonFunction, {x: width - 60, y: height - 80})
    prev_button = setupButton('<', prevButtonFunction, {x: 20, y: height - 80})
}


function draw() {
    selected_phase = select_phase.selected()
    switch(selected_phase){
        case 'polares':
            drawPolarCoords();
        break;
        case 'angulo':
            drawGoldenAngleDemo();
        break;
        case 'propagacion':
            drawGoldenPropagationDemo();
        break;
        case 'final': 
            drawFinal();
        break;
        case 'mono': 
            drawFinalMono();
        break;
        case 'verde': 
            drawFinalVerde();
        break;
        case 'colores': 
            drawFinalColores();
        break;
        case 'intercalado': 
            drawFinalIntercalado();
        break;
        default: 
            defaultScene()
    }
}


function defaultScene(){
    slider.position(-100, -100)
    next_button.position(-100, -100)
    prev_button.position(-100, -100)
    background(0)
    fill(255)
    textSize(48)
    text('Holi crayoli', width / 2 - 120, height / 2)
}

function drawPolarCoords(){
    background(0)
    slider.position(width / 2 - slider.width / 2, height - 50)
    next_button.position(-100, 100)
    prev_button.position(-100, 100)
    fill(0)
    stroke(255)
    strokeWeight(4)
    const angle = slider.value()
    const center = {x: width / 2, y: height / 2}
    const coords = getPolarCoords(toRadians(angle), 150);
    const final_coords = sumCoordinates(center, coords)
    circle(center.x, center.y, 300)
    noStroke()
    fill(255)
    circle(center.x, center.y, 10)
    fill(0)
    stroke(255)
    strokeWeight(1)
    circle(final_coords.x, final_coords.y, 25) 
    fill(255)
    textSize(24)
    text(`${angle} grados`, width / 2 - 48, height - height/4)
}

function drawCirclePolarCoords(){
    slider.position(-100, -1000)
    const center = {x: width / 2, y: height / 2}
    const coords = getPolarCoords(toRadians(angle), 100);
    const final_coords = sumCoordinates(center, coords)
    circle(final_coords.x, final_coords.y, 10)
    if(angle < 360) angle += 1;
    
}

function drawGoldenAngleDemo(){
    background(0)
    slider.position(-100, -100)
    next_button.position(width - 60, height - 80)
    prev_button.position(20, height - 80)
    fill(0)
    stroke(255)
    strokeWeight(4)
    const center = {x: width / 2, y: height / 2}
    circle(center.x, center.y, 300)
    noStroke()
    fill(255)
    for(let i = 0; i < angle_iterations_1; i++){
        let current_golden_angle = GOLDEN_ANGLE * i;
        const coords = getPolarCoords(toRadians(current_golden_angle), 150);
        const final_coords = sumCoordinates(center, coords)
        fill(0)
        stroke(255)
        strokeWeight(1)
        circle(final_coords.x, final_coords.y, 10) 
    }
}

function drawGoldenPropagationDemo(){
    background(0)
    next_button.position(width - 60, height - 80)
    prev_button.position(20, height - 80)
    const center = {x: width / 2, y: height / 2}
    noStroke()
    fill(255)
    circle(center.x, center.y, 10)
    let current_radius = START_RADIUS
    for(let i = 0; i < angle_iterations_2; i++){
        let current_golden_angle = GOLDEN_ANGLE * i;
        if(i % 3 == 0) current_radius += 2
        const coords = getPolarCoords(toRadians(current_golden_angle), current_radius);
        const final_coords = sumCoordinates(center, coords)
        fill(0)
        stroke(255)
        strokeWeight(1)
        circle(final_coords.x, final_coords.y, 10) 
    }
}

function drawFinal(){
    background(0)
    next_button.position(-1000, -1000)
    prev_button.position(-1000, -1000)
    slider.position(-1000, -1000)
    const center = {x: width / 2, y: height / 2}
    noStroke()
    fill(255)
    circle(center.x, center.y, 10)

    let current_radius = START_RADIUS
    for(let i = 0; i < angle_iterations_3; i++){
        let current_golden_angle = GOLDEN_ANGLE * i;
        if(i % 3 == 0) current_radius += 1
        const coords = getPolarCoords(toRadians(current_golden_angle), current_radius);
        const final_coords = sumCoordinates(center, coords)
        let shape_color = calculateColor(current_golden_angle, current_radius)
        fill(0)
        stroke(255)
        strokeWeight(1)
        push()
        ellipse(final_coords.x, final_coords.y, i * 0.05, i * 0.08, 6)
        pop()
    }
    if(angle_iterations_2 < 800)
        setTimeout(() => { angle_iterations_3 += 1}, 500)
}

function drawFinalMono(){
    background(0)
    next_button.position(-1000, -1000)
    prev_button.position(-1000, -1000)
    slider.position(-1000, -1000)
    const center = {x: width / 2, y: height / 2}
    noStroke()
    fill(255)
    circle(center.x, center.y, 10)

    let current_radius = START_RADIUS
    for(let i = 0; i < angle_iterations_4; i++){
        let current_golden_angle = GOLDEN_ANGLE * i;
        if(i % 3 == 0) current_radius += 1
        const coords = getPolarCoords(toRadians(current_golden_angle), current_radius);
        const final_coords = sumCoordinates(center, coords)
        const color_factor = current_golden_angle % 255
        fill(color_factor, color_factor, color_factor)
        stroke(255)
        strokeWeight(1)
        push()
        ellipse(final_coords.x, final_coords.y, i * 0.05, i * 0.08, 6)
        pop()
    }
    if(angle_iterations_2 < 800)
        setTimeout(() => { angle_iterations_4 += 1}, 500)
}

function drawFinalVerde(){
    background(0)
    next_button.position(-1000, -1000)
    prev_button.position(-1000, -1000)
    slider.position(-1000, -1000)
    const center = {x: width / 2, y: height / 2}
    noStroke()
    fill(255)
    circle(center.x, center.y, 10)

    let current_radius = START_RADIUS
    for(let i = 0; i < angle_iterations_5; i++){
        let current_golden_angle = GOLDEN_ANGLE * i;
        if(i % 3 == 0) current_radius += 1
        const coords = getPolarCoords(toRadians(current_golden_angle), current_radius);
        const final_coords = sumCoordinates(center, coords)
        let shape_color = calculateColor(current_golden_angle, current_radius)
        fill(shape_color.r, shape_color.g, shape_color.b)
        stroke(255)
        strokeWeight(1)
        push()
        ellipse(final_coords.x, final_coords.y, i * 0.05, i * 0.08, 6)
        pop()
    }
    if(angle_iterations_2 < 800)
        setTimeout(() => { angle_iterations_5 += 1}, 500)
}


function drawFinalColores(){
    background(0)
    next_button.position(-1000, -1000)
    prev_button.position(-1000, -1000)
    slider.position(-1000, -1000)
    const center = {x: width / 2, y: height / 2}
    noStroke()
    fill(255)
    circle(center.x, center.y, 10)

    let current_radius = START_RADIUS
    for(let i = 0; i < angle_iterations_6; i++){
        let current_golden_angle = GOLDEN_ANGLE * i;
        if(i % 3 == 0) current_radius += 1
        const coords = getPolarCoords(toRadians(current_golden_angle), current_radius);
        const final_coords = sumCoordinates(center, coords)
        let shape_color = calculateColorGradient(current_golden_angle)
        fill(shape_color.r, shape_color.g, shape_color.b)
        stroke(0)
        strokeWeight(1)
        push()
        ellipse(final_coords.x, final_coords.y, i * 0.05, i * 0.08, 6)
        pop()
    }
    if(angle_iterations_2 < 800)
        setTimeout(() => { angle_iterations_6 += 1}, 500)
}

function drawFinalIntercalado(){
    background(0)
    next_button.position(-1000, -1000)
    prev_button.position(-1000, -1000)
    slider.position(-1000, -1000)
    const center = {x: width / 2, y: height / 2}
    noStroke()
    fill(255)
    circle(center.x, center.y, 10)

    let current_radius = START_RADIUS
    for(let i = 0; i < angle_iterations_7; i++){
        let current_golden_angle = GOLDEN_ANGLE * i;
        if(i % 3 == 0) current_radius += 1
        const coords = getPolarCoords(toRadians(current_golden_angle), current_radius);
        const final_coords = sumCoordinates(center, coords)
        let shape_color = calculateColorGradient(current_golden_angle)
        if(current_golden_angle % 2)
            fill(color_a[0], color_b[1], color_a[2])
        else 
            fill(color_b[0], color_b[1], color_b[2])
        stroke(0)
        strokeWeight(1)
        push()
        ellipse(final_coords.x, final_coords.y, i * 0.05, i * 0.08, 6)
        pop()
    }
    if(angle_iterations_2 < 800)
        setTimeout(() => { angle_iterations_7 += 1}, 500)
}

function calculateColorGradient(angle){
    let value = angle % 360
    let red_range = [Math.min(color_a[0], color_b[0]), Math.max(color_a[0], color_b[0])]
    let green_range = [Math.min(color_a[1], color_b[1]), Math.max(color_a[1], color_b[1])]
    let blue_range = [Math.min(color_a[2], color_b[2]), Math.max(color_a[2], color_b[2])]
    let r = map(value, 0, 360, red_range[0], red_range[1])
    let g = map(value, 0, 360, green_range[0], green_range[1])
    let b = map(value, 0, 360, blue_range[0], blue_range[1])
    return { r, g, b }
}

function calculateColor(angle, radius){
    let isOdd = true
    let input = angle * radius % 360
    let b = angle % 360
    //Verde:35 - 90 | Azul: 20 - 100
    let red = map(input, 0, 360, 35, 90) 
    // 160 - 230 | Azul: 95 - 140
    let green = map(input, 0, 360, 160, 230)
    // 60 - 100 | 164 - 215
    let blue = map(input, 0, 360, 60, 100) 
    return { r: red, g: green, b: blue }
}

function setupSelect(){
    select_phase = createSelect();
    for(const phase of phases) select_phase.option(`${phase}`)
    select_phase.position(width / 2 - select_phase.width, 50);
}

function nextButtonFunction(){
    switch(selected_phase){
        case 'angulo': 
            angle_iterations_1 += 1;
        break
        case 'propagacion':
            angle_iterations_2 += 1;
        break
        default: console.log("Holis")
    }

}

function prevButtonFunction(){
    switch(selected_phase){
        case 'angulo': 
            angle_iterations_1 -= 1;
            if(angle_iterations_1 == 0) angle_iterations_1 = 1;
        break
        case 'propagacion':
            angle_iterations_2 -= 1;
            if(angle_iterations_2 == 0) angle_iterations_2 = 1;
        default: console.log("Holis")
    }

}

function setupButton(label, onClick, position){
    let tmp = createButton(label)
    tmp.mousePressed(onClick)
    tmp.position(position.x, position.y)
    return tmp
}


function getPolarCoords(angle, r = 1) {
    return {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle),
    }
}

function sumCoordinates(position_1, position_2){
    return {
        x: position_1.x + position_2.x,
        y: position_1.y - position_2.y
    }
}

function toRadians(angle){
    return angle * Math.PI / 180;
}