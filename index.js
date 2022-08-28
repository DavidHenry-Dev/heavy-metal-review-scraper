const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto('https://www.metal-rules.com/category/album-reviews/')

    const grabAlbum = await page.evaluate(() => {
      const albumTag = document.querySelectorAll('article') 
      
      let albumsArr = []
      albumTag.forEach((album) => {
          const albumTitle= album.querySelectorAll('h3 a')[0].innerText
          const grabRatingP = album.querySelectorAll('.mh-excerpt p')[0].innerText
          const ratingIndex = grabRatingP.indexOf('Rating')
          const extractRating = grabRatingP.lastIndexOf('5')
          const albumRating = album.querySelectorAll('.mh-excerpt p')[0].innerText.slice(ratingIndex, extractRating + 1).replace('[', ' ')

        albumsArr.push({title: albumTitle, rating: albumRating })
      })
      return albumsArr
    })
    console.log(grabAlbum)

  
    await browser.close()
})();


// Next steps: Bring data extracted to client side
// automate click to next page
// maybe search by month?