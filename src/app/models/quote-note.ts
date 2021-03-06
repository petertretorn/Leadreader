import { ReaderComment } from './reader-comment';

export class QuoteNote {
    id?: string
    heading?: string
    quote?: string
    note?: string
    comments?: ReaderComment[]
    created?: Date
}
