export default (...args:any[]) => {
    if (['', null, undefined].some(e => e === args[0])) {
        return false
    }

    // Vérifie si la date correspond au format YYYY-MM-DD
    let match = args[0].match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (!match) {
        return false // La date ne respecte pas le format attendu
    }

    let [_, y, m, d] = match.map(Number) // Convertit en nombres

    return (
        m > 0 &&
        m < 13 &&
        y > 0 &&
        y < 32768 &&
        d > 0 &&
        d <= new Date(y, m, 0).getDate()
    )
}
