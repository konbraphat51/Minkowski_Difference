DEFAULT_POLYGONS = [
    "polygon_0.txt",
    "polygon_1.txt",
    "polygon_2.txt",
    "polygon_3.txt",
    "polygon_4.txt",
    "polygon_5.txt",
    "polygon_6.txt",
    "polygon_7.txt",
    "polygon_8.txt",
]

let polygons = []

function Draw() {
    //seperation
    SetColor("black")
    let x = GetCanvasSize()[0] / 2
    DrawLine(x, 0, x, GetCanvasSize()[1])

    //each division
    DrawMinkowski(0, 0, GetCanvasSize()[0] / 2, GetCanvasSize()[1] / 2)
    DrawOriginal(GetCanvasSize()[0] / 2, GetCanvasSize()[1] / 2, GetCanvasSize()[0], GetCanvasSize()[1])
}

function DrawMinkowski(start_x, start_y, end_x, end_y) {

}

function DrawOriginal(start_x, start_y, end_x, end_y) {

}

async function main() {
    polygons = await LoadFile(DEFAULT_POLYGONS)

    while (true) {
        Draw()

        await Sleep(16)
    }
}