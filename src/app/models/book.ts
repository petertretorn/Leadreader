export class Book {

    constructor(title, author, categories, imageUrl, published, publisher) {
        this.title = title
        this.author = author
        this.categories = categories
        this.imageUrl = imageUrl
        this.published = published
        this.publisher = publisher
    }

    title: string
    author: string
    published: Date
    publisher: string
    categories: string
    imageUrl: string
}
