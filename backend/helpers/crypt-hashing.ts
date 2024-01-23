class Crypt {
  async hash(password: string): Promise<string> {
    console.log('startHash')
    const hashed = await Bun.password.hash(password); 
    console.log(hashed)
    return hashed
  }
  async compare(password: string, hash: string) {
    const isValid = await Bun.password.verify(password, hash)
    return isValid
  }
}

const crypt = new Crypt()

export default crypt
