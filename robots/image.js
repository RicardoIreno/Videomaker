const imageDownloader = require('image-downloader')
const google = require('googleapis').google
const customSearch = google.customsearch('v1')
const state = require('./state.js')
const sharp = require('sharp')
const jimp = require('jimp')

const googleSearchCredentials = require('../credentials/google-search.json')
const { composer } = require('googleapis/build/src/apis/composer')

const hello = '\n\n =============  image robot  ============='


async function robot() {
  
  console.log(hello)

  const content = state.load()

  await fecthImagesOfAllSentences(content)
  await downloadAllImages(content) 
  await convertAllImages(content)
  await createAllSentenceImages(content)
  await createYoutubeThumbnail()

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

  async function downloadAllImages(content) {
    content.downloadedImages = []

    for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
      const images = content.sentences[sentenceIndex].images

      for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
        const imageUrl = images[imageIndex]

        try {
          if (content.downloadedImages.includes(imageUrl)) {
            throw new Error('Image already downloaded')
          }

          await downloadAndSave(imageUrl, `${sentenceIndex}-original.png`)
          content.downloadedImages.push(imageUrl)
          console.log(`> [image-robot] [${sentenceIndex}][${imageIndex}] Image successfully downloaded: ${imageUrl}`)
          break
        } catch (error) {
          console.log(`> [image-robot] [${sentenceIndex}][${imageIndex}] Error (${imageUrl}): ${error}`)
        }
      }
    }
  }

  async function downloadAndSave(url, fileName) {
    return imageDownloader.image({
      url, url,
      dest: `./content/${fileName}`
    })
  }

  async function convertAllImages(content) {
    for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
      await makeFrontImage(sentenceIndex)
      await makeBlurAndResize(sentenceIndex)
      
    }
  }

  async function makeFrontImage(sentenceIndex) {
    return new Promise((resolve, reject) => {
      const inputOriginalFile = `./content/${sentenceIndex}-original.png`
      const outputFile = `./content/_tempImage.png`
    
      workingFile = sharp(inputOriginalFile)

      workingFile
      .metadata()
      .then( 
        (metadata) => {
          if (metadata.width <= metadata.height) { 
                return workingFile
                .resize({ height: 1080 })
          } 
          
          else {
            return workingFile
                .resize({ width: 1920, height: 1080 })
          }
         }
        )

      .then( (metadata) => {
        return workingFile
        .toFile(outputFile, (error) => {
          if (error){ return reject(error)}
          resolve()
        })
      })
    })
  }

  async function makeBlurAndResize(sentenceIndex) {
    return new Promise((resolve, reject) => {
      const inputOriginalFile = `./content/${sentenceIndex}-original.png`
      const inputTempFile = `./content/_tempImage.png`
      const outputFile = `./content/${sentenceIndex}-completed.png`
      
      sharp(inputOriginalFile)
      .blur(30)
      .resize(1920, 1080)
      .composite([{ input: inputTempFile, gravity: 'center' }])
      .png()
      .toFile(outputFile, (error) => {
        if (error){ return reject(error)}
        console.log(`> Image completed: ${inputOriginalFile}`)
        resolve()
      })
    })
  } 

  async function createAllSentenceImages(content) {
    for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
      await createSentenceImage(sentenceIndex, content.sentences[sentenceIndex].text).catch(console.error)
    }
  }

  async function createSentenceImage(sentenceIndex, sentenceText) {
      const canvas = new jimp(1920, 1080)
      const font = await jimp.loadFont(jimp.FONT_SANS_64_BLACK)
      const outputFile = `./content/${sentenceIndex}-sentence.png`

      const templateSettings = {
        0: { width: 50, height: 100, maxWidth: 1300 },
        1: { width: 900, height: 400, maxWidth: 1000 },
        2: { width: 900, height: 100, maxWidth: 1000 },
        3: { width: 100, height: 200, maxWidth: 1000 },
        4: { width: 900, height: 100, maxWidth: 1300 },
        5: { width: 100, height: 200, maxWidth: 1000 },
        6: { width: 100, height: 200, maxWidth: 1300 }
      }

      await canvas.print(
        font, 
        templateSettings[sentenceIndex].width, 
        templateSettings[sentenceIndex].height, 
        { text: sentenceText,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        }, templateSettings[sentenceIndex].maxWidth)

      await canvas.writeAsync(outputFile)
      console.log(`> created ${outputFile}`)
  }

  async function createYoutubeThumbnail() {
    return new Promise((resolve, reject) => {
      
      sharp(`./content/0-original.png`)
      .resize(1280, 720)
      .toFile(`./content/youtube-thumbnail.jpg`, (error) => {
        if (error)
          { return reject(error)}
        
          console.log('> Created youtube thumbnail')
          resolve()
      })
    })

  }
}

module.exports = robot

// https://www.youtube.com/watch?v=xMk2RwdbByM&t=368s


