const car = {
  brand: 'Toyota',
  model: 'Corolla',
  year: 2024,
  speed: 0,

  accelerate(amount) {
    this.speed += amount
    console.log(`加速 ${amount} km/h，目前時速: ${this.speed} km/h`)
  },

  brake(amount) {
    this.speed = Math.max(0, this.speed - amount)
    console.log(`減速 ${amount} km/h，目前時速: ${this.speed} km/h`)
  },

  displayInfo() {
    console.log(`品牌: ${this.brand}`)
    console.log(`型號: ${this.model}`)
    console.log(`年份: ${this.year}`)
    console.log(`目前時速: ${this.speed} km/h`)
  },
}

car.displayInfo()
console.log('---')
car.accelerate(30)
car.accelerate(20)
car.brake(15)
console.log('---')
car.displayInfo()
