/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

type Tag = {
  id: number
  user_id: number
  name: string
  sign: string
  kind: 'expenses' | 'income'
}

type Resources<T = any> = {
  resources:T[],
  pager:{
    page:number,
    per_page:number,
    count:number
  }
}