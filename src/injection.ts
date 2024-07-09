import type { Ref, InjectionKey } from 'vue'

export type IDialogBox = { message: Ref< string >, show: Ref< boolean >, say: ( message: string ) => void, close: () => void }

export const iDialogBox = Symbol() as InjectionKey< IDialogBox >
