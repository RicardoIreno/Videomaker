const readline = require( 'readline-sync' );
const robots = {
    text: require('./robots/text.js')
}


async function start() {
    const content = {
        maximumSentences: 7
    }

    function askAndReturnSearchTerm() {
        return readline.question('Type a Wikpedia search term: ')
    }
    
    function askAndReturnPrefix() {
        const prefixes = [ 'Who is', 'What is', 'The history of']
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one: ')
        const selectedPrefixText = prefixes[selectedPrefixIndex]
        return selectedPrefixText
    }

    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()    

    await robots.text(content)
    
}

start()
