const CHAR_CODES = {
    A: 65,
    Z: 90
}

function createCell(_, col) {
    return `<div class="cell" contenteditable data-col="${col}"></div>`
}

function createColumn(column, index) {
    return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${column} 
        <div class="col-resize" data-resize="col"></div> 
    </div>
    `
}

function createRow(content, numberRow = null) {
    const resize = numberRow?'<div class="row-resize" data-resize="row"></div>':''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${numberRow?numberRow:''}
                ${resize}
            </div>
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
