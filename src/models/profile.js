class Profile {
  constructor(id, email, password, role, arts) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
    this.arts = arts;
  }

  toString() {
    return `Profile { id: ${this.id}, email: ${this.email}, password: ${this.password}, role: ${this.role}, arts: ${this.arts} }`;
  }
}

export default Profile;
