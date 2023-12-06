function Draw() {
    //seperation
    SetColor("black")
    let x = GetCanvasSize()[0] / 2
    DrawLine(x, 0, x, GetCanvasSize()[1])

    DrawMinkowski(0, 0, GetCanvasSize()[0] / 2, GetCanvasSize()[1] / 2)
    DrawOriginal(GetCanvasSize()[0] / 2, GetCanvasSize()[1] / 2, GetCanvasSize()[0], GetCanvasSize()[1])
}

function DrawMinkowski(start_x, start_y, end_x, end_y) {

}

function DrawOriginal(start_x, start_y, end_x, end_y) {

}

async function main() {
    while (true) {
        Draw()

        await Sleep(16)
    }
}