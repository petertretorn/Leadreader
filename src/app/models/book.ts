export class Book {

    constructor(title, author, categories, imageUrl) {
        this.title = title
        this.author = author
        this.categories = categories
        this.imageUrl = imageUrl
    }

    title: string
    author: string
    published: string
    categories: string
    imageUrl: string
}
