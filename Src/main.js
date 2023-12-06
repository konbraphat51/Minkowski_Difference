StopAllTouchDefaults()

const DEFAULT_POLYGONS = [
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
let polygon0 = undefined
let polygon1 = undefined
let polygon0_selecting = 0
let polygon1_selecting = 0

const GRID_INTERVAL = 10

function Draw() {
    //clear
    SetColor("white")
    DrawRect(0, 0, GetCanvasSize()[0], GetCanvasSize()[1])

    //seperation
    SetColor("black")
    let x = GetCanvasSize()[0] / 2
    DrawLine(x, 0, x, GetCanvasSize()[1])

    //each division
    DrawMinkowski(0, 0, GetCanvasSize()[0] / 2, GetCanvasSize()[1])
    DrawOriginal(GetCanvasSize()[0] / 2, GetCanvasSize()[1], GetCanvasSize()[0], GetCanvasSize()[1])
}

function DrawMinkowski(start_x, start_y, end_x, end_y) {
    let positions_minkowski = ComputeMinowski()

    //axis
    SetColor("red")
    DrawLine(start_x, (start_y + end_y) / 2, end_x, (start_y + end_y) / 2, 3)
    DrawLine((start_x + end_x) / 2, start_y, (start_x + end_x) / 2, end_y, 3)

    SetColor("palepink")
    positions_minkowski.forEach((position) => {
        DrawCircle(position[0] + (start_x + end_x) / 2, position[1] + (start_y + end_y) / 2, 3)
    })
}

function DrawOriginal(start_x, start_y, end_x, end_y) {
    SetColor("palegreen")
    polygon0.Draw()

    SetColor("lightblue")
    polygon1.Draw()
}

function Control() {
    polygon1.center = GetMousePosition()
}

function ChangePolygon0() {
    polygon0_selecting = (polygon0_selecting + 1) % polygons.length

    let center = polygon0.center
    let scale = polygon0.scale
    polygon0 = polygons[polygon0_selecting].Clone()
    polygon0.center = center
    polygon0.scale = scale
}

function ChangePolygon1() {
    polygon1_selecting = (polygon1_selecting + 1) % polygons.length

    let center = polygon1.center
    let scale = polygon1.scale
    polygon1 = polygons[polygon1_selecting].Clone()
    polygon1.center = center
    polygon1.scale = scale
}

function ComputeMinowski() {
    let positions0 = ComputePositionsInside(polygon0)
    let positions1 = ComputePositionsInside(polygon1)

    let positions_minkowski = []
    positions0.forEach((position0) => {
        positions1.forEach((position1) => {
            positions_minkowski.push([position0[0] - position1[0], position0[1] - position1[1]])
        })
    })

    return positions_minkowski
}

function ComputePositionsInside(polygon) {
    let positions = []

    for (let x = 0; x < GetCanvasSize()[0]; x += GRID_INTERVAL) {
        for (let y = 0; y < GetCanvasSize()[1]; y += GRID_INTERVAL) {
            let point = [x, y]
            if (polygon.IsPointInside(point)) {
                positions.push(point)
            }
        }
    }

    return positions
}

PutButton("change_polygon0", "Change Green Polygon", ChangePolygon0)
PutButton("change_polygon1", "Change Blue Polygon", ChangePolygon1)

async function main() {
    polygons = await LoadPolygons(DEFAULT_POLYGONS)
    polygon0 = polygons[polygon0_selecting].Clone()
    polygon0.center = [GetCanvasSize()[0] * 0.75, GetCanvasSize()[1] * 0.5]
    polygon0.scale = 0.25
    polygon1 = polygons[polygon1_selecting].Clone()
    polygon1.center = [GetCanvasSize()[0] * 0.75, GetCanvasSize()[1] * 0.75]
    polygon1.scale = 0.25

    while (true) {
        Draw()
        Control()

        await Sleep(16)
    }
}