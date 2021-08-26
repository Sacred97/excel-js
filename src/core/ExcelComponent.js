import {DomListener} from "./DomListener";

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.prepare()
        this.emitter = options.emitter
        this.unsubscrubers = []
    }

    // Настраиваем наш компонент до init
    prepare() {

    }

    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscrubers.push(unsub)
    }

    // Инициализируем компонент
    // Добовляем DOM слушатели
    init() {
        this.initDOMListeners()
    }

    // Удаляем компонент
    // Чистим слушатели
    destroy() {
        this.removeDOMListeners()
        this.unsubscrubers.forEach(unsub => unsub())
    }

}
