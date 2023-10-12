class Art {
  constructor(id, name, description, image, author, creationDate) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.author = author;
    this.creationDate = creationDate;
  }

  toString() {
    return `Profile { id: ${this.id}, name: ${this.name}, author: ${this.author}, creationDate: ${this.creationDate}, description: ${this.description} }`;
  }
}
export default Art;
