const times = require('./times')

test('should NaN', () => {
    expect(times(4, 'a')).toBeNaN()
})

test('should 4 * 2 = 8', () => {
    expect(times(4, 2)).not.toBeNaN()
})