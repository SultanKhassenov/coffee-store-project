"use client" // Клиентский компонент для работы с Redux

import { Provider } from "react-redux"
import { store } from "../store/store"

/**
 * Провайдер Redux для приложения
 * Предоставляет доступ к глобальному состоянию всему приложению
 */
export default function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>
        {children}
    </Provider>
}
