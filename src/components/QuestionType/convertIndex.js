export const convertIndex = (index) => {
    if (index < 0) return ''
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return letters[index] || ''
}
