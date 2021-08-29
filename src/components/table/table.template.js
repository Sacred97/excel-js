import {toInlineStyles} from "../../core/utils";
import {defaultStyles} from "../../constants";
import {parse} from '../../core/parse'

const CHAR_CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function createCell(state, row) {
    return function (_, col) {
        const width = getWidth(state.colState, col)
        const id = `${row}:${col}`
        const data = state.dataState[id]
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })
        return `
            <div class="cell" 
                contenteditable data-col="${col}" 
                data-row="${row}"
                data-type="cell"
                data-id="${id}"
                data-value="${data || ''}"
                style="${styles}; width: ${width}"
                >
                ${parse(data) || ''}
            </div>
        `
    }
}

function createColumn({col, index, width}) {
    return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
        ${col} 
        <div class="col-resize" data-resize="col"></div> 
    </div>
    `
}

function createRow(content, numberRow = null, state) {
    const resize = numberRow?'<div class="row-resize" data-resize="row"></div>':''
    const height = getHeight(state, numberRow)
    return `
        <div class="row" data-type="resizable" data-row="${numberRow}" style="height: ${height}">
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

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFromState(state) {
    return function (col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 15, state = {}) {

    const columnsCount = CHAR_CODES.Z -CHAR_CODES.A + 1
    const rows = []
    const columns = new Array(columnsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFromState(state))
        .map(createColumn)
        .join('')

    rows.push(createRow(columns, null, {}))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(columnsCount)
            .fill('')
            .map(createCell(state, i))
            .join('')
        rows.push(createRow(cells, i+1, state.rowState))
    }

    return rows.join('')

}
