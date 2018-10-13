import { ReaderComment } from './reader-comment';

export class QuoteNote {
    id: string
    quote: string
    note: string
    comments: ReaderComment[]
    created: Date
}
