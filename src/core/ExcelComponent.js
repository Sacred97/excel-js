import {DomListener} from "./DomListener";

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscrubers = []
        this.prepare()
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

    $dispatch (action) {
        this.store.dispatch(action)
    }

    storeChanged() {

    }

    isWatching(key) {
        return this.subscribe.includes(key)
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
