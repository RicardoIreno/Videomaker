const google = require('googleapis').google
const customSearch = google.customsearch('v1')
const state = require('./state.js')

const googleSearchCredentials = require('../credentials/google-search.json')
const { sentences } = require('sbd')

async function robot() {
    const content = state.load()
    
    await fecthImagesOfAllSentences(content)

    state.save(content)

    async function fecthImagesOfAllSentences(content) {
        for (const sentence of content.sentences) {
            const query = `${content.searchTerm} ${sentence.keywords[0]}`
            sentence.images = await fetchGoogleAndReturnImagesLinks(query)
            
            sentence.googleSearchQuery = query
        }
    }

    async function fetchGoogleAndReturnImagesLinks(query) {
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: query,
            searchType: 'image',
            //imageSize: 'huge',
            num: 2        
        })

        const imagesUrl = response.data.items.map((item) => {
            return item.link
        })
        return imagesUrl
    }   
    
}
customSearch.cse.list()

module.exports = robot