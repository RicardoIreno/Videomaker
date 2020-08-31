const readline = require( 'readline-sync' );

function askAndReturnSearchTerm() {
    return readline.question('Type a Wipedia search term, motherfucker: ')
}

function askAndReturnPrefix() {
    const prefixes = [ 'Who is', 'What is', 'The history of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]
    return selectedPrefixText
}

function start() {
    const content = {}

    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()    
    console.log(content);
}

start()
