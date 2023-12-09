const {sum, subtract} = require('./sum')

test('should 1 + 4 = 5', () => {
    expect(sum(1, 4)).toBe(5)
})
test('should 1 + 4 <= 5', () => {
    expect(sum(1, 4)).toBeLessThanOrEqual(5)
})

test('should 5 - 4 = 1', () => {
    expect(subtract(5, 4)).toBe(1)
})