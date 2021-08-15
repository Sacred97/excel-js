const CHAR_CODES = {
    A: 65,
    Z: 90
}

function createCell() {
    return `
        <div class="cell" contenteditable>
            
        </div>
    `
}

function createColumn(column) {
    return `<div class="column">${column}</div>`
}

function createRow(content, numberRow = null) {
    return `
        <div class="row">
            <div class="row-info">${numberRow?numberRow:''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CHAR_CODES.A + index)
}

export function createTable(rowsCount = 15) {

    const columnsCount = CHAR_CODES.Z -CHAR_CODES.A + 1
    const rows = []
    const columns = new Array(columnsCount)
        .fill('')
        .map(toChar)
        .map(createColumn)
        .join('')

    rows.push(createRow(columns))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(columnsCount).fill('').map(createCell).join('')
        rows.push(createRow(cells, i+1))
    }

    return rows.join('')

}
