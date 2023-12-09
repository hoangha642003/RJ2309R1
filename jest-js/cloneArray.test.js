const cloneArray = require('./cloneArray')

test('should be equal', () => {
    let numbers = [3, 5, 7]
    expect(cloneArray(numbers)).toEqual(numbers)
})